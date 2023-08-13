"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lighthouse_config_1 = require("../../lighthouse.config");
exports.default = async (key, apiKey) => {
    try {
        const response = await axios_1.default.delete(lighthouse_config_1.lighthouseConfig.lighthouseAPI +
            `/api/ipns/remove_key?keyName=${key}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        /*
          return:
            {
              data: {
                Keys: [
                    {
                        "Name": "3090a315e92c495ea36444f2bbaeefaf",
                        "Id": "k51qzi5uqu5dm8gfelll8own1epd9osmlig49il5mmphkrcxbnhydkmx101x15"
                    }
                ]
              }
            }
        */
        return { data: response.data };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
