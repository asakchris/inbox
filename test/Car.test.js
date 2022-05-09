const assert = require('assert');

class Car {
    park() {
        return 'Stopped';
    }

    drive() {
        return 'Vrooom!';
    }
}

let car;

beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('should park', () => {
        assert.equal(car.park(), 'Stopped');
    });

    it('should drive', () => {
        assert.equal(car.drive(), 'Vrooom!');
    });
});
