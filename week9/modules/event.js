const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("request", (url) => {
    if(url=="/favicon.ico") return; 
    console.log(`Request received for: ${url}`);
});

function emitEvent(eventName, data) {
    emitter.emit(eventName, data);
}

module.exports = { emitEvent };