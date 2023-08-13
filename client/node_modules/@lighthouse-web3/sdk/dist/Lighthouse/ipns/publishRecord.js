"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lighthouse_config_1 = require("../../lighthouse.config");
exports.default = async (cid, key, apiKey) => {
    try {
        const response = await axios_1.default.get(lighthouse_config_1.lighthouseConfig.lighthouseAPI +
            `/api/ipns/publish_record?cid=${cid}&keyName=${key}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        /*
          return:
            {
              data: {
                  "Name": "k51qzi5uqu5dm6uvby6428rfpcv1vcba6hxq6vcu52qtfsx3np4536jkr71gnu",
                  "Value": "/ipfs/Qmd5MBBScDUV3Ly8qahXtZFqyRRfYSmUwEcxpYcV4hzKfW"
              }
            }
        */
        return { data: response.data };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
