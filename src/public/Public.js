import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Player } from '~/components/Player';

import { SidebarLeft } from '~/components/SidebarLeft';
import { SidebarRight } from '~/components/SidebarRight';
import { Header } from '~/components/Header';

function Public() {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className="flex flex-col relative w-full h-screen bg-[#CED9D9]">
            <div className="w-full h-full flex flex-auto">
                <div className="flex-none w-[240px] h-full border border-blue-400 bg-[#DDE4E4]">
                    <SidebarLeft />
                </div>
                <div className="flex-auto h-auto border border-red-500">
                    <div className="h-[70px] px-[59px] flex items-center">
                        <Header />
                    </div>
                    <Outlet />
                    <div className="w-full h-[500px]"></div>
                </div>
                {showSidebar && (
                    <div className="flex-none w-[330px] border border-green-500 bg-main-300 animate-slide-left">
                        <SidebarRight />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex-none h-[90px]">
                <Player setShowSidebar={setShowSidebar} />
            </div>
        </div>
    );
}

export default Public;
