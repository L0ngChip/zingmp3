import { Link, useNavigate } from 'react-router-dom';

import images from '~/assets';
import { Menu } from './Menu';
import { MenuItem } from './Menu/MenuItem';
import { LabraryMusic, DiscoverIcon, ZingChartIcon, RadioIcon, FollowIcon, LiveIcon } from '~/components/Icons';
import path from '~/utils/path';

function SidebarLeft() {
    return (
        <div className="flex h-full flex-col bg-main-200">
            <div className="flex w-full h-[70px] pl-[25px] pr-[28px] justify-start items-center">
                <Link to={path.HOME}>
                    <img src={images.logo} alt="" className="flex w-[120px] object-cover" to={path.HOME} />
                </Link>
            </div>
            <div>
                <Menu>
                    <MenuItem to={path.MYMUSIC} icon={<LabraryMusic />} title="Cá nhân" />
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
