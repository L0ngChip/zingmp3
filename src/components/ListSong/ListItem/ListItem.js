import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import moment from 'moment';

import * as actions from '~/redux/actions';

function ListItem({ songData, isHideNode, isHideTitle, order, style, smWidth, showArtist }) {
    const { currentWidth } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    return (
        <div
            className="flex w-full justify-between items-center p-[10px] border-b border-[#0000000d] rounded-md hover:bg-[#ffffff4d] cursor-pointer"
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId));
                dispatch(actions.play(true));
                dispatch(actions.playAlbum(true));
                dispatch(
                    actions.setRecent({
                        thumbnail: songData?.thumbnail,
                        title: songData?.title,
                        artistsNames: songData?.artistsNames,
                        sid: songData?.encodeId,
                    }),
                );
            }}
        >
            <div className="flex items-center w-full">
                <div className="flex flex-1 gap-2">
                    <div className="flex items-center gap-2">
                        {order ? (
                            <span
                                className={`flex ${style || ''} justify-center ${
                                    order === 1 ? 'text-shadow-no1' : order === 2 ? 'text-shadow-no2' : 'text-shadow-no3'
                                } text-white drop-shadow-md text-[32px] mr-3`}
                            >
                                {order}
                            </span>
                        ) : (
                            !isHideNode && (
                                <span className="opacity-70">
                                    <BsMusicNoteBeamed />
                                </span>
                            )
                        )}

                        <img src={songData?.thumbnail} alt="thumbnail" className="w-10 h-10 object-contain rounded-md " />
                    </div>
                    <div className={`flex flex-col text-xs justify-center`}>
                        <span className="text-sm font-semibold">
                            {currentWidth < 1060 && showArtist
                                ? songData?.title
                                : 1060 < currentWidth < 1270 && showArtist
                                ? `${songData?.title.slice(0, 12)}...`
                                : songData?.title.length > 31
                                ? `${songData?.title.slice(0, 31)}...`
                                : songData?.title}
                        </span>
                        <span className="mt-[2px] opacity-70">
                            {currentWidth < 1060 && showArtist
                                ? songData?.artistsNames.split(',', 2).join(',')
                                : 1060 <= currentWidth <= 1280 && showArtist
                                ? songData?.artistsNames.split(',', 2).join(',') && `${songData?.artistsNames.slice(0, 9)}...`
                                : songData?.artistsNames}
                        </span>
                    </div>
                </div>
                <div className={`flex ${smWidth ? 'w-1/5' : 'flex-1'} justify-between items-center ${currentWidth < 750 && 'hidden'}`}>
                    {!isHideTitle && (
                        <div className={`flex text-xs text-gray-500 justify-start ${currentWidth < 770 ? 'hidden' : ''}`}>
                            {songData?.album?.title}
                        </div>
                    )}
                    <div className="w-[4px] h-[4px]"></div>
                    <div className={`flex text-xs opacity-70 justify-end`}>{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
                </div>
            </div>
        </div>
    );
}

export default memo(ListItem);
