import { from, fromEvent, interval, merge } from "rxjs";
import { delay, endWith, exhaustMap, filter, map, scan, skipUntil, startWith, takeUntil, takeWhile, tap } from "rxjs/operators";

const click$ = fromEvent(document, "click");
const keyup$ = fromEvent(document, "keyup");

// click$.subscribe(console.log)
// keyup$.subscribe(console.log)

merge(
	click$.pipe(delay(1000)),
	keyup$
).subscribe(console.log)