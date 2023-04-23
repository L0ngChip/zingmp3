import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const notActiveStyle = 'flex px-[21px] py-3 gap-[10px] text-sm font-bold items-center text-[#32323D]';
const activeStyle = 'flex px-[21px] py-3 gap-[10px] text-sm font-bold items-center text-[#0f7070]';

function MenuItem({ icon, to, title, iconRight }) {
    const { currentWidth } = useSelector((state) => state.app);
    return (
        <div className="flex flex-col gap-2 hover:bg-main-100">
            <NavLink className={(nav) => (nav.isActive ? activeStyle : notActiveStyle)} to={to}>
                <span className="w-[24px] h-[24px]">{icon}</span>
                <span className={`${currentWidth > 1132 ? 'block' : 'hidden'}`}>{title}</span>
                <span className={`${currentWidth > 1132 ? 'block' : 'hidden'}`}>{iconRight}</span>
            </NavLink>
        </div>
    );
}

export default MenuItem;
