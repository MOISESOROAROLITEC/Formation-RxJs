import { filter, fromEvent, map } from "rxjs";

const source$ = fromEvent(document, "scroll");

function getScrollPercentage(target) {
	// console.log("la cible est : ", target);
	const { scrollTop, scrollHeight, clientHeight } = target;
	return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

const progressBar = document.querySelector('.progress-bar')
console.log(progressBar);

const percentage$ = source$.pipe(
	map(({ target }) => getScrollPercentage(target.documentElement))
)

percentage$.subscribe(el => {
	progressBar.style.width = `${el}%`;
	// console.log(progressBar);
});