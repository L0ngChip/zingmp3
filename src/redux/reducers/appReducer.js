import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
};
// Hàm xử lý acions
const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData.find((item) => item.sectionType === 'banner').items || null,
            };

        default:
            return state;
    }
};

export default appReducer;
