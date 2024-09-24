import * as ts from "typescript";
import * as fs from "fs";

// Function to parse TypeScript source code and return the AST
function getSourceFile(fileName: string): ts.SourceFile | undefined {
    const program = ts.createProgram([fileName], {});
    return program.getSourceFile(fileName);
}

// Function to traverse the AST and find function call relationships
function extractFunctionCalls(sourceFile: ts.SourceFile) {
    const functionCalls: { [key: string]: string[] } = {};
    let currentFunction: string | null = null;

    function visit(node: ts.Node) {
        // Log the node for debugging
        console.log("Visiting node:", ts.SyntaxKind[node.kind]);

        // Check if the node is a function declaration and has a valid name
        if (ts.isFunctionDeclaration(node) && node.name) {
            currentFunction = node.name.getText(sourceFile);
            if (!functionCalls[currentFunction]) {
                functionCalls[currentFunction] = [];
            }
        }

        // Check if the node is a call expression and if it has a valid expression (function name)
        else if (ts.isCallExpression(node) && node.expression) {
            const functionName = node.expression.getText(sourceFile);
            if (currentFunction && functionName) {
                functionCalls[currentFunction].push(functionName);
            }
        }

        // Recursively visit child nodes
        ts.forEachChild(node, visit);
    }

    ts.forEachChild(sourceFile, visit);
    return functionCalls;
}

// Function to generate Graphviz DOT format from the function call relationships
function generateGraphviz(functionCalls: { [key: string]: string[] }): string {
    let graph = "digraph G {\n";
    for (const caller in functionCalls) {
        const callees = functionCalls[caller];
        for (const callee of callees) {
            graph += `    "${caller}" -> "${callee}";\n`;
        }
    }
    graph += "}";
    return graph;
}

// Main function to parse TypeScript file and output the Graphviz DOT format
function main(fileName: string) {
    const sourceFile = getSourceFile(fileName);
    
    if (!sourceFile) {
        console.error(`Could not read source file: ${fileName}`);
        return;
    }

    console.log(`Parsing file: ${fileName}`);
    
    const functionCalls = extractFunctionCalls(sourceFile);
    const graphvizOutput = generateGraphviz(functionCalls);

    // Write the DOT file
    const outputFileName = fileName.replace(".ts", ".dot");
    fs.writeFileSync(outputFileName, graphvizOutput);
    console.log(`Graphviz DOT output written to ${outputFileName}`);
}

// Run the main function with a TypeScript file
const fileName = process.argv[2]; // Take file name from command line arguments
if (fileName) {
    main(fileName);
} else {
    console.error("Please provide a TypeScript file as argument.");
}

//  // run ok: (base) 坚持去λ化(中-易) jim-emacs-fun-typescript  main @ tsc parse_fun_refs.ts
//  (base) 坚持去λ化(中-易) jim-emacs-fun-typescript  main @ ls
//  funs_test.js      node_modules      package.json      parse_fun_refs.ts
//  funs_test.ts      package-lock.json parse_fun_refs.js tsconfig.json
//  (base) 坚持去λ化(中-易) jim-emacs-fun-typescript  main @ node parse_fun_refs.js funs_test.ts
//  Parsing file: funs_test.ts
//  Visiting node: FunctionDeclaration
//  Visiting node: Identifier
//  Visiting node: Block
//  Visiting node: ExpressionStatement
//  Visiting node: CallExpression
//  Visiting node: Identifier
//  Visiting node: ExpressionStatement
//  Visiting node: CallExpression
//  Visiting node: Identifier
//  Visiting node: FunctionDeclaration
//  Visiting node: Identifier
//  Visiting node: Block
//  Visiting node: ExpressionStatement
//  Visiting node: CallExpression
//  Visiting node: Identifier
//  Visiting node: FunctionDeclaration
//  Visiting node: Identifier
//  Visiting node: Block
//  Visiting node: EndOfFileToken
//  Graphviz DOT output written to funs_test.dot
//  (base) 坚持去λ化(中-易) jim-emacs-fun-typescript  main @
//  
// cat funs_test.dot
// digraph G {
//     "a" -> "b";
//     "a" -> "c";
//     "b" -> "c";
// }
// 
