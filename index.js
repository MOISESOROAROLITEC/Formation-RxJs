import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { ajax } from 'rxjs/ajax'

const inputElement = document.getElementById(
	"input-text"
);
const listItem = document.getElementById("list_item")
const BASE_URL = "https://api.openbrewerydb.org/breweries";

const input$ = fromEvent(inputElement, "keyup");


input$.pipe(

	debounceTime(1000),
	map(el => el.target.value),
	distinctUntilChanged(),
	switchMap(searchTerm => {
		return ajax.getJSON(
			`${BASE_URL}?by_name=${searchTerm}`
		)
	})

).subscribe({
	next: response => {
		listItem.innerHTML = response.map(el => `<div class="el">${el.name}</div>`).join("<br/>")
	},
	error: er => console.log("l'erreur est : ", er),
	complete: () => console.log("Fin du traitement")
})