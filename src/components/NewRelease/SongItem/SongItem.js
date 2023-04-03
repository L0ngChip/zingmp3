import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';

function SongItem({ thumbnail, title, artistsNames, sid, releaseDate }) {
    const dispatch = useDispatch();
    return (
        <div
            className="w-[45%] min-[1224px]:w-[30%] flex-auto flex p-[10px] text-left hover:bg-[#ffffff4d]"
            onClick={() => {
                dispatch(actions.setCurSongId(sid));
                dispatch(actions.play(true));
            }}
        >
            <img src={thumbnail} alt="thumbnail" className="w-[60px] h-[60px] object-cover rounded-md cursor-pointer" />
            <div className="flex flex-col ml-[10px] text-xs font-normal text-[#696969]">
                <span className="text-sm text-[#32323D] font-medium ">
                    {title?.length >= 27 ? `${title?.slice(0, 27)}...` : title}
                </span>
                <span>{artistsNames}</span>
                <span>{moment(releaseDate * 1000).fromNow()}</span>
            </div>
        </div>
    );
}

export default SongItem;
