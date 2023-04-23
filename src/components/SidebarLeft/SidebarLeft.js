import { Link, useNavigate } from 'react-router-dom';

import images from '~/assets';
import { Menu } from './Menu';
import { MenuItem } from './Menu/MenuItem';
import { LabraryMusic, DiscoverIcon, ZingChartIcon, RadioIcon, FollowIcon, LiveIcon } from '~/components/Icons';
import path from '~/utils/path';
import { useSelector } from 'react-redux';

function SidebarLeft() {
    const { currentWidth } = useSelector((state) => state.app);
    return (
        <div className="flex h-full flex-col bg-main-200">
            <div className={`flex w-full h-[70px] ${currentWidth > 1132 ? 'pl-[25px] pr-[28px] justify-start' : 'justify-center'} items-center`}>
                <Link to={path.HOME}>
                    <img
                        src={images.logo}
                        alt=""
                        className={`flex w-[120px] object-cover ${currentWidth > 1132 ? 'block' : 'hidden'}`}
                        to={path.HOME}
                    />
                    <img
                        src={images.iconZing}
                        alt="logoZing"
                        className={`w-[45px] h-[45px] object-cover ${currentWidth > 1132 ? 'hidden' : 'block'}`}
                        to={path.HOME}
                    />
                </Link>
            </div>
            <div>
                <Menu>
                    <MenuItem to={path.MYMUSIC} icon={<LabraryMusic size={24} />} title="Cá nhân" />
                    <MenuItem to={path.HOME} icon={<DiscoverIcon />} title="Khám phá" />
                    <MenuItem to={path.zingchart} icon={<ZingChartIcon />} title="#zingchart" />
                    <MenuItem to={path.radio} icon={<RadioIcon />} iconRight={<LiveIcon />} title="Radio" />
                    <MenuItem to={path.follow} icon={<FollowIcon />} title="Theo dõi" />
                </Menu>
            </div>
        </div>
    );
}

export default SidebarLeft;
