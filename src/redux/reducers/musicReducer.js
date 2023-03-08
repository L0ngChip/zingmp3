import actionTypes from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs: null,
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
        case actionTypes.SET_ALBUM:
            return {
                ...state,
                atAlbum: action.flag,
            };
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs || null,
            };

        default:
            return state;
    }
};

export default songReducer;
