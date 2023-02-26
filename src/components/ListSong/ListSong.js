import { ListItem } from './ListItem';

function ListSong({ songs, totalDuration }) {
    return (
        <div className="w-full flex flex-col text-xs text-gray-500 mt-[10px]">
            <div className="flex justify-between items-center p-[10px]">
                <span>BÀI HÁT</span>
                <span>ALBUM</span>
                <span>TIME</span>
            </div>
            <div>
                {songs.map((item) => (
                    <ListItem key={item?.encodeId} songData={item} />
                ))}
            </div>
            <div>Tổng thời gian</div>
        </div>
    );
}

export default ListSong;
