// src/sagas/rootSaga.js
import {all, fork} from 'redux-saga/effects';
import userCreateSaga from './userSaga';
import analysisSaga from './analysisSaga';
import subscriptionSaga from './subscriptionSaga';
import userSaga from './getUserSaga';
import bookmarkSaga from './updateBookmarSaga';
import getBookmarkSaga from './getBookmarkDataSaga';
import getActivitySaga from './getActivityDataSaga';
import {watchUpdateNewsletter, watchUpdateNotification} from './editSaga';
import watchUpdateProfile from './updateProfileSaga';
import {watchDeleteUserSaga} from './deleteUserSaga';
import watchUpdateSubscription from './updateSubsSaga';

export default function* rootSaga() {
  yield all([
    fork(userCreateSaga),
    fork(analysisSaga),
    fork(subscriptionSaga),
    fork(userSaga),
    fork(bookmarkSaga),
    fork(getBookmarkSaga),
    fork(getActivitySaga),
    fork(watchUpdateNewsletter),
    fork(watchUpdateNotification),
    fork(watchUpdateProfile),
    fork(watchDeleteUserSaga),
    fork(watchUpdateSubscription),
  ]);
}
