import React from 'react';
import { Outlet } from 'react-router-dom';
import { Player } from '~/components/Player';

import { SidebarLeft } from '~/components/SidebarLeft';
import { SidebarRight } from '~/components/SidebarRight';
import { Header } from '~/components/Header';

function Public() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-[#CED9D9]">
            <div className="w-full h-full flex flex-auto">
                <div className="flex-none w-[240px] border border-blue-400 bg-[#DDE4E4]">
                    <SidebarLeft />
                </div>
                <div className="flex-auto">
                    <div className="h-[70px] px-[59px] flex items-center mb-5">
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className="flex-none w-[330px] hidden border border-green-500 bg-red-500">
                    <SidebarRight />
                </div>
            </div>
            <div className="flex-none h-[90px]">
                <Player />
            </div>
        </div>
    );
}

export default Public;
