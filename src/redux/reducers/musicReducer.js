import actionTypes from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlaying: false,
};
// Hàm xử lý song
const songReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null,
            };
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
            };

        default:
            return state;
    }
};

export default songReducer;
