import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './reducers/rootReducer';
const reduxConfig = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
};

export default reduxConfig;
