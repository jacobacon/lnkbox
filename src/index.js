"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Setting Up...");
const web_1 = require("./web/web");
web_1.koaServer.listen(3000, () => {
    console.log("Listening on port 3000");
});
