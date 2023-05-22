import { fromEvent, interval, of, timer } from "rxjs"
import { takeUntil, finalize, tap, map, exhaustMap } from "rxjs/operators"

const status = document.getElementById("status")
const start_btn = document.getElementById("start-btn")
const stop_btn = document.getElementById("stop-btn")
const image = document.getElementById("dog-image")

const start$ = fromEvent(start_btn, 'click');
const stop$ = fromEvent(stop_btn, 'click');

function getRandomImage() {
	const randomNumber = Math.floor(Math.random() * 11);
	return `./src/images/dog${randomNumber}.jpeg`;
}


start$.pipe(
	exhaustMap(() =>
		timer(10, 2000).pipe(

			tap(() => {
				status.innerHTML = "Starting"
				status.className = "polling-status-started"
			}),

			map(() => getRandomImage()),

			takeUntil(stop$),

			finalize(() => {
				status.innerHTML = "Stoped"
				status.className = "polling-status-stoped"
			})

		)
	)
).subscribe((imgLink) => image.src = imgLink)