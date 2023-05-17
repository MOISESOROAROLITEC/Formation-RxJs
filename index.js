import { from, fromEvent, interval } from "rxjs";
import { filter, map, scan, takeUntil, takeWhile, tap } from "rxjs/operators";

const number = [1, 2, 3, 4, 5];

const countdown = document.getElementsByClassName('countdown')[0]
const message = document.getElementsByClassName('message')[0]
const stopBtn = document.getElementsByClassName('stop_btn')[0]
const stopClic = fromEvent(stopBtn, "click")

const subscroptor = interval(400).pipe(
	map(() => -1),

	scan((accumulator, value) => {
		return accumulator + value
	}, 11),
	takeUntil(stopClic),
	takeWhile(el => el >= 0),
)

subscroptor.subscribe((val) => {
	countdown.innerHTML = val;
	if (!val) {
		stopBtn.remove()
		message.innerHTML = "Countdown finished !"
	};

});