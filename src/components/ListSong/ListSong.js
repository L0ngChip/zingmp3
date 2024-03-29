import { memo } from 'react';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';

function ListSong({ isHideAlbum }) {
    const { songs } = useSelector((state) => state.music);
    return (
        <div className="w-full flex flex-col text-xs mt-[10px]">
            {!isHideAlbum && (
                <div className="flex w-full text-gray-500 font-semibold items-center p-[10px] border-b border-[#0000000d]">
                    <div className="w-1/2">
                        <span>BÀI HÁT</span>
                    </div>
                    <div className="w-1/2 flex justify-between">
                        <span>ALBUM</span>
                        <span>TIME</span>
                    </div>
                </div>
            )}
            <div>
                {songs?.map((item) => (
                    <ListItem key={item?.encodeId} songData={item} />
                ))}
            </div>
        </div>
    );
}

export default memo(ListSong);
