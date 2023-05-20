import { fromEvent } from "rxjs";
import { concatMap, debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { ajax } from 'rxjs/ajax'

const inputElement = document.getElementById(
	"input-text"
);
const listItem = document.getElementById("list_item")
const BASE_URL = "https://api.openbrewerydb.org/breweries";

const input$ = fromEvent(inputElement, "keyup");


input$.pipe(

	debounceTime(700),
	map(el => el.target.value),
	distinctUntilChanged(),
	concatMap(searchTerm => {
		return ajax.getJSON(
			`${BASE_URL}?by_name=${searchTerm}`
		)
	})

).subscribe({
	next: response => {
		if (response.length == 0) {
			listItem.innerHTML = "<div class='empty'>Not found</div>"
		} else {
			listItem.innerHTML = response.map(el => `<div class="line"><div class="el">${el.name}</div><div class="el_type">${el.brewery_type}</div></div>`).join("")
		}
	},
	error: er => console.log("l'erreur est : ", er),
	complete: () => console.log("Fin du traitement")
})