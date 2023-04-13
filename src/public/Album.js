import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlayFill } from 'react-icons/bs';

import * as apis from '~/apis';
import * as actions from '~/redux/actions';
import { ListSong } from '~/components/ListSong';
import { AudioLoading } from '~/components/AudioLoading';

function Album() {
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
    const { pid } = useParams();
    const [playlistData, setPlaylistData] = useState({});
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(actions.setCurAlbumId(pid));
        const fetchDetailPlayList = async () => {
            dispatch(actions.loading(true));
            const response = await apis.apisGetDetailPlaylist(pid);
            dispatch(actions.loading(false));
            if (response?.data.err === 0) {
                setPlaylistData(response.data?.data);
                dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
            }
        };

        fetchDetailPlayList();
    }, [pid]);

    useEffect(() => {
        if (location.state?.playAlbum) {
            const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
            dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId));
            dispatch(actions.play(true));
        }
    }, [pid, playlistData]);

    return (
        <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className="flex w-full gap-8 px-[59px] pt-[40px]">
                <div className="flex flex-col w-1/4 pb-[30px]">
                    <div className="w-full relative">
                        <img
                            className={`w-full object-contain ${
                                isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-lg animate-rotate-center-pause'
                            }`}
                            src={playlistData?.thumbnailM}
                            alt="thumbnails"
                        />
                        <div
                            className={`absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center hover:bg-overlay-30 ${
                                isPlaying && 'rounded-full'
                            } `}
                        >
                            <span className="p-3 border border-white text-white rounded-full ">
                                {isPlaying ? <AudioLoading /> : <BsPlayFill size={30} />}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 items-center justify-center text-[12px] leading-[21px] text-[#696969] ">
                        <span className="text-xl items-center justify-center font-bold text-[#32323d]">{playlistData?.title}</span>
                        <span>
                            <span>Cập nhật: </span>
                            <span>{moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
                        </span>
                        <span>{playlistData.artistsNames}</span>
                        <span>{Math.round(playlistData.like / 1000)}K người yêu thích</span>
                    </div>
                </div>
                <div className="flex-auto w-3/4 text-sm text-[#32323D] overflow-y-auto">
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
