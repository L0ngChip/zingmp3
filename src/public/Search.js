import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const notActiveStyle = 'px-4 hover:text-main-500 font-semibold cursor-pointer ';
const activeStyle = 'px-4 hover:text-main-500 font-semibold items-center cursor-pointer border-b-2 border-main-500 text-main-500 h-[52px] flex';
const searchMenu = [
    {
        path: 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        path: 'bai-hat',
        text: 'BÀI HÁT',
    },
    {
        path: 'playlist',
        text: 'PLAYLIST/ALBUM',
    },
];
function Search() {
    const { keyword } = useSelector((state) => state.music);
    return (
        <>
            <div className="relative w-full h-full">
                <div className="h-[70px]"></div>
                <div className="flex h-[50px] pl-[59px] mb-7 text-sm border-b border-gray-400 items-center">
                    <span className="pr-5 border-r border-gray-400 font-bold text-[24px]">KẾT QUẢ TÌM KIẾM</span>
                    <div className="flex font-medium text-main-text items-center">
                        {searchMenu.map((item) => (
                            <NavLink
                                key={item.path}
                                to={`${item.path}?q=${keyword.replace(' ', '+')}`}
                                className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                            >
                                {item.text}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Search;
