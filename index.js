import { EMPTY, fromEvent, interval, merge } from "rxjs";
import { map, scan, startWith, switchMap, takeWhile } from "rxjs/operators";

const countdown = document.getElementsByClassName('countdown')[0]
const message = document.getElementsByClassName('message')[0]
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

const startBtn$ = fromEvent(startBtn, 'click');
const stopBtn$ = fromEvent(stopBtn, 'click');

const COUNTDOWN_FROM = 10

countdown.innerHTML = COUNTDOWN_FROM;
merge(
	startBtn$.pipe(map(() => true)),
	stopBtn$.pipe(map(() => false))
).pipe(
	switchMap(shouldRun => shouldRun ? interval(1000) : EMPTY),

	map(() => -1),

	scan((accumulator, value) => {
		return accumulator + value
	}, COUNTDOWN_FROM),

	takeWhile(el => el >= 0),

	startWith(COUNTDOWN_FROM),

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
