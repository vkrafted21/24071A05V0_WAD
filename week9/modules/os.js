const os = require("os");

function getSystemInfo() {
    const totalMemMB = (os.totalmem() / (1024 * 1024)).toFixed(2);
    const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(2);

    return `
OS Platform: ${os.platform()}
Architecture: ${os.arch()}
Total Memory: ${totalMemMB} MB
Free Memory: ${freeMemMB} MB
CPU Cores: ${os.cpus().length}
Hostname: ${os.hostname()}
`;
}

module.exports = { getSystemInfo };