import { fromEvent } from "rxjs";
import { filter, map, take } from "rxjs/operators";

const source$ = fromEvent(document, 'click')
source$.pipe(
	map(element => ({
		x: element.clientX,
		y: element.clientY
	}
	)),
	// take(1)
	filter(({ y }) => y > 200)
).subscribe(console.log)