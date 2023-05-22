import { fromEvent, interval, of, timer } from "rxjs"
import { ajax } from 'rxjs/ajax'
import { mergeMap, mergeMapTo, takeUntil, finalize, tap, switchMap, switchMapTo, map } from "rxjs/operators"

const status = document.getElementById("status")
const start_btn = document.getElementById("start-btn")
const stop_btn = document.getElementById("stop-btn")
const image = document.getElementById("dog-image")

const URL = "https://random.dog/woof.json"

const start$ = fromEvent(start_btn, 'click');
const stop$ = fromEvent(stop_btn, 'click');

function getRandomImage() {
	const randomNumber = Math.floor(Math.random() * 11);
	return `./src/images/dog${randomNumber}.jpeg`;
}




start$.pipe(
	mergeMapTo(
		timer(10, 1000).pipe(

			tap(() => {
				status.innerHTML = "Starting"
				status.className = "polling-status-started"
			}),

			// switchMapTo(
			// 	ajax.get(URL)
			// ),

			map(() => getRandomImage()),

			takeUntil(stop$),

			finalize(() => {
				status.innerHTML = "Stoped"
				status.className = "polling-status-stoped"
			})

		)
	)
).subscribe((imgLink) => image.src = imgLink)