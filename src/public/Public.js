import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { Player } from '~/components/Player';
import { SidebarLeft } from '~/components/SidebarLeft';
import { SidebarRight } from '~/components/SidebarRight';
import { Header } from '~/components/Header';
import { Loading } from '~/components/Loading';
import { useSelector } from 'react-redux';

function Public() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { isLoading } = useSelector((state) => state.app);
    return (
        <div className="w-full relative h-screen flex flex-col bg-main-300">
            <div className="w-full h-full flex flex-auto">
                <div className="flex-none w-[240px] h-full border border-blue-400 bg-main-200">
                    <SidebarLeft />
                </div>
                <div className="flex-auto relative flex flex-col border border-red-500">
                    {isLoading && (
                        <div className="absolute top-0 right-0 bottom-0 left-0 z-20 bg-main-200 flex items-center justify-center">
                            <Loading />
                        </div>
                    )}

                    <div className="h-[70px] px-[59px] flex-none flex items-center">
                        <Header />
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                    <div className="flex-none h-[90px]"></div>
                </div>
                {showSidebar && (
                    <div className="flex-none w-[330px] border border-green-500 bg-main-300 animate-slide-left">
                        <SidebarRight />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 flex-none h-[90px]">
                <Player setShowSidebar={setShowSidebar} />
            </div>
        </div>
    );
}

export default Public;
