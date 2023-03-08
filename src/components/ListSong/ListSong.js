import { memo } from 'react';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';

function ListSong() {
    const { songs } = useSelector((state) => state.music);
    return (
        <div className="w-full flex flex-col text-xs text-gray-500 mt-[10px]">
            <div className="flex justify-between items-center p-[10px] border-b border-[#0000000d]">
                <span>BÀI HÁT</span>
                <span>ALBUM</span>
                <span>TIME</span>
            </div>
            <div>
                {songs?.map((item) => (
                    <ListItem key={item?.encodeId} songData={item} />
                ))}
            </div>
        </div>
    );
}

export default memo(ListSong);
