import { all, call, takeLatest, put, select } from "redux-saga/effects";

import { UserActionTypes } from "../user/user.types";
import { clearCart, setCartFromFirebase } from "./cart.actions";
import { getCartRef } from "../../firebase/firebase.utils";
import { CartActionTypes } from "./cart.types";

import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* checkCartFromFirebase({ payload: user }) {
    try {
        const cartRef = yield getCartRef(user.id);
        const cartSnapshot = yield cartRef.get();
        yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
    } catch (error) {
        console.log(error);
    }
}

export function* updateCartInFirebase() {
    try {
        const currentUser = yield select(selectCurrentUser);
        const cartItems = yield select(selectCartItems);
        const cartRef = yield getCartRef(currentUser.id);
        cartRef.update({ cartItems });
    } catch (error) {
        console.log(error);
    }
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange() {
    yield takeLatest(
        [
            CartActionTypes.ADD_ITEM,
            CartActionTypes.REMOVE_ITEM,
            CartActionTypes.CLEAR_ITEM_FROM_CART,
        ],
        updateCartInFirebase
    );
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onSignInSuccess),
        call(onCartChange),
    ]);
}
