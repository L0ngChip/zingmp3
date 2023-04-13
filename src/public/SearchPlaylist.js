import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { apisGetArtist } from '~/apis';
import { SectionItem } from '~/components/Section/SectionItem';
function SearchPlaylist() {
    const { searchData } = useSelector((state) => state.music);
    const [playlist, setPlaylist] = useState({});
    useEffect(() => {
        const fetch = async () => {
            const res = await apisGetArtist(searchData?.top?.alias);
            setPlaylist(res.data.data?.sections[1]);
            console.log(res);
        };
        fetch();
    }, [searchData]);
    // console.log(playlist);
    return (
        <div className="w-full flex flex-col px-[59px] gap-8">
            <h3 className="text-lg font-bold">Playlist/Album</h3>
            <div className="flex flex-wrap">
                {playlist &&
                    playlist?.items?.length > 0 &&
                    playlist?.items
                        ?.filter((item, index) => index <= 40)
                        ?.map((item) => (
                            <div className="flex w-1/5 px-3 py-4">
                                <SectionItem
                                    key={item?.encodeId}
                                    thumbnailM={item?.thumbnailM}
                                    title={item?.title}
                                    link={item?.link}
                                    artistsNames={item?.artistsNames}
                                />
                            </div>
                        ))}
            </div>
        </div>
    );
}

export default SearchPlaylist;
