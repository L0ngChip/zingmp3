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
