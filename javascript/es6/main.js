"use strict";

import * as tests from "testscript";

function aids() {
    console.log(tests.sum(5+1));
};

var apples = [1, 2, 3];
console.log(apples);

apples.map( n => n + 5);
console.log(apples);