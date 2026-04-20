const http = require("http");
const osModule = require("./modules/os");
const pathModule = require("./modules/path");
const eventModule = require("./modules/event");

const server = http.createServer((req, res) => {
    eventModule.emitEvent("request", req.url);

    res.writeHead(200, { "Content-Type": "text/plain" });

    if (req.url === "/") {
        res.write("Welcome to Node.js Modular Server\n");
    } 
    else if (req.url === "/os") {
        res.write(osModule.getSystemInfo());
    } 
    else if (req.url === "/path") {
        res.write(pathModule.getPathInfo());
    } 
    else {
        res.write("404 - Route Not Found\n");
    }

    res.end();
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});