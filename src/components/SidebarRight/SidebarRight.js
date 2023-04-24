import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { SongItem } from '~/components/NewRelease/SongItem';
import { apisGetDetailPlaylist } from '~/apis';

function SidebarRight() {
    const [isRecent, setIsRecent] = useState(false);
    const [playlist, setPlaylist] = useState();
    const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector((state) => state.music);

    const fetchDetailPlaylist = async () => {
        const response = await apisGetDetailPlaylist(curAlbumId);
        if (response.data?.err === 0) setPlaylist(response.data?.data?.song?.items);
    };
    useEffect(() => {
        curAlbumId && fetchDetailPlaylist();
    }, []);

    useEffect(() => {
        if (curAlbumId && isPlaying) fetchDetailPlaylist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curAlbumId, isPlaying]);

    useEffect(() => {
        isPlaying && setIsRecent(false);
    }, [isPlaying, curSongId]);

    return (
        <div className="flex flex-col text-xs w-full h-full">
            <div className="h-[70px] w-full px-2 py-[14px] flex flex-none gap-4 items-center justify-between">
                <div className="flex flex-auto py-[6px] px-[6px] justify-center bg-main-200 rounded-l-full rounded-r-full font-medium cursor-pointer">
                    <span
                        className={`py-[5px] flex-1 ${
                            !isRecent && 'text-main-500 bg-[#E7EDED]'
                        } rounded-l-full rounded-r-full hover:text-main-500 flex items-center justify-center`}
                        onClick={() => setIsRecent((prev) => !prev)}
                    >
                        Danh sách phát
                    </span>
                    <span
                        className={`py-[5px] flex-1 ${
                            isRecent && 'text-main-500 bg-[#E7EDED]'
                        } rounded-l-full rounded-r-full hover:text-main-500 flex items-center justify-center`}
                        onClick={() => setIsRecent((prev) => !prev)}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span className="p-2 rounded-full bg-[#E7EDED] cursor-pointer">
                    <BsTrash size={14} />
                </span>
            </div>
            {curSongId && isRecent ? (
                <div className="w-full flex flex-col flex-auto px-2">
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {recentSongs && (
                            <div className="flex flex-col">
                                {recentSongs.map((item) => (
                                    <SongItem
                                        key={item?.sid}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artistsNames={item?.artistsNames}
                                        sid={item?.encodeId}
                                        size="w-[40px] h-[40px]"
                                    />
                                ))}
                            </div>
                        )}
                    </Scrollbars>
                </div>
            ) : (
                <div className="w-full flex flex-col flex-auto px-2">
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        <SongItem
                            thumbnail={curSongData?.thumbnail}
                            title={curSongData?.title}
                            artistsNames={curSongData?.artistsNames}
                            sid={curSongData?.encodeId}
                            // eslint-disable-next-line
                            style="bg-main-500 text-white"
                            size="w-[40px] h-[40px]"
                        />
                        <div className="flex flex-col pt-[15px] px-2 pb-[5px] text-black text-sm">
                            <span className="font-bold">Tiếp theo</span>
                            <div className="flex gap-1">
                                <span className="font-normal opacity-50">Từ playlist</span>
                                <span className="font-medium text-main-500">
                                    {curSongData?.album?.title?.length >= 27
                                        ? `${curSongData?.album?.title?.slice(0, 27)}...`
                                        : curSongData?.album?.title}
                                </span>
                            </div>
                        </div>
                        {playlist && (
                            <div className="flex flex-col">
                                {playlist?.map((item) => (
                                    <div className="flex">
                                        <SongItem
                                            key={item?.encodeId}
                                            thumbnail={item?.thumbnail}
                                            title={item?.title}
                                            artistsNames={item?.artistsNames}
                                            sid={item?.encodeId}
                                            size="w-[40px] h-[40px]"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Scrollbars>
                </div>
            )}
            <div className="h-[90px]"></div>
        </div>
    );
}

export default SidebarRight;
