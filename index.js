import { from, interval, reduce } from "rxjs";

const number = [1, 2, 3, 4, 5];

function ttReducer(accumule, current) {
	console.log({ accumule, current });
	return accumule += current
}

interval(1000).pipe(
	reduce(ttReducer)
).subscribe(console.log)
