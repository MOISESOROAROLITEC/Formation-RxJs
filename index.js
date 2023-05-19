import { fromEvent, interval } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";

const click$ = fromEvent(document, "click");
const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval(500);

mousedown$.pipe(

	mergeMap(() => interval$.pipe(
		takeUntil(mouseup$)
	))

).subscribe({
	next: el => console.log("el est : ", el),
	error: er => console.log("l'erreur est : ", er),
	complete: () => console.log("Fin du traitement")
})