"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../config/config.env") });
class Config {
    getConfig() {
        return {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            DB_USER: process.env.DB_USER,
            DB_DATABASE: process.env.DB_DATABASE,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_PORT: process.env.DB_PORT,
            DB_HOST: process.env.DB_HOST,
            SECRET_KEY: process.env.SECRET_KEY,
            ADMIN_EMAIL: process.env.ADMIN_EMAIL,
            ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
            PAYME_ENDPOINT: process.env.PAYME_ENDPOINT,
            PAYME_ID: process.env.PAYME_ID,
            PAYME_PASSWORD: process.env.PAYME_PASSWORD,
        };
    }
    getSanitzedConfig(config) {
        for (const [key, value] of Object.entries(config)) {
            if (value === undefined) {
                throw new Error(`Missing key ${key} in config.env`);
            }
        }
        return config;
    }
    sanitizedConfig() {
        return this.getSanitzedConfig(this.getConfig());
    }
}
const config = new Config();
exports.default = config.sanitizedConfig();
//# sourceMappingURL=config.js.map