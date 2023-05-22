import { from, fromEvent, interval } from "rxjs";
import { filter, map, scan, takeUntil, takeWhile } from "rxjs/operators";

const number = [1, 2, 3, 4, 5];

const countdown = document.getElementsByClassName('countdown')[0]
const message = document.getElementsByClassName('message')[0]
const stopBtn = document.getElementById('stop-btn');

const stopBtn$ = fromEvent(stopBtn, 'click');

const subscroptor = interval(1000).pipe(
	map(() => -1),

	scan((accumulator, value) => {
		return accumulator + value
	}, 11),

	takeWhile(el => el >= 0),

	takeUntil(stopBtn$)

)

subscroptor.subscribe((val) => {
	countdown.innerHTML = val;
	if (!val)
		message.innerHTML = "Countdown finished !"
});