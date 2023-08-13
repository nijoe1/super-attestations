"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lighthouse_config_1 = require("../../lighthouse.config");
exports.default = async (cid) => {
    try {
        const response = await axios_1.default.get(lighthouse_config_1.defaultConfig.lighthouseAPI + `/api/lighthouse/get_proof?cid=${cid}`);
        return { data: response.data };
    }
    catch (error) {
        if (error?.response?.status === 400) {
            throw new Error("Proof Doesn't exist yet");
        }
        throw new Error(error.message);
    }
};
