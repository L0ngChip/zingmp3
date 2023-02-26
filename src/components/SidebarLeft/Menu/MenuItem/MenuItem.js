import { NavLink } from 'react-router-dom';

const notActiveStyle = 'flex px-[25px] py-2 gap-[10px] text-sm font-bold items-center text-[#32323D]';
const activeStyle = 'flex px-[25px] py-2 gap-[10px] text-sm font-bold items-center text-[#0f7070]';

function MenuItem({ icon, to, title, iconRight }) {
    return (
        <div className="flex flex-col hover:bg-main-100">
            <NavLink className={(nav) => (nav.isActive ? activeStyle : notActiveStyle)} to={to}>
                <span>{icon}</span>
                <span>{title}</span>
                <span>{iconRight}</span>
            </NavLink>
        </div>
    );
}

export default MenuItem;
