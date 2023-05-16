import { interval } from "rxjs";
import { reduce, take } from "rxjs/operators";

const number = [1, 2, 3, 4, 5];

const ttReducer = (accumule, current) => {
	return accumule + current
}

interval(100).pipe(
	take(5),
	reduce(ttReducer, 0)
).subscribe({
	next: console.log,
	complete: () => console.log("Prosses is finished")
})
