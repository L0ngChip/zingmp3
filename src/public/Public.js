import React from 'react';
import { Outlet } from 'react-router-dom';

import { SidebarLeft } from '~/components/SidebarLeft';
import { SidebarRight } from '~/components/SidebarRight';

function Public() {
    return (
        <div className="flex w-full min-h-screen bg-[#CED9D9]">
            <div className="flex-none w-[240px] bg-[#DDE4E4]">
                <SidebarLeft />
            </div>
            <div className="flex-auto">
                <Outlet />
            </div>
            <div className="flex-none w-[330px] border border-red-500">
                <SidebarRight />
            </div>
        </div>
    );
}

export default Public;
