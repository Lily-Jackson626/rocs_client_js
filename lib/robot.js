"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Mod = void 0;
const events_1 = __importDefault(require("events"));
const axios_1 = __importDefault(require("axios"));
/**
 * robot Mod enum
 */
var Mod;
(function (Mod) {
    Mod["MOD_ORIGINAL"] = "ORIGINAL";
    Mod["MOD_ACTION"] = "ACTION";
    Mod["MOD_HOME"] = "HOME";
    Mod["MOD_FIX"] = "FIX";
    Mod["MOD_4_WHEEL"] = "WHEEL_4";
    Mod["MOD_3_WHEEL"] = "WHEEL_3";
    Mod["MOD_2_WHEEL"] = "WHEEL_2";
})(Mod || (exports.Mod = Mod = {}));
var RobotType;
(function (RobotType) {
    RobotType["CAR"] = "car";
    RobotType["HUMAN"] = "human";
    RobotType["DOG"] = "dog";
})(RobotType || (RobotType = {}));
/**
 * robot controller
 */
class Robot extends events_1.default {
    /**
     * this is constructor
     *
     * @param {ConnectOption} option
     */
    constructor(option) {
        super();
        // websocket send msg retry count
        this.retry_count = 0;
        // The base path of the http request
        this.baseUrl = '';
        // robot_type: human ; dog; car
        this.type = '';
        // robot mod
        this.mod = Mod.MOD_ORIGINAL;
        const { ssl = false, host = '127.0.0.1', port = '8001' } = option !== null && option !== void 0 ? option : {};
        let ws_url;
        if (ssl) {
            ws_url = `wss://${host}:${port}/ws`;
            this.baseUrl = `https://${host}:${port}`;
        }
        else {
            ws_url = `ws://${host}:${port}/ws`;
            this.baseUrl = `http://${host}:${port}`;
        }
        try {
            if (typeof window !== 'undefined') {
                // 在浏览器环境下
                this.ws = new WebSocket(ws_url);
            }
            else {
                // 在Node.js环境下
                const WebSocket = require('ws');
                this.ws = new WebSocket(ws_url);
            }
            // set robot
            this.getType().then(res => {
                this.type = res.data.data.type;
                console.log(`robot init success ! current robot type: ${this.type}`);
            }).catch(err => {
                console.error(`robot type obtain fail: ${err}`);
            });
            this.ws.onopen = () => {
                this.emit('open');
            };
            this.ws.onmessage = (message) => {
                this.emit('message', message);
            };
            this.ws.onclose = () => {
                this.emit('close');
            };
            this.ws.onerror = (err) => {
                this.emit('error', err);
            };
        }
        catch (e) {
            console.error(`robot init fail ==> ${e}`);
        }
    }
    /**
     * listen socket event:  open
     *
     * Triggered when the socket connection succeeds
     *
     * @param listener callback with no parameters
     */
    on_open(listener) {
        this.on('open', listener);
    }
    /**
     * listen socket event:  close
     *
     * Triggered when the socket closed
     *
     * @param listener callback with no parameters
     */
    on_close(listener) {
        this.on('close', listener);
    }
    /**
     * listen socket event:  error
     *
     * Triggered when an error occurs in the socket
     *
     * @param listener callback with Error
     */
    on_error(listener) {
        this.on('error', err => listener(err));
    }
    /**
     * listen socket event:  message
     *
     * This is an asynchronous function
     *
     * that correctly returns the socket message body
     *
     * @param listener callback with message body
     */
    on_message(listener) {
        this.on('message', (message) => listener(message));
    }
    /**
     * get robot type
     *
     * @return {Promise}  Returns a specific robot type such as dog human car
     */
    getType() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.http_request({
                method: "GET",
                url: "/robot/type",
            });
        });
    }
    /**
     * set robot mode
     *
     * applicable to the car
     *
     * @param {Mod} mod robot motion mode
     * @return {Promise}  return
     */
    setMode(mod) {
        return __awaiter(this, void 0, void 0, function* () {
            this.mod = mod;
            return this.http_request({
                method: "POST",
                url: "/robot/mode",
                data: {
                    "mod_val": mod.toString()
                }
            });
        });
    }
    /**
     * get wifi info
     *
     * @return {Promise}  Returns wifi name and password
     */
    getWifiInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.http_request({
                method: "GET",
                url: "/wifi/info",
            });
        });
    }
    /**
     * get the range of motion of human joints
     *
     * `` applicable to the human ``
     */
    get_joint_limit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type == RobotType.HUMAN.toString()) {
                return this.http_request({
                    method: "GET",
                    url: "/robot/jointLimit",
                });
            }
            console.warn('robot type not allow this command! The current function is only applicable to humans');
        });
    }
    /**
     * get startup status of human
     *
     * `` applicable to the human ``
     */
    get_joint_states() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type == RobotType.HUMAN.toString()) {
                return this.http_request({
                    method: "GET",
                    url: "/robot/jointStates",
                });
            }
            console.warn('robot type not allow this command! The current function is only applicable to humans');
        });
    }
    /**
     * enable detail status of human
     *
     * `` applicable to the human ``
     *
     * @param {number} frequence frequence unit: s
     */
    enable_debug_state(frequence = 1) {
        if (this.type == RobotType.HUMAN.toString()) {
            this.websocket_send({ "command": "states", "data": { "frequence": frequence } });
            console.log('The debug state is enabled successfully! ' +
                'please listen to the data with the on_message function processing function as "SonnieGetStates"');
            return;
        }
        console.warn(`robot type not allow this command! The current function is only applicable to humans`);
    }
    /**
     * start robot
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.http_request({
                method: "POST",
                url: "/robot/start",
            });
        });
    }
    /**
     * stop
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.http_request({
                method: "POST",
                url: "/robot/stop",
            });
        });
    }
    /**
     * reset
     *
     * The device is reset to zero or reset to the initial state.
     *
     * ``applicable to the human``
     */
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.http_request({
                method: "POST",
                url: "/robot/reset",
            });
        });
    }
    /**
     * Stand in place
     *
     *  ``applicable to the human``
     */
    stand() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.http_request({
                method: "POST",
                url: "/robot/stand"
            });
        });
    }
    /**
     * Control robot movement
     *
     * `` applicable to the car and human ``
     *
     * @param {number} angle Angle of motion of robot
     *      data range: -45.00 ～ 45.00
     *
     * @param {number} speed The speed at which the robot moves
     *      data range: -0.8 ～ 0.8
     */
    move(angle, speed) {
        angle = Robot.cover_param(angle, 'angle', -45, 45);
        speed = Robot.cover_param(speed, 'speed', -0.8, 0.8);
        this.websocket_send({
            "command": "move",
            "data": { "angle": angle, "speed": speed }
        });
    }
    /**
     * Control human robot head movement
     *
     * `` applicable to the human ``
     *
     * @param {number} roll
     * @param {number} pitch
     * @param {number} yaw
     */
    head(roll, pitch, yaw) {
        this.websocket_send({ "command": "head", "data": { "roll": roll, "pitch": pitch, "yaw": yaw } });
    }
    /**
     * control motion rotation and fluctuate
     *
     * @param {number} rotate_speed  rotate speed
     * @param {number} fluctuate_cycle  fluctuate_cycle cycle, top and bottom once for a group
     * @param callback
     */
    action_rotate_and_fluctuate(rotate_speed, fluctuate_cycle, callback) {
        rotate_speed = Robot.cover_param(rotate_speed, "rotate_speed", 0, 500);
        let that = this;
        let p2 = [0, 0, 0, 0];
        let p3 = [0, 0, 0, 0];
        let p4 = [0, 0, 0, 0];
        let fluctuate_delay_time = 1800;
        let reversal_flag = false;
        let p2_offset = 30;
        let p2_current_offset = -30;
        const init = () => {
            p2 = [0, 0, 0, 0];
            p3 = [90, 90, 90, 90];
            p4 = [rotate_speed, rotate_speed, rotate_speed, rotate_speed];
            that.action_init(p2, p3, p4);
        };
        const reversal_p2 = () => {
            if (reversal_flag) {
                p2_offset = -1 * p2_offset;
                p2_current_offset = -2 * p2_offset;
            }
            else {
                p2_current_offset = -30;
                reversal_flag = true;
            }
        };
        const fluctuate_reversal_exec = () => {
            let cycle = 180 * 0.5;
            let delay_time = fluctuate_delay_time / cycle;
            for (let i = 0; i < cycle; i++) {
                setTimeout(() => {
                    let offset_val = p2_current_offset / cycle;
                    p2[0] += offset_val;
                    p2[1] += offset_val;
                    p2[2] += offset_val;
                    p2[3] += offset_val;
                    that.action_send(p2, p3, p4);
                }, delay_time * i);
            }
        };
        const fluctuate = () => {
            let delay_time = fluctuate_delay_time + 100;
            let cycle = fluctuate_cycle * 2;
            for (let i = 0; i <= cycle; i++) {
                setTimeout(() => {
                    if (i < cycle) {
                        reversal_p2();
                        fluctuate_reversal_exec();
                    }
                    else {
                        that.action_destroy();
                        callback();
                        return;
                    }
                }, delay_time * i);
            }
        };
        init();
        fluctuate();
    }
    /**
     * Control car robot to DIY
     *
     * `` applicable to the car ``
     *
     * @param {number[]} p2_params Parameter values of the four motors at position 2: control ups and downs
     *      data range: -30.00 ～ 30.00
     *
     * @param {number[]} p3_params Parameter values of the four motors at position 3: control wheel steering
     *      data range: -90.00 ～ 90.00
     *
     * @param {number[]} p4_params Parameter values of the four motors at position 4: control wheel speed
     *      data range: -0.8 ～ 0.8
     */
    action_send(p2_params = [0, 0, 0, 0], p3_params = [0, 0, 0, 0], p4_params = [0, 0, 0, 0]) {
        this.websocket_send({
            "command": "control_motion",
            "data": {
                "p2_m1": Robot.cover_param(p2_params[0], "p2_m1", -30, 30),
                "p2_m2": Robot.cover_param(p2_params[1], "p2_m2", -30, 30),
                "p2_m3": Robot.cover_param(p2_params[2], "p2_m3", -30, 30),
                "p2_m4": Robot.cover_param(p2_params[3], "p2_m4", -30, 30),
                "p3_m1": Robot.cover_param(p3_params[0], "p3_m1", -90, 90),
                "p3_m2": Robot.cover_param(p3_params[1], "p3_m2", -90, 90),
                "p3_m3": Robot.cover_param(p3_params[2], "p3_m3", -90, 90),
                "p3_m4": Robot.cover_param(p3_params[3], "p3_m4", -90, 90),
                "p4_m1": Robot.cover_param(p4_params[0], "p4_m1", -0.8, 0.8),
                "p4_m2": Robot.cover_param(p4_params[1], "p4_m2", -0.8, 0.8),
                "p4_m3": Robot.cover_param(p4_params[2], "p4_m3", -0.8, 0.8),
                "p4_m4": Robot.cover_param(p4_params[3], "p4_m4", -0.8, 0.8),
            }
        });
    }
    /**
     * Control car robot to DIY
     *
     * `` applicable to the car ``
     *
     * @param {number[]} p2_params Parameter values of the four motors at position 2: control ups and downs
     *      data range: -30.00 ～ 30.00
     *
     * @param {number[]} p3_params Parameter values of the four motors at position 3: control wheel steering
     *      data range: -90.00 ～ 90.00
     *
     * @param {number[]} p4_params Parameter values of the four motors at position 4: control wheel speed
     *      data range: -0.8 ～ 0.8
     */
    action_init(p2_params = [-0.0001, -0.0001, -0.0001, -0.0001], p3_params = [], p4_params = []) {
        // When the action mode is enabled! You need to send a non-zero command to activate the robot
        this.action_send(p2_params, p3_params, p4_params);
        this.setMode(Mod.MOD_ACTION).then(() => {
            console.log('robot action mod init success');
        });
    }
    /**
     * Control car robot to DIY after
     *
     * `` applicable to the car ``
     */
    action_destroy() {
        this.setMode(Mod.MOD_HOME).then(() => {
            console.log('robot action exec end');
        });
        this.setMode(Mod.MOD_FIX).then(() => {
            console.log('robot auto fix success');
        });
    }
    /**
     *
     * Send a socket message
     *
     *
     * this is an internal function: Converts the message to a string and sends it
     *
     * It is mainly to prevent some errors that may be caused by:
     * the client sending messages immediately after the socket connection state is not connected
     *
     * @param message socket message body
     * @private
     */
    websocket_send(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
            this.retry_count = 0;
            return;
        }
        if (this.retry_count == 5) {
            throw new Error("WebSocket SendMsg Error...");
        }
        this.retry_count += 1;
        console.warn("WebSocket state not ready...: retry: %s", this.retry_count);
        setTimeout(() => {
            this.websocket_send(message);
        }, 1000);
    }
    /**
     *
     * Send a http request
     *
     * this is an internal function: Converts the message to a string and sends it
     *
     * @param {AxiosRequestConfig} config http request config
     * @private
     */
    http_request(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.request(Object.assign({ timeout: 5000, baseURL: this.baseUrl }, config));
        });
    }
    /**
     * cover param
     *
     * @param {number} param param_value
     * @param {string} value param_name
     * @param {number} minThreshold param min threshold
     * @param {number} maxThreshold param max threshold
     * @private
     */
    static cover_param(param, value, minThreshold, maxThreshold) {
        if (param == undefined) {
            console.warn(`Illegal parameter: ${value} = ${param} `);
            param = 0;
        }
        if (param > maxThreshold) {
            console.warn(`Illegal parameter: ${value} = ${param} `, `greater than maximum, expected not be greater than ${maxThreshold}, actual ${param}`);
            param = maxThreshold;
        }
        if (param < minThreshold) {
            console.warn(`Illegal parameter: ${value} = ${param} `, `greater than maximum, expected not be less than ${minThreshold}, actual ${param}`);
            param = minThreshold;
        }
        return param;
    }
}
exports.Robot = Robot;
