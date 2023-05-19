import { interval } from 'rxjs';
import { throttleTime, sampleTime } from 'rxjs/operators';

// Création d'un observable émettant une valeur toutes les 200 millisecondes
const source = interval(200);

// Utilisation de l'opérateur throttleTime pour émettre la première valeur toutes les 500 millisecondes
const throttled = source.pipe(throttleTime(500));

// Utilisation de l'opérateur sampleTime pour émettre la dernière valeur toutes les 500 millisecondes
const sampled = source.pipe(sampleTime(500));

// Souscription aux observables résultants
throttled.subscribe(value => {
	console.log('Throttled:', value);
});

sampled.subscribe(value => {
	console.log('Sampled:', value);
});
