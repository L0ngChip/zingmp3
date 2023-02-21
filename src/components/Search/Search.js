import { HiOutlineSearch } from 'react-icons/hi';

function Search() {
    return (
        <div className="w-full flex items-center">
            <span className="flex h-10 px-2 py-2 items-center rounded-l-[20px] text-gray-500 bg-[#ffffff4d] cursor-pointer">
                <HiOutlineSearch size={20} />
            </span>
            <input
                type="text"
                className="outline-none w-full h-10 py-2 rounded-r-[20px] text-sm text-gray-500 bg-[#ffffff4d]"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            />
        </div>
    );
}

export default Search;
