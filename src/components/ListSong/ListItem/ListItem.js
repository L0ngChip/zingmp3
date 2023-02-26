import { BsMusicNoteBeamed } from 'react-icons/bs';

function ListItem({ songData }) {
    return (
        <div className="flex w-full justify-between items-center p-[10px]">
            <div className="flex justify-center items-center gap-2">
                <span>
                    <BsMusicNoteBeamed />
                </span>
                <img src={songData?.thumbnail} alt="thumbnail" className="w-10 h-10 object-contain " />
                <div className="flex flex-col text-xs text-[#696969] ">
                    <span className="text-[#32323d]">{`${songData?.title}`}</span>
                    <span>{songData?.artistsNames}</span>
                </div>
            </div>

            <div>Album</div>
            <div>Thoi gian</div>
        </div>
    );
}

export default ListItem;
