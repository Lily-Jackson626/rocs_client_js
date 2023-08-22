import EventEmitter from 'events';
import axios, {AxiosRequestConfig} from "axios";

/**
 * robot Mod enum
 *
 * `` applicable to the car ``
 */
export enum Mod {

    MOD_ORIGINAL = "ORIGINAL",
    MOD_ACTION = 'ACTION',
    MOD_HOME = 'HOME',
    MOD_FIX = 'FIX',

    MOD_4_WHEEL = "WHEEL_4",
    MOD_3_WHEEL = "WHEEL_3",
    MOD_2_WHEEL = "WHEEL_2",
}

/**
 * robot controller init param
 */
export interface ConnectOption {
    ssl?: boolean;
    host?: string,
    port?: number
}

enum RobotType {
    CAR = "car",
    HUMAN = "human",
    DOG = "dog"
}

/**
 * robot controller
 */
export class Robot extends EventEmitter {

    // robot_type: human ; dog; car
    public type: string = '';
    // robot mod
    public mod: Mod = Mod.MOD_ORIGINAL
    // ctrl websocket
    private ws!: WebSocket;
    // websocket send msg retry count
    private retry_count: number = 0
    // The base path of the http request
    private readonly baseUrl: string = '';

    /**
     * this is constructor
     *
     * @param {ConnectOption} option
     */
    constructor(option?: ConnectOption) {
        super()
        const {ssl = false, host = '192.168.12.1', port = '8001'} = option ?? {};
        let ws_url: string
        if (ssl) {
            ws_url = `wss://${host}:${port}/ws`
            this.baseUrl = `https://${host}:${port}`
        } else {
            ws_url = `ws://${host}:${port}/ws`
            this.baseUrl = `http://${host}:${port}`
        }

        try {
            if (typeof window !== 'undefined') {
                // applicable to the brower 
                this.ws = new WebSocket(ws_url);
            } else {
                // applicable to the nodejs  
                const WebSocket = require('ws');
                this.ws = new WebSocket(ws_url);
            }

            // set robot
            this.getType().then(res => {
                this.type = res.data.data.type
                console.log(`robot init success ! current robot type: ${this.type}`)
            }).catch(err => {
                console.error(`robot type obtain fail: ${err}`)
            })

            this.ws.onopen = () => {
                this.emit('open')
            }

            this.ws.onmessage = (message) => {
                this.emit('message', message);
            }

            this.ws.onclose = () => {
                this.emit('close');
            }

            this.ws.onerror = (err: Event) => {
                this.emit('error', err);
            }

        } catch (e) {
            console.error(`robot init fail ==> ${e}`)
        }

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
    private static cover_param(param: number, value: string, minThreshold: number, maxThreshold: number): number {
        if (param == undefined) {
            console.warn(`Illegal parameter: ${value} = ${param} `)
            param = 0
        }
        if (param > maxThreshold) {
            console.warn(`Illegal parameter: ${value} = ${param} `,
                `greater than maximum, expected not be greater than ${maxThreshold}, actual ${param}`)
            param = maxThreshold
        }
        if (param < minThreshold) {
            console.warn(`Illegal parameter: ${value} = ${param} `,
                `greater than maximum, expected not be less than ${minThreshold}, actual ${param}`)
            param = minThreshold
        }
        return param
    }

    /**
     * listen socket event:  open
     *
     * Triggered when the socket connection succeeds
     *
     * @param listener callback with no parameters
     */
    public on_open(listener: () => void) {
        this.on('open', listener);
    }

    /**
     * listen socket event:  close
     *
     * Triggered when the socket closed
     *
     * @param listener callback with no parameters
     */
    public on_close(listener: () => void) {
        this.on('close', listener);
    }

    /**
     * listen socket event:  error
     *
     * Triggered when an error occurs in the socket
     *
     * @param listener callback with Error
     */
    public on_error(listener: (err: Error) => void) {
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
    public on_message(listener: (data: any) => void) {
        this.on('message', (message) => listener(message));
    }

    /**
     * get robot type
     *
     * @return {Promise}  Returns a specific robot type such as dog human car
     */
    public async getType(): Promise<any> {
        // todo ：关于命名规则的问题。我们自己的项目，无论语言，需要统一规则，还是不同语言使用不同的规则。
        // 比如 ts 常用的大小驼峰式。python 常用的烤串式。
        return this.http_request({
            method: "GET",
            url: "/robot/type",
        })
    }

    /**
     * set robot mode
     *
     * `` applicable to the car ``
     *
     * @param {Mod} mod robot motion mode
     * @return {Promise}  return
     */
    public async setMode(mod: Mod): Promise<any> {
        if (this.type == RobotType.CAR.toString()) {
            this.mod = mod
            return this.http_request({
                method: "POST",
                url: "/robot/mode",
                data: {
                    "mod_val": mod.toString()
                }
            });
        }
        console.warn('robot type not allow this command! The current function is only applicable to car');
    }

    /**
     * get the range of motion of human joints
     *
     * `` applicable to the human ``
     */
    public async get_joint_limit(): Promise<any> {
        if (this.type == RobotType.HUMAN.toString()) {
            return this.http_request({
                method: "GET",
                url: "/robot/jointLimit",
            })
        }
        console.warn('robot type not allow this command! The current function is only applicable to humans');
    }

    /**
     * get startup status of human
     *
     * `` applicable to the human ``
     */
    public async get_joint_states(): Promise<any> {
        if (this.type == RobotType.HUMAN.toString()) {
            return this.http_request({
                method: "GET",
                url: "/robot/jointStates",
            })
        }
        console.warn('robot type not allow this command! The current function is only applicable to humans');
    }

    /**
     * enable detail status of human
     *
     * `` applicable to the human ``
     *
     * @param {number} frequence frequence unit: s
     */
    public enable_debug_state(frequence: number = 1): void {
        if (this.type == RobotType.HUMAN.toString()) {
            this.websocket_send({"command": "states", "data": {"frequence": frequence}})
            console.log('The debug state is enabled successfully! ' +
                'please listen to the data with the on_message function processing function as "SonnieGetStates"')
            return
        }
        console.warn(`robot type not allow this command! The current function is only applicable to humans`);
    }

    /**
     * start robot
     */
    public async start(): Promise<any> {
        return this.http_request({
            method: "POST",
            url: "/robot/start",
        });
    }

    /**
     * stop
     */
    public async stop(): Promise<any> {
        return this.http_request({
            method: "POST",
            url: "/robot/stop",
        });
    }

    /**
     * reset
     *
     * The device is reset to zero or reset to the initial state.
     *
     * ``applicable to the human``
     */
    public async reset(): Promise<any> {
        return this.http_request({
            method: "POST",
            url: "/robot/reset",
        });
    }

    /**
     * Stand in place
     *
     *  ``applicable to the human``
     */
    public async stand(): Promise<any> {
        if (this.type == RobotType.HUMAN.toString()) {
            return this.http_request({
                method: "POST",
                url: "/robot/stand"
            })
        }   
        console.warn('robot type not allow this command! The current function is only applicable to human');
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
    public move(angle: number, speed: number): void {
        angle = Robot.cover_param(angle, 'angle', -45, 45)
        speed = Robot.cover_param(speed, 'speed', -0.8, 0.8)
        this.websocket_send({
            "command": "move",
            "data": {"angle": angle, "speed": speed}
        })
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
    public head(roll: number, pitch: number, yaw: number): void {
        if (this.type == RobotType.HUMAN.toString()) {
            this.websocket_send({"command": "head", "data": {"roll": roll, "pitch": pitch, "yaw": yaw}})
        }
        console.warn('robot type not allow this command! The current function is only applicable to human');
    }

    /**
     * control motion rotation and fluctuate
     *
     * @param {number} rotate_speed  rotate speed
     * @param {number} fluctuate_cycle  fluctuate_cycle cycle, top and bottom once for a group
     * @param callback
     */
    public action_rotate_and_fluctuate(rotate_speed: number, fluctuate_cycle: number, callback: () => void): void {
        if (this.type != RobotType.CAR.toString()) {
            console.warn('robot type not allow this command! The current function is only applicable to car');
            return
        }

        rotate_speed = Robot.cover_param(rotate_speed, "rotate_speed", 0, 500)

        let that = this
        let p2: number[] = [0, 0, 0, 0]
        let p3: number[] = [0, 0, 0, 0]
        let p4: number[] = [0, 0, 0, 0]

        let fluctuate_delay_time: number = 1800
        let reversal_flag = false
        let p2_offset: number = 30
        let p2_current_offset: number = -30

        const init = () => {
            p2 = [0, 0, 0, 0]
            p3 = [90, 90, 90, 90]
            p4 = [rotate_speed, rotate_speed, rotate_speed, rotate_speed]
            that.action_init(p2, p3, p4)
        }

        const reversal_p2 = () => {
            if (reversal_flag) {
                p2_offset = -1 * p2_offset
                p2_current_offset = -2 * p2_offset
            } else {
                p2_current_offset = -30
                reversal_flag = true
            }
        }

        const fluctuate_reversal_exec = () => {
            let cycle = 180 * 0.5;
            let delay_time = fluctuate_delay_time / cycle;
            for (let i = 0; i < cycle; i++) {
                setTimeout(() => {
                    let offset_val = p2_current_offset / cycle
                    p2[0] += offset_val
                    p2[1] += offset_val
                    p2[2] += offset_val
                    p2[3] += offset_val
                    that.action_send(p2, p3, p4)
                }, delay_time * i)
            }
        };

        const fluctuate = () => {
            let delay_time = fluctuate_delay_time + 100
            let cycle = fluctuate_cycle * 2
            for (let i = 0; i <= cycle; i++) {
                setTimeout(() => {
                    if (i < cycle) {
                        reversal_p2()
                        fluctuate_reversal_exec()
                    } else {
                        that.action_destroy()
                        callback()
                        return
                    }
                }, delay_time * i)
            }
        }

        init()
        fluctuate()

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
    public action_send(p2_params: number[] = [0, 0, 0, 0], p3_params: number[] = [0, 0, 0, 0], p4_params: number[] = [0, 0, 0, 0]): void {
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
        })
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
    public action_init(p2_params: number[] = [-0.0001, -0.0001, -0.0001, -0.0001], p3_params: number[] = [], p4_params: number[] = []): void {
        // When the action mode is enabled! You need to send a non-zero command to activate the robot
        this.action_send(p2_params, p3_params, p4_params)
        this.setMode(Mod.MOD_ACTION).then(() => {
            console.log('robot action mod init success')
        })
    }

    /**
     * Control car robot to DIY after
     *
     * `` applicable to the car ``
     */
    public action_destroy() {
        this.setMode(Mod.MOD_HOME).then(() => {
            console.log('robot action exec end')
        })
        this.setMode(Mod.MOD_FIX).then(() => {
            console.log('robot auto fix success')
        })
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
    private websocket_send(message: any) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message))
            this.retry_count = 0
            return
        }
        if (this.retry_count == 5) {
            throw new Error("WebSocket SendMsg Error...")
        }
        this.retry_count += 1

        console.warn("WebSocket state not ready...: retry: %s", this.retry_count)
        setTimeout(() => {
            this.websocket_send(message)
        }, 1000)
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
    private async http_request<T>(config: AxiosRequestConfig): Promise<T> {
        return axios.request({
            timeout: 5000,
            baseURL: this.baseUrl,
            ...config
        })
    }

}
