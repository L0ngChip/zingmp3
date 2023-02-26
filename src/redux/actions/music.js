import actionTypes from './actionTypes';

export const setCurSongId = (sid) => ({
    type: actionTypes.GET_CUR_SONG_ID,
    sid,
});

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag,
});
