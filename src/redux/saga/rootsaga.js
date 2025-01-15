// src/sagas/rootSaga.js
import {all, fork} from 'redux-saga/effects';
import userCreateSaga from './userSaga';
import analysisSaga from './analysisSaga';

export default function* rootSaga() {
  yield all([fork(userCreateSaga), fork(analysisSaga)]);
}
