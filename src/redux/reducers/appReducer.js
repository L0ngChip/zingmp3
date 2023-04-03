import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    newReleaseChart: {},
    newEveryday: {},
    top100: {},
    womenMusic: {},
    isLoading: false,
    newRelease: {},
    weekChart: [],
    favoriteArtist: {},
};
const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData.find((item) => item.sectionId === 'hSlider').items || null,
                newEveryday: action.homeData.find((item) => item.sectionId === 'hAutoTheme2') || {},
                top100: action.homeData.find((item) => item.sectionId === 'h100') || {},
                newReleaseChart: action.homeData.find((item) => item.sectionId === 'hNewrelease') || {},
                womenMusic: action.homeData.find((item) => item.sectionId === 'hEditorTheme') || {},
                newRelease: action.homeData.find((item) => item.sectionType === 'new-release') || {},
                weekChart: action.homeData.find((item) => item.sectionType === 'weekChart')?.items || [],
                favoriteArtist: action.homeData.find((item) => item.sectionId === 'hArtistTheme') || {},
            };
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };

        default:
            return state;
    }
};

export default appReducer;
