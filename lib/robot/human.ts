import {ConnectOption, RobotBase} from "./robot_base";

/**
 * GR-1人形机器人对象
 *
 * 在你需要连接GR-1人形机器人的时候，你可以创建一个new Human()对象！ 这将会在后台连接到人形的控制系统，并提供对应的控制函数和状态监听！
 */
export class Human extends RobotBase {

    constructor(option?: ConnectOption) {
        super(option);
    }

    /**
     * GR-01人形设备将会原地站立
     *
     * 当进行了start之后如果你想对GR-01人形设备进行指令控制，你同样需要调用该函数让其位置stand的模式。
     * 如果是在行走过程中需要停止，你同样可以调用该函数进行stand
     *
     * @return {Promise}  return
     */
    public async stand(): Promise<any> {
        return super.http_request({
            method: "POST",
            url: "/robot/stand"
        })
    }

    /**
     * 获取关节限位
     *
     * @return {Promise}  return
     */
    public async get_joint_limit(): Promise<any> {
        return super.http_request({
            method: "GET",
            url: "/robot/join_limit",
        })
    }

    /**
     * 获取关节状态
     *
     * @return {Promise}  return
     */
    public async get_joint_states(): Promise<any> {
        return super.http_request({
            method: "GET",
            url: "/robot/joint_states",
        })
    }

    /**
     * 开启state调试模式
     * 触发该函数将会在后台触发GR-01人形设备主动发送状态值的指令，因此对应的你需要监听on_message函数进行处理\
     *
     * @param {number} frequence 频率 (整数)
     * @return {Promise}  return
     */
    public async enable_debug_state(frequence: number = 1): Promise<any> {
        return super.http_request({
            method: "GET",
            url: "/robot/enable_states_listen",
            params: {
                frequence: frequence
            }
        })
    }

    /**
     * 关闭state调试模式
     * @return {Promise}  return
     */
    public async disable_debug_state(): Promise<any> {
        return super.http_request({
            method: "GET",
            url: "/robot/disable_states_listen",
        })
    }

    /**
     * 控制GR-01人形设备行走 (该请求维持了长链接的方式进行发送)
     *
     * @param {number} angle 角度 控制方向，取值范围为正负45度。向左为正，向右为负！(浮点数8位)
     * @param {number} speed 速度 控制前后，取值范围为正负0.8。向前为正，向后为负！(浮点数8位)
     */
    public walk(angle: number, speed: number): void {
        angle = super.cover_param(angle, 'angle', -45, 45)
        speed = super.cover_param(speed, 'speed', -0.8, 0.8)
        this.websocket_send({
            "command": "move",
            "data": {"angle": angle, "speed": speed}
        })
    }


    /**
     * 控制GR-01人形头部运动 (该请求维持了长链接的方式进行发送)
     *
     * @param {number} roll  （翻滚角）：描述围绕x轴旋转的角度，左转头为负，向右转为正，范围（-17.1887-17.1887）
     * @param {number} pitch （俯仰角）：描述围绕y轴旋转的角度。前点头为正，后点头为负，范围（-17.1887-17.1887）
     * @param {number} yaw   （偏航角）：描述围绕z轴旋转的角度。左扭头为负，右扭头为正，范围（-17.1887-17.1887）
     */
    public head(roll: number, pitch: number, yaw: number): void {
        super.websocket_send({"command": "head", "data": {"roll": roll, "pitch": pitch, "yaw": yaw}})
    }


}