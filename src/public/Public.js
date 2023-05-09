import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';

import { Player } from '~/components/Player';
import { SidebarLeft } from '~/components/SidebarLeft';
import { SidebarRight } from '~/components/SidebarRight';
import { Header } from '~/components/Header';
import { Loading } from '~/components/Loading';
import * as actions from '~/redux/actions';

function Public() {
    const { curSongId } = useSelector((state) => state.music);
    const [showSidebar, setShowSidebar] = useState(false);
    const { isLoading, scrollTop, currentWidth } = useSelector((state) => state.app);
    const { singer } = useParams();
    const dispatch = useDispatch();

    const handleScroll = (e) => {
        if (e.target.scrollTop === 0) {
            dispatch(actions.zeroScrollTop(true));
        } else {
            dispatch(actions.zeroScrollTop(false));
        }
    };
    return (
        <div className="w-full relative h-screen flex flex-col bg-main-300">
            <div className="w-full h-full flex flex-auto">
                <div className={`flex-none ${currentWidth > 1132 ? 'w-[240px]' : 'w-[70px]'} h-full bg-main-200`}>
                    <SidebarLeft />
                </div>
                <div className="flex-auto relative flex flex-col">
                    {isLoading && (
                        <div className="absolute top-0 right-0 bottom-0 left-0 z-20 bg-main-200 flex items-center justify-center">
                            <Loading />
                        </div>
                    )}
                    <div
                        className={`h-[70px] px-[59px] ${
                            scrollTop
                                ? `bg-transparent fixed top-0 ${currentWidth > 1132 ? 'left-[240px]' : 'left-[70px]'} right-[330px]`
                                : 'bg-main-300 shadow-header-box-shadow'
                        } z-50 flex items-center`}
                    >
                        <Header />
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars autoHide onScroll={handleScroll} style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                    <div className="h-[90px]"></div>
                </div>
                {showSidebar && (
                    <div className="flex-none h-screen w-[330px] border-l border-gray-400 bg-main-300 animate-slide-left">
                        <SidebarRight />
                    </div>
                )}
            </div>
            {curSongId && (
                <div className="fixed bottom-0 left-0 right-0 z-50 flex-none h-[90px]">
                    <Player setShowSidebar={setShowSidebar} />
                </div>
            )}
        </div>
    );
}

export default Public;
