import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import moment from 'moment';

import * as actions from '~/redux/actions';

function ListItem({ songData, isHideNode }) {
    const dispatch = useDispatch();

    return (
        <div
            className="flex w-full justify-between items-cen1ter p-[10px] border-b border-[#0000000d] rounded-md hover:bg-[#ffffff4d] cursor-pointer"
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
            <div className="flex flex-1 items-center gap-2">
                {!isHideNode && (
                    <span>
                        <BsMusicNoteBeamed />
                    </span>
                )}

                <img src={songData?.thumbnail} alt="thumbnail" className="w-10 h-10 object-contain rounded-md " />
                <div className="flex flex-col text-xs">
                    <span className="text-sm font-semibold ">
                        {songData?.title.length > 40 ? `${songData?.title.slice(0, 40)}...` : songData?.title}
                    </span>
                    <span className="opacity-70">{songData?.artistsNames}</span>
                </div>
            </div>

            <div className="flex flex-1 justify-center pl-3 text-xs text-gray-500">{songData?.album?.title}</div>
            <div className="flex flex-1 text-xs justify-end items-center opacity-70">{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
}

export default memo(ListItem);
