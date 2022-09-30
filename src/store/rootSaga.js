import { all, call } from 'redux-saga/effects';
import { accountSaga } from '../tomaho_account/base/controllers/account.saga';
import { banHangSaga } from '../tomaho_account/base/controllers/banhang.saga';
import { authSaga } from '../tomaho_auth/controllers/auth.saga';

export function* rootSaga(){
    yield all([call(accountSaga), call(authSaga), call(banHangSaga)])
} 