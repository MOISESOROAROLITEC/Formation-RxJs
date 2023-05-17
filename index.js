import { asyncScheduler, fromEvent, map, throttleTime } from "rxjs";

const progressBar = document.querySelector('.progress-bar')
const clicBtn = document.getElementById("button");

const clicBtn$ = fromEvent(clicBtn, "click");
const scroll$ = fromEvent(document, "scroll");


scroll$.pipe(

	throttleTime(80, asyncScheduler,
		{
			leading: true,
			trailing: true
		}
	),
	map(({ target }) => {

		const { scrollTop, scrollHeight, clientHeight } = target.documentElement;
		return (scrollTop / (scrollHeight - clientHeight)) * 100;

	})
).subscribe(el => {
	progressBar.style.width = `${el}%`;
});

clicBtn$.pipe(
	throttleTime(1000)
).subscribe(console.log);