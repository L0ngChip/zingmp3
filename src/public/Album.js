import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { Scrollbars } from 'react-custom-scrollbars-2';

import * as apis from '~/apis';
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
    console.log(playlistData?.song?.total);
    return (
        <Scrollbars style={{ width: '100%', height: '70%' }}>
            <div className="flex w-full gap-8 px-[59px] mb-[30px] border border-red-400">
                <div className="flex flex-col w-1/4 border border-blue-500 pb-[30px]">
                    <img className="w-full object-contain" src={playlistData?.thumbnailM} alt="thumbnails" />
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
                <div className="flex-auto text-sm text-[#32323D] border border-red-500 overflow-y-auto">
                    <div className="mb-[10px]">
                        <span className="text-gray-500">Lời tự </span>
                        <span>{playlistData?.description}</span>
                        <ListSong songs={playlistData?.song?.items} />
                    </div>
                    <div className="flex gap-2 text-gray-500 ">
                        <span>{playlistData?.song?.total} bài hát</span>
                        <span>•</span>
                        <span>{moment.utc(playlistData?.song?.totalDuration * 1000).format('HH:mm:ss')}</span>
                    </div>
                </div>
            </div>
        </Scrollbars>
    );
}

export default Album;
