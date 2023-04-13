import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ListItem } from '~/components/ListSong/ListItem';
import * as actions from '~/redux/actions';
function SearchSong() {
    const { searchData, songs } = useSelector((state) => state.music);
    // console.log(songs);
    const dispatch = useDispatch();
    console.log(searchData);
    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.top?.id));
    }, [searchData]);
    return (
        <div className="flex flex-col px-[59px] w-full">
            <h3 className="text-lg font-bold">BÀI HÁT</h3>
            {songs?.map((item) => (
                <ListItem key={item?.encodeId} songData={item} isHideNode />
            ))}
        </div>
    );
}

export default SearchSong;
