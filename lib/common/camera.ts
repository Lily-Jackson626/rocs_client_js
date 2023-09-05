import axios from 'axios';

export class Camera {

    public videoStreamUrl: string | undefined
    public videoStreamStatus: boolean = false;

    constructor(baseurl: string) {
        axios.get(`${baseurl}/control/camera_status`)
            .then(response => {
                this.videoStreamStatus = response.data.data
                if (this.videoStreamStatus) {
                    this.videoStreamUrl = `${baseurl}/control/camera`
                }
            })
            .catch(err => {
                console.error(err)
                return undefined
            });
    }
}