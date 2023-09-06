import {Car, get_robot_type, Human, CarMod} from '../index'

const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));


get_robot_type({host: '192.168.9.17'}).then((res: any) => {
    let type = res.data.data;

    if (type === 'human') {
        let human = new Human({host: '192.168.9.17'});
        sleep(5).then(() => test_robot(human) )

    }
    if (type === 'car') {
        let car = new Car({host: '192.168.9.17'});
        sleep(5).then(() => test_car(car))

    }
});


const test_robot = async (human: Human) => {
    await human.start();
    await sleep(10)
    await human.stand()
    await sleep(5)
    await human.enable_debug_state(1)
    human.walk(0.1, 0.1)
}

const test_car = async (car: Car) => {
    await car.start();
    await sleep(10)
    await car.set_mode(CarMod.MOD_4_WHEEL)
    await sleep(1)
    car.move(0.1, 0.1)
}