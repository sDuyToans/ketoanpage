import { all, takeLeading, call, put, select } from "redux-saga/effects";
import { selectMenu } from "../models/Menu/menu.selector";
import { ACCOUNT_ACTION_TYPES } from "./account.types";

const handleDataReturn = (menuData, key) => {
    return menuData.filter(item => item.key === key)
}

export function* handleMenuData(props){
 try {
    const menuData = yield select(selectMenu);
    const newSideBar = handleDataReturn(menuData, props.key)
    yield put({
        type: ACCOUNT_ACTION_TYPES.UPDATA_SIDEBAR_MENU,
        payload: newSideBar
    })
 } catch (error) {
    console.log(error)
 }
}

export function* fetchMenuData() {
    yield takeLeading(ACCOUNT_ACTION_TYPES.FETCH_MENU_DATA, handleMenuData)
}
export function* accountSaga(){
    yield all([call(fetchMenuData)])
}