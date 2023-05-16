"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
// begin lesson code
const rxjs_1 = require("rxjs");
const observer = {
    next: (value) => console.log('next', value),
    error: (error) => console.log('error', error),
    complete: () => console.log('complete, end of observer'),
};
const source$ = (0, rxjs_1.from)(fetch("https://api.github.com/users/octoca"));
const subscription = source$.subscribe(observer);
// const subscriptionTwo = source$.subscribe(observer);
