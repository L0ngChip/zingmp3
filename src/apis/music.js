import axios from '~/utils/axios';

export const apisGetSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/song',
                method: 'get',
                params: { id: sid },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apisGetDetailSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/infosong',
                method: 'get',
                params: { id: sid },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apisGetDetailPlaylist = (pid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/detailplaylist',
                method: 'get',
                params: { id: pid },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apisSearch = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/search',
                method: 'get',
                params: { keyword },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apisGetArtistSong = (singerId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/artistsong',
                method: 'get',
                params: { id: singerId, page: 1, count: 40 },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apisGetArtist = (alias) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/artist',
                method: 'get',
                params: { name: alias },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
