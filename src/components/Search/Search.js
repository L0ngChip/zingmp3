import { HiOutlineSearch } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useState, useEffect } from 'react';
import * as actions from '~/redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import path from '~/utils/path';

function Search() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Hàm lấy api khi nhập keywords tìm kiếm và đưa ra path  keywords
    const handleSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword));
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    };

    return (
        <div className="w-full flex items-center relative">
            <span className="flex h-10 px-2 py-2 items-center rounded-l-[20px] text-gray-500 bg-[#ffffff4d] cursor-pointer">
                <HiOutlineSearch size={20} />
            </span>
            <input
                type="text"
                className="outline-none w-full h-10 py-2 rounded-r-[20px] text-sm text-gray-500 bg-[#ffffff4d]"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyUp={handleSearch}
            />
            {keyword && (
                <span className="absolute right-4 text-gray-500 cursor-pointer" onClick={() => setKeyword('')}>
                    <MdClose size={20} />
                </span>
            )}
        </div>
    );
}

export default Search;
