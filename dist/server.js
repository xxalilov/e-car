"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
(async function () {
    const app = new app_1.default();
    try {
        app.listen();
        process.on("unhandledRejection", (err, promise) => {
            console.log(`Error: ${err}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=server.js.map