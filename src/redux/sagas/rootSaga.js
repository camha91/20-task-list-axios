// Redux has 2 types:
// Type 1: action => object
// Type 2: action => function (usually use to call api or call other functions)
import { fork, take } from "redux-saga/effects";

function* getTaskApi() {
    while (true) {
        yield take("getTaskApiAction"); // follow action => to see which action dispatch then do the following
        console.log("getTaskApi");
        // call api dispatch on reducer...
    }
}

export function* rootSaga() {
    yield fork(getTaskApi);
}
