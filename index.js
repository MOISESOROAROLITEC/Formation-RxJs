const number = [1, 2, 3, 4, 5];

function ttReducer(accumule, current) {
	console.log({ accumule, current });
	return accumule += current
}

const total = number.reduce(ttReducer, 0);

console.log("Total is : ", total);