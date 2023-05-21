import { fromEvent } from "rxjs";
import { catchError, concatMap, debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { ajax } from 'rxjs/ajax'

const inputElement = document.getElementById(
	"input-text"
);
const listItem = document.getElementById("list_item");
const BASE_URL = "https://api.openbrewerydb.org/breweries";
// const reload = document.getElementById("reload");

// reload.addEventListener("click", () => {
// 	location.reload();
// })

const input$ = fromEvent(inputElement, "keyup");


input$.pipe(
	debounceTime(700),
	map(el => el.target.value),
	distinctUntilChanged(),
	concatMap(searchTerm => {
		return ajax.getJSON(
			`${BASE_URL}?by_name=${searchTerm}`
		).pipe(
			catchError((error, caught) => {
				console.log({ error, caught })
				return { error, caught }
			})
		)
	})

).subscribe({
	next: response => {
		console.log(response);
		if (response.length == 0) {
			listItem.innerHTML = "<div class='empty'>Not found</div>"
		} else {
			listItem.innerHTML = response.map(el => `<div class="line"><div class="el">${el.name}</div><div class="el_type">${el.brewery_type}</div></div>`).join("")
		}
	},
	error: er => {
		listItem.innerHTML = "<div class='empty'>Erreur de connection, veillez recharger la page</div><button id='reload'>reload this page</button>";

		const reload = document.getElementById("reload");
		reload.addEventListener("click", () => {
			location.reload();
		});
	},
	complete: () => console.log("Fin du traitement")
})