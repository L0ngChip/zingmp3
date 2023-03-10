import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    todaySelection: {},
};
// Hàm xử lý acions
const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData.find((item) => item.sectionId === 'hSlider').items || null,
                todaySelection: action.homeData.find((item) => item.sectionId === 'hAutoTheme1') || {},
            };

        default:
            return state;
    }
};

export default appReducer;
