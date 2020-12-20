export default function Timer(callback, milliseconds) {
    let timer = setInterval(callback, milliseconds);

    this.start = function() {
        if (!timer) {
            this.stop();
            timer = setInterval(callback, milliseconds);
        }
        return this;
    }

    this.stop = function() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        return this;
    }

    this.restart = function() {
        return this.stop().start();
    }
}