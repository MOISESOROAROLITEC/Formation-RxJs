import { from, fromEvent, interval } from "rxjs";
import { endWith, exhaustMap, filter, map, scan, skipUntil, startWith, takeUntil, takeWhile, tap } from "rxjs/operators";

const click$ = fromEvent(document, "click");
const keyup$ = fromEvent(document, "keyup");

const countdown = document.getElementsByClassName('countdown')[0]
const message = document.getElementsByClassName('message')[0]
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

const startBtn$ = fromEvent(startBtn, 'click');
const stopBtn$ = fromEvent(stopBtn, 'click');

const COUNTDOWN_FROM = 10

countdown.innerHTML = COUNTDOWN_FROM;

startBtn$.pipe(
	exhaustMap(() =>
		interval(1000).pipe(

			map(() => -1),

			tap(() => console.log("object")),

			scan((accumulator, value) => {
				return accumulator + value
			}, COUNTDOWN_FROM),

			takeWhile(el => el >= 0),

			startWith(COUNTDOWN_FROM),

			takeUntil(stopBtn$)
		)
	)
).subscribe((val) => {
	if (!val) {
		message.style.display = "grid"
		message.innerHTML = "Countdown finished !"
		countdown.innerHTML = val;
	} else {
		countdown.innerHTML = val;
		message.style.display = "none"
	}
});
