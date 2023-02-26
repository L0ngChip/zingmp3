import appReducer from './appReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';

import musicReducer from './musicReducer';
// gom các reducer lại thành 1
const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const songConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId'],
};

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(songConfig, musicReducer),
});

export default rootReducer;
