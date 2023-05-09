import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment/moment';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlayFill } from 'react-icons/bs';
import { apisGetArtist } from '~/apis';

import * as apis from '~/apis';
import * as actions from '~/redux/actions';
import { ListSong } from '~/components/ListSong';
import { AudioLoading } from '~/components/AudioLoading';
import { Artist } from '~/components/Artist';
function Album() {
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
    const [playlistData, setPlaylistData] = useState({});
    const [artistData, setArtistData] = useState(null);
    const dispatch = useDispatch();
    const { pid } = useParams();
    const location = useLocation();
    const ref = useRef();
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
    // plays the random songs
    useEffect(() => {
        if (location.state?.playAlbum) {
            const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
            dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId));
            dispatch(actions.play(true));
        }
    }, [pid, playlistData]);

    useEffect(() => {
        const fetchArtistData = async () => {
            const res = await apisGetArtist(playlistData?.artist?.alias);
            if (res.data.err === 0) {
                setArtistData(res?.data?.data);
            }
        };
        fetchArtistData();
    }, [playlistData]);

    // cuộn thanh scroolbar lên đầu trang
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, []);
    return (
        <div className="w-full h-full">
            <div className="h-[70px]"></div>
            <div className="flex w-full gap-8 px-[59px] pt-[40px]" ref={ref}>
                <div className="flex-none flex flex-col w-1/3 pb-[30px]">
                    <div className="w-full relative">
                        <div className="flex items-center justify-center">
                            <img
                                className={`h-[300px] object-cover ${
                                    isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-lg animate-rotate-center-pause'
                                }`}
                                src={playlistData?.thumbnailM}
                                alt="thumbnails"
                            />
                        </div>
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
                    <div className="w-full flex flex-col mt-3 items-center text-[12px] leading-[21px] text-[#696969]">
                        <h3 className="w-[300px] flex justify-center text-xl font-bold text-[#32323d]">{playlistData?.title}</h3>
                        <div>
                            <span>Cập nhật: </span>
                            <span>{moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
                        </div>
                        <span>{playlistData.artistsNames}</span>
                        <span>{Math.round(playlistData.like / 1000)}K người yêu thích</span>
                    </div>
                </div>
                <div className="flex flex-col w-2/3">
                    <Scrollbars style={{ width: '100%', height: '100%' }}>
                        <div className="text-sm text-[#32323D]">
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
                    </Scrollbars>
                </div>
            </div>
            {artistData && (
                <div className="flex flex-col px-[60px] w-full mt-[60px]">
                    <h3 className="mb-5 text-lg font-bold">Bạn Có Thể Thích</h3>
                    <div
                        className="w-full flex items-start
                 gap-5"
                    >
                        {artistData?.sections
                            ?.find((item, index) => item?.sectionId === 'aReArtist')
                            ?.items?.filter((item, index) => index <= 4)
                            ?.map((item) => (
                                <Artist
                                    key={item?.id}
                                    thumbnailM={item?.thumbnailM}
                                    artistName={item?.name}
                                    totalFollow={item?.totalFollow}
                                    link={item?.link}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Album;
