import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import moment from 'moment';

import * as actions from '~/redux/actions';

function ListItem({ songData }) {
    const dispatch = useDispatch();

    return (
        <div
            className="flex w-full justify-between items-cen1ter p-[10px] border-b border-[#0000000d] hover:bg-[#ffffff4d] cursor-pointer"
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
                <span>
                    <BsMusicNoteBeamed />
                </span>
                <img src={songData?.thumbnail} alt="thumbnail" className="w-10 h-10 object-contain " />
                <div className="flex flex-col text-xs text-[#696969] ">
                    <span className="text-[#32323d] text-sm font-semibold ">
                        {songData?.title.length > 21 ? `${songData?.title.slice(0, 21)}...` : songData?.title}
                    </span>
                    <span>{songData?.artistsNames}</span>
                </div>
            </div>

            <div className="flex flex-1 justify-center pl-3">{songData?.album?.title}</div>
            <div className="flex flex-1 justify-end">{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
}

export default memo(ListItem);
