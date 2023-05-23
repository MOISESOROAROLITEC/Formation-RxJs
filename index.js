import { combineLatestWith, fromEvent, map } from "rxjs";

const amount = document.getElementById("amount");
const interest = document.getElementById("interest");
const duration = document.getElementsByName("duration");
const mounthlyPaementElement = document.getElementById("mounthly-paement");

const amount$ = fromEvent(amount, "change");

function getValueFromElement(element) {
	return fromEvent(element, 'change').pipe(
		map(el => el.target.value)
	)
}

function calculeMonthlyPaiement(amount, interest, duration) {
	const calculateInterest = interest / 1200;
	const total = amount * calculateInterest / (1 - (Math.pow(1 / (1 + calculateInterest), duration)));
	return total.toFixed(2);
}

amount$.pipe(
	map(el => el.target.value),
	combineLatestWith(
		getValueFromElement(interest),
		getValueFromElement(duration)
	),
	map(el => ({ amount: el[0], interest: el[1], duration: el[2] }))
).subscribe(datas => {
	const mounthlyPaement = calculeMonthlyPaiement(datas.amount, datas.interest, datas.duration)
	mounthlyPaementElement.innerHTML = mounthlyPaement;
});

