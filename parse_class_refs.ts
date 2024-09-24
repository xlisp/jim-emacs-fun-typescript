import * as ts from "typescript";
import * as fs from "fs";

// Function to parse TypeScript source code and return the AST
function getSourceFile(fileName: string): ts.SourceFile | undefined {
    const program = ts.createProgram([fileName], {});
    return program.getSourceFile(fileName);
}

// Function to extract class relationships and method declarations
function extractClassRelationships(sourceFile: ts.SourceFile) {
    const classRelations: { [key: string]: { extends?: string, methods: string[] } } = {};

    function visit(node: ts.Node) {
        // Check if the node is a class declaration
        if (ts.isClassDeclaration(node) && node.name) {
            const className = node.name.getText(sourceFile);
            const methods: string[] = [];
            let extendsClass: string | undefined = undefined;

            // Check for class inheritance (extends)
            if (node.heritageClauses) {
                node.heritageClauses.forEach(heritage => {
                    if (heritage.token === ts.SyntaxKind.ExtendsKeyword) {
                        extendsClass = heritage.types[0].expression.getText(sourceFile);
                    }
                });
            }

            // Check class members for methods
            node.members.forEach(member => {
                if (ts.isMethodDeclaration(member) && member.name) {
                    const methodName = member.name.getText(sourceFile);
                    methods.push(methodName);
                }
            });

            classRelations[className] = { extends: extendsClass, methods };
        }

        ts.forEachChild(node, visit);
    }

    ts.forEachChild(sourceFile, visit);
    return classRelations;
}

// Function to generate Graphviz DOT format from the class relationships
function generateGraphvizClassRelations(classRelations: { [key: string]: { extends?: string, methods: string[] } }): string {
    let graph = "digraph G {\n";
    
    // Generate class nodes and relationships
    for (const className in classRelations) {
        const classInfo = classRelations[className];
        const methodNodes = classInfo.methods.map(method => `"${className}.${method}"`);
        
        // Create a subgraph for each class and its methods
        graph += `    "${className}" [shape=box];\n`;
        for (const method of classInfo.methods) {
            graph += `    "${className}" -> "${className}.${method}";\n`;
            graph += `    "${className}.${method}" [shape=ellipse];\n`;
        }
        
        // Show inheritance relationship if applicable
        if (classInfo.extends) {
            graph += `    "${classInfo.extends}" -> "${className}" [label="inherits"];\n`;
        }
    }

    graph += "}";
    return graph;
}

// Main function to parse TypeScript file and output the Graphviz DOT format for class relationships
function main(fileName: string) {
    const sourceFile = getSourceFile(fileName);

    if (!sourceFile) {
        console.error(`Could not read source file: ${fileName}`);
        return;
    }

    const classRelations = extractClassRelationships(sourceFile);
    const graphvizOutput = generateGraphvizClassRelations(classRelations);

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

