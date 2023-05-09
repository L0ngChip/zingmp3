import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '~/components/Button';
import { SongItem } from './SongItem';

function NewRelease() {
    const { newRelease, currentWidth } = useSelector((state) => state.app);
    const [isActive, setIsActive] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        isActive ? setSongs(newRelease?.items?.others) : setSongs(newRelease?.items?.vPop);
    }, [isActive, newRelease]);
    return (
        <div className="px-[59px] mt-12">
            <div className="flex mb-5 items-center justify-between ">
                <h3 className="capitalize font-bold text-xl">{newRelease?.title}</h3>
            </div>
            <div className="flex mb-4 gap-4 font-normal text-xs">
                <Button
                    onClick={() => setIsActive(0)}
                    className={`px-6 py-1 border border-[#0000001a] rounded-[100px] uppercase ${isActive === 0 && 'bg-[#0e8080] text-white'}`}
                >
                    Việt Nam
                </Button>
                <Button
                    onClick={() => setIsActive(1)}
                    className={`px-6 py-1 border border-[#0000001a] rounded-[100px] uppercase ${isActive === 1 && 'bg-[#0e8080] text-white'}`}
                >
                    Quốc tế
                </Button>
            </div>

            <div className="flex flex-wrap gap-4">
                {songs
                    ?.filter((item, index) => (currentWidth > 1224 ? index <= 11 : index <= 7))
                    .map((item) => (
                        <SongItem
                            key={item?.encodeId}
                            thumbnail={item?.thumbnail}
                            title={item?.title}
                            artistsNames={item?.artistsNames}
                            sid={item?.encodeId}
                            releaseDate={item?.releaseDate}
                            smItem
                        />
                    ))}
            </div>
        </div>
    );
}

export default NewRelease;
