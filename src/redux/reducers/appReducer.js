import actionTypes from '../actions/actionTypes';

const initState = {
    isLoading: false,
    banner: null,
    weekChart: null,
    newReleaseChart: null,
    top100: null,
    womenMusic: null,
    newRelease: null,
    favoriteArtist: null,
    scrollTop: 0,
    currentWidth: null,
    hotAlbum: null,
};
const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData.find((item) => item.sectionId === 'hSlider').items || null,
                top100: action.homeData.find((item) => item.sectionId === 'h100') || null,
                newReleaseChart: action.homeData.find((item) => item.sectionId === 'hNewrelease') || null,
                womenMusic: action.homeData.find((item) => item.sectionId === 'hEditorTheme') || null,
                newRelease: action.homeData.find((item) => item.sectionType === 'new-release') || null,
                weekChart: action.homeData.find((item) => item.sectionType === 'weekChart')?.items || null,
                favoriteArtist: action.homeData.find((item) => item.sectionId === 'hArtistTheme') || null,
                hotAlbum: action.homeData.find((item) => item.sectionId === 'hAlbum') || null,
            };
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };
        case actionTypes.ZERO_SCROLL:
            return {
                ...state,
                scrollTop: action.flag,
            };
        case actionTypes.CURRENT_WIDTH:
            return {
                ...state,
                currentWidth: action.w,
            };

        default:
            return state;
    }
};

export default appReducer;
