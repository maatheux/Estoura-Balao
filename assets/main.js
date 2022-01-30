(function () {
    function StartBalloon() {
        const balloonField = document.querySelector('.balloon-field');
        const totalField = document.querySelector('.total');
        const timeField = document.querySelector('.tempo');
        let sec = 30;
        let min = 1;
        let total = 0;
        let intervalBalloons = 1000;

        const createBalloon = () => {
            let balloon = document.createElement('div');
            balloon.classList.add('balao');
            balloon.style.top = `${Math.floor(Math.random() * (86 - 2) + 2)}%`;
            balloon.style.left = `${Math.floor(Math.random() * (96 - 2) + 2)}%`;
            balloonField.appendChild(balloon);
        };

        const addNumber = newNumber => {
            totalField.innerHTML = `Total: ${newNumber}`;
        };

        const addTime = (minutes, second) => {
            timeField.innerHTML = `Tempo: ${addLeftZero(minutes)}:${addLeftZero(
                second
            )}`;
        };

        const addLeftZero = num => (num < 10 ? `0${num}` : num);

        const deleteBalloon = () => {
            balloonField.addEventListener('click', e => {
                const el = e.target;

                if (el.classList.contains('balao')) {
                    balloonField.removeChild(el);
                    total++;
                    intervalBalloons -= 15;
                    intervalBalloons < 500
                        ? (intervalBalloons = 500)
                        : (intervalBalloons = intervalBalloons);
                    addNumber(total);
                }
            });
        };

        const clock = () => {
            addTime(min, sec);
            let numClock = () => {
                if (sec === 0 && min === 0) {
                    return;
                }
                if (sec === 0) {
                    sec = 59;
                    min--;
                } else {
                    sec--;
                }
                addTime(min, sec);
                const timeout = setTimeout(numClock, 1000);
            };
            setTimeout(numClock, 1000);
        };

        this.start = () => {
            addNumber(total);
            clock();
            const process = () => {
                if (sec === 0 && min === 0) {
                    while (balloonField.firstChild) {
                        balloonField.removeChild(balloonField.lastChild);
                    }
                    return;
                }
                createBalloon();

                const timeoutBalloon = setTimeout(process, intervalBalloons);
            };
            setTimeout(process, intervalBalloons);
            deleteBalloon();
        };
    }

    document.querySelector('.balloon-field').addEventListener('click', e => {
        let element = e.target;
        const balloonField = document.querySelector('.balloon-field');

        if (element.classList.contains('start')) {
            while (balloonField.firstChild) {
                balloonField.removeChild(balloonField.lastChild);
            }
            const startBalloons = new StartBalloon();
            startBalloons.start();
        }
    });
})();
