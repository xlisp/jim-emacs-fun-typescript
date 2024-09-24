"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var fs = require("fs");
// Function to parse TypeScript source code and return the AST
function getSourceFile(fileName) {
    var program = ts.createProgram([fileName], {});
    return program.getSourceFile(fileName);
}
// Function to traverse the AST and find function call relationships
function extractFunctionCalls(sourceFile) {
    var functionCalls = {};
    var currentFunction = null;
    function visit(node) {
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
            var functionName = node.expression.getText(sourceFile);
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
function generateGraphviz(functionCalls) {
    var graph = "digraph G {\n";
    for (var caller in functionCalls) {
        var callees = functionCalls[caller];
        for (var _i = 0, callees_1 = callees; _i < callees_1.length; _i++) {
            var callee = callees_1[_i];
            graph += "    \"".concat(caller, "\" -> \"").concat(callee, "\";\n");
        }
    }
    graph += "}";
    return graph;
}
// Main function to parse TypeScript file and output the Graphviz DOT format
function main(fileName) {
    var sourceFile = getSourceFile(fileName);
    if (!sourceFile) {
        console.error("Could not read source file: ".concat(fileName));
        return;
    }
    console.log("Parsing file: ".concat(fileName));
    var functionCalls = extractFunctionCalls(sourceFile);
    var graphvizOutput = generateGraphviz(functionCalls);
    // Write the DOT file
    var outputFileName = fileName.replace(".ts", ".dot");
    fs.writeFileSync(outputFileName, graphvizOutput);
    console.log("Graphviz DOT output written to ".concat(outputFileName));
}
// Run the main function with a TypeScript file
var fileName = process.argv[2]; // Take file name from command line arguments
if (fileName) {
    main(fileName);
}
else {
    console.error("Please provide a TypeScript file as argument.");
}
