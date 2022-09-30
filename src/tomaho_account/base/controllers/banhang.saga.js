import { all, call, put, select, takeEvery, takeLeading } from 'redux-saga/effects'
import { selectDataBanHang } from '../models/banhangreducer/banhang.selector'
import { BANHANG_ACTION_TYPES } from './banhang.types'

const findDataSearch = (datas, keysearch) => {
    if (keysearch === '') {
        // console.log(datas);
        return datas;
    }
    const indexOfSearch = [];
    for (const data of datas) {
        if (data.sochungtu.includes(keysearch)) {
            indexOfSearch.push(data.id)
        }
        if (data.sohoadon.includes(keysearch) && data.sohoadon === keysearch) {
            indexOfSearch.push(data.id)
        }
    }
    if (indexOfSearch.length === 0) {
        // console.log(datas)
        return datas;
    }
    else if (indexOfSearch.length > 0) {
        const returnData = [];
        for (let i = 0; i < indexOfSearch.length; i++) {
            const newData = datas.filter(item => item.id == indexOfSearch[i])
            returnData.push(newData[0])
        }
        // console.log(returnData)
        return returnData;
    }
}

export function* handleSearch(props) {
    try {
        const dataBanHang = yield select(selectDataBanHang);
        const cloneData = [...dataBanHang];
        const searchKey = props.payload.searchData;
        const dataReturn = yield call(findDataSearch, cloneData, searchKey);
        yield put({
            type: BANHANG_ACTION_TYPES.UPDATE_RETURN_VALUESEARCH,
            payload: dataReturn
        })
    } catch (error) {
    }
}

export function* onSearch() {
    yield takeLeading(BANHANG_ACTION_TYPES.UPDATE_SEARCHKEY, handleSearch)
}

const findDataSelect = (datas, keySelect) => {
   switch (keySelect) {
        case 'Tất cả':
            return datas;
        case 'Ghi sổ': 
            return datas.filter(item => item.trangthai === 'Ghi sổ');
        case 'Chưa ghi sổ':
            return datas.filter(item => item.trangthai === 'Chưa ghi sổ');
        case 'Huỷ chứng từ':
            return datas.filter(item => item.trangthai === 'Huỷ chứng từ');
        default: 
            return datas;
   }
}

export function* handleSelect(props) {
    try {
        const selectKey = props.payload;
        const dataBanHang = yield select(selectDataBanHang);
        const cloneData = [...dataBanHang];
        const dataReturn = yield call(findDataSelect, cloneData, selectKey);
        yield put({
            type: BANHANG_ACTION_TYPES.UPDATE_RETURN_VALUESEARCH,
            payload: dataReturn
        })
    } catch (error) {
        
    }
}

export function* onSelect() {
    yield takeEvery(BANHANG_ACTION_TYPES.UPDATE_SELECT_VALUE, handleSelect)
}
export function* banHangSaga() {
    yield all([call(onSearch), call(onSelect)])
}