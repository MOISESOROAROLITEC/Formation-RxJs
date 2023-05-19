import { fromEvent, interval } from "rxjs";
import { map, sample, sampleTime } from "rxjs/operators";

const click$ = fromEvent(document, "click");
const timer$ = interval(500);

timer$.pipe(

	sampleTime(1000),
	sample(click$),
	// map(({ clientX, clientY }) => ({ clientX, clientY }))

).subscribe((el) => console.log("el est : ", el))