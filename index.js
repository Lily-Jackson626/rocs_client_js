"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Mod = void 0;
const robot_1 = require("./lib/robot");
Object.defineProperty(exports, "Mod", { enumerable: true, get: function () { return robot_1.Mod; } });
Object.defineProperty(exports, "Robot", { enumerable: true, get: function () { return robot_1.Robot; } });
module.exports = { Robot: robot_1.Robot, Mod: robot_1.Mod };
