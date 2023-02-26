import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as apis from '~/apis';
import moment from 'moment/moment';
import { ListSong } from '~/components/ListSong';
function Album() {
    const { pid } = useParams();
    const [playlistData, setPlaylistData] = useState({});

    useEffect(() => {
        const fetchDetailPlayList = async () => {
            const response = await apis.apisGetDetailPlaylist(pid);
            if (response?.data.err === 0) {
                setPlaylistData(response.data?.data);
            }
        };

        fetchDetailPlayList();
    }, [pid]);
    console.log(playlistData);
    return (
        <div className="flex w-full gap-8 px-[59px]">
            <div className="flex flex-col w-1/4 border border-blue-500">
                <img className="w-full object-contain" src={playlistData?.thumbnailM} alt="thumnails" />
                <div className="flex flex-col mt-3 items-center text-[12px] leading-[21px] text-[#696969] ">
                    <span className="text-xl font-bold text-[#32323d]">{playlistData?.title}</span>
                    <span>
                        <span>Cập nhật: </span>
                        <span>{moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
                    </span>
                    <span>{playlistData.artistsNames}</span>
                    <span>{Math.round(playlistData.like / 1000)}K người yêu thích</span>
                </div>
            </div>
            <div className="flex-auto text-sm text-[#32323D] border border-red-500">
                <span className="text-gray-500">Lời tự </span>
                <span>{playlistData?.description}</span>
                <ListSong songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration} />
            </div>
        </div>
    );
}

export default Album;
