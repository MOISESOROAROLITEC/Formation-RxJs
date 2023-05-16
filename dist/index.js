"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const source$ = (0, rxjs_1.fromEvent)(document, "scroll");
function getScrollPercentage(target) {
    // console.log("la cible est : ", target);
    const { scrollTop, scrollHeight, clientHeight } = target;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
}
const percentage$ = source$.pipe((0, rxjs_1.map)(({ target }) => getScrollPercentage(target.documentElement)));
const percent = percentage$.subscribe(el => console.log(el));
console.log(percent);
