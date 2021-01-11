export default function Timer(callback, milliseconds) {
    this.timeLeft = milliseconds / 1000;
    let timer = setInterval(callback, milliseconds);
    let timeout = null;
    let isPaused = false;
    this.counter = setInterval(() => {
        if (!isPaused) {
            this.timeLeft--;
            if (this.timeLeft === 0) {
                this.timeLeft = milliseconds / 1000;
            }
        }
    }, 1000);

    this.start = function (time) {
        if (!timer) {
            if (time !== 0) {
                clearTimeout(timeout);
                timeout = null;
                timeout = setTimeout(() => {
                    callback();
                    timer = setInterval(callback, milliseconds);
                }, time);
            } else {
                timer = setInterval(callback, milliseconds);
            }
        }
        return this;
    }

    this.stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        return this;
    }

    this.restart = function () {
        this.timeLeft = milliseconds / 1000;
        isPaused = false;
        return this.stop().start(0);
    }

    this.pause = function () {
        isPaused = true;
        clearTimeout(timeout);
        timeout = null;
        this.stop();
    }

    this.resume = function () {
        if (!timer) {
            isPaused = false;
            this.start(this.timeLeft * 1000);
        }
    }
}