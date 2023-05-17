import { fromEvent } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

const source$ = fromEvent(document, 'click')
source$.pipe(
	map(element => ({
		x: element.clientX,
		y: element.clientY
	}
	)),
	takeWhile(({ y }) => y > 200)
).subscribe({
	next: console.log,
	complete: () => console.log("complet !")
})