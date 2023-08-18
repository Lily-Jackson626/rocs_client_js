/// <reference types="node" />
import EventEmitter from 'events';
/**
 * robot Mod enum
 */
export declare enum Mod {
    MOD_ORIGINAL = "ORIGINAL",
    MOD_ACTION = "ACTION",
    MOD_HOME = "HOME",
    MOD_FIX = "FIX",
    MOD_4_WHEEL = "WHEEL_4",
    MOD_3_WHEEL = "WHEEL_3",
    MOD_2_WHEEL = "WHEEL_2"
}
/**
 * robot controller init param
 */
export interface ConnectOption {
    ssl?: boolean;
    host?: string;
    port?: number;
}
/**
 * robot controller
 */
export declare class Robot extends EventEmitter {
    private ws;
    private retry_count;
    private readonly baseUrl;
    type: string;
    mod: Mod;
    /**
     * this is constructor
     *
     * @param {ConnectOption} option
     */
    constructor(option?: ConnectOption);
    /**
     * listen socket event:  open
     *
     * Triggered when the socket connection succeeds
     *
     * @param listener callback with no parameters
     */
    on_open(listener: () => void): void;
    /**
     * listen socket event:  close
     *
     * Triggered when the socket closed
     *
     * @param listener callback with no parameters
     */
    on_close(listener: () => void): void;
    /**
     * listen socket event:  error
     *
     * Triggered when an error occurs in the socket
     *
     * @param listener callback with Error
     */
    on_error(listener: (err: Error) => void): void;
    /**
     * listen socket event:  message
     *
     * This is an asynchronous function
     *
     * that correctly returns the socket message body
     *
     * @param listener callback with message body
     */
    on_message(listener: (data: any) => void): void;
    /**
     * get robot type
     *
     * @return {Promise}  Returns a specific robot type such as dog human car
     */
    getType(): Promise<any>;
    /**
     * set robot mode
     *
     * applicable to the car
     *
     * @param {Mod} mod robot motion mode
     * @return {Promise}  return
     */
    setMode(mod: Mod): Promise<any>;
    /**
     * get wifi info
     *
     * @return {Promise}  Returns wifi name and password
     */
    getWifiInfo(): Promise<any>;
    /**
     * get the range of motion of human joints
     *
     * `` applicable to the human ``
     */
    get_joint_limit(): Promise<any>;
    /**
     * get startup status of human
     *
     * `` applicable to the human ``
     */
    get_joint_states(): Promise<any>;
    /**
     * enable detail status of human
     *
     * `` applicable to the human ``
     *
     * @param {number} frequence frequence unit: s
     */
    enable_debug_state(frequence?: number): void;
    /**
     * start robot
     */
    start(): Promise<any>;
    /**
     * stop
     */
    stop(): Promise<any>;
    /**
     * reset
     *
     * The device is reset to zero or reset to the initial state.
     *
     * ``applicable to the human``
     */
    reset(): Promise<any>;
    /**
     * Stand in place
     *
     *  ``applicable to the human``
     */
    stand(): Promise<any>;
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
    move(angle: number, speed: number): void;
    /**
     * Control human robot head movement
     *
     * `` applicable to the human ``
     *
     * @param {number} roll
     * @param {number} pitch
     * @param {number} yaw
     */
    head(roll: number, pitch: number, yaw: number): void;
    /**
     * control motion rotation and fluctuate
     *
     * @param {number} rotate_speed  rotate speed
     * @param {number} fluctuate_cycle  fluctuate_cycle cycle, top and bottom once for a group
     * @param callback
     */
    action_rotate_and_fluctuate(rotate_speed: number, fluctuate_cycle: number, callback: () => void): void;
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
    action_send(p2_params?: number[], p3_params?: number[], p4_params?: number[]): void;
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
    action_init(p2_params?: number[], p3_params?: number[], p4_params?: number[]): void;
    /**
     * Control car robot to DIY after
     *
     * `` applicable to the car ``
     */
    action_destroy(): void;
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
    private websocket_send;
    /**
     *
     * Send a http request
     *
     * this is an internal function: Converts the message to a string and sends it
     *
     * @param {AxiosRequestConfig} config http request config
     * @private
     */
    private http_request;
    /**
     * cover param
     *
     * @param {number} param param_value
     * @param {string} value param_name
     * @param {number} minThreshold param min threshold
     * @param {number} maxThreshold param max threshold
     * @private
     */
    private static cover_param;
}
