import {Car, get_robot_type, Human, CarMod} from '../index'

const sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));

get_robot_type({host: '192.168.9.17'}).then((res: any) => {
    let type = res.data.data;

    if (type === 'human') {
        let human = new Human({host: '192.168.9.17'});
        sleep(5).then(r => test_robot(human) )

    }
    if (type === 'car') {
        let car = new Car({host: '192.168.9.17'});
        sleep(5)
        test_car(car)
    }
});


const test_robot = (human: Human) => {
    human.start();
    sleep(10).then(() => {
        human.stand()
        sleep(5).then(() => {
            human.walk(0.1, 0.1)
        })
    })
}

const test_car = (car: Car) => {
    car.start();
    sleep(10).then(() => {
        car.set_mode(CarMod.MOD_4_WHEEL).then(() => {
            car.move(0.1, 0.1)
        })
    })
}