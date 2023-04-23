import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '~/components/Button';
import { ListItem } from '~/components/ListSong/ListItem';

function RankChart({ data, number, hideTitle, link, hideButton }) {
    const [isShowSongs, setIsShowSongs] = useState(false);
    const [songs, setSongs] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isShowSongs) {
            setSongs(data?.filter((i, index) => index < number));
        } else {
            setSongs(data);
        }
    }, [data, isShowSongs]);
    return (
        <div className="w-full">
            {!hideTitle ? (
                <div className="mb-5">
                    {songs && songs?.map((item, index) => <ListItem key={item?.encodeId} style="w-[32px]" songData={item} order={index + 1} />)}
                </div>
            ) : (
                <div className="mb-5">
                    {songs &&
                        songs?.map((item, index) => (
                            <ListItem key={item?.encodeId} isHideTitle={true} showArtist smWidth songData={item} order={index + 1} />
                        ))}
                </div>
            )}
            {hideButton || (
                <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => (link ? navigate(link?.split('.')[0]) : setIsShowSongs((prev) => !prev))}
                >
                    <Button className="border border-main-500 text-main-500 px-6 py-2 text-sm rounded-full hover:text-white hover:bg-main-500">
                        {!isShowSongs ? 'Xem top 100' : 'Ẩn bớt'}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default memo(RankChart);
