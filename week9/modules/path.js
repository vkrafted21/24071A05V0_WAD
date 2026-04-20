const path = require("path");

function getPathInfo() {
    const samplePath = __filename;

    return `
File Name: ${path.basename(samplePath)}
Directory: ${path.dirname(samplePath)}
Extension: ${path.extname(samplePath)}
Joined Path: ${path.join("folder", "file.txt")}
Resolved Path: ${path.resolve("file.txt")}
`;
}

module.exports = { getPathInfo };