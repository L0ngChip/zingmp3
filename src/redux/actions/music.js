import actionTypes from './actionTypes';

export const setCurSongId = (sid) => ({
    type: actionTypes.GET_CUR_SONG_ID,
    sid,
});

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag,
});

export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag,
});

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs,
});
export const loading = (flag) => ({
    type: actionTypes.LOADING,
    flag,
});
