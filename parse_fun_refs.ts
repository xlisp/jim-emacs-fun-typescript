import * as ts from "typescript";
import * as fs from "fs";

// Function to parse TypeScript source code and return the AST
function getSourceFile(fileName: string): ts.SourceFile {
    const program = ts.createProgram([fileName], {});
    return program.getSourceFile(fileName)!;
}

// Function to traverse the AST and find function call relationships
function extractFunctionCalls(sourceFile: ts.SourceFile) {
    const functionCalls: { [key: string]: string[] } = {};
    let currentFunction: string | null = null;

    function visit(node: ts.Node) {
        if (ts.isFunctionDeclaration(node) && node.name) {
            // We found a function declaration
            currentFunction = node.name.getText();
            if (!functionCalls[currentFunction]) {
                functionCalls[currentFunction] = [];
            }
        } else if (ts.isCallExpression(node)) {
            // We found a function call
            const functionName = node.expression.getText();
            if (currentFunction && functionName) {
                functionCalls[currentFunction].push(functionName);
            }
        }

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

