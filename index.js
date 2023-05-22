import { combineLatest, from, fromEvent, interval, merge } from "rxjs";
import { combineLatestWith, delay, map } from "rxjs/operators";

const click$ = fromEvent(document, "click");
const keyup$ = fromEvent(document, "keyup");


click$.pipe(
	combineLatestWith(keyup$),
	map(([e1, e2]) => `first element is : ${e1.pointerType}, seconde element is : ${e2.code}`)
).subscribe(console.log)