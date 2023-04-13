import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';

function SongItem({ thumbnail, title, artistsNames, sid, releaseDate, style, size, smItem }) {
    const dispatch = useDispatch();
    return (
        <div
            className={`${smItem ? 'w-[45%] min-[1224px]:w-[30%]' : 'w-full'} flex p-[10px] rounded-md text-left ${
                style || 'text-black hover:bg-[#ffffff4d]'
            }`}
            onClick={() => {
                dispatch(actions.setCurSongId(sid));
                dispatch(actions.play(true));
            }}
        >
            <div className="flex gap-1">
                <img src={thumbnail} alt="thumbnail" className={`object-cover rounded-md cursor-pointer ${size || 'w-[60px] h-[60px]'}`} />
                <div className="flex flex-col ml-[10px] text-xs font-normal">
                    <span className="text-sm font-medium ">{title?.length >= 26 ? `${title?.slice(0, 26)}...` : title}</span>
                    <span className="text-xs opacity-70">{artistsNames?.length >= 26 ? `${artistsNames?.slice(0, 26)}...` : artistsNames}</span>
                    {releaseDate && <span>{moment(releaseDate * 1000).fromNow()}</span>}
                </div>
            </div>
        </div>
    );
}

export default SongItem;
