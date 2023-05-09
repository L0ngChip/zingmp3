import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
    Public,
    Home,
    Login,
    Personal,
    Album,
    Search,
    SearchSong,
    SearchAll,
    Singer,
    SearchPlaylist,
    ZingChart,
    WeekChart,
    Updating,
} from '~/public/index';
import 'react-toastify/dist/ReactToastify.css';
import path from './utils/path';
import * as actions from '~/redux/actions';

function App() {
    const dispatch = useDispatch();
    //Lấy width lần đầu
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

    //Hàm setWidth khi resize
    const setWidth = (e) => {
        setCurrentWidth(e.target.innerWidth);
    };
    useEffect(() => {
        dispatch(actions.getHome());
    });

    useEffect(() => {
        window.addEventListener('resize', setWidth);
        return () => {
            window.removeEventListener('resize', setWidth);
        };
    }, []);
    //Truyền width cho các page
    useEffect(() => {
        dispatch(actions.setCurrentWidth(currentWidth));
    }, [currentWidth]);

    return (
        <>
            <div>
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MYMUSIC} element={<Updating />} />
                        <Route path={path.ALBUM_TITLE_PID} element={<Album />} />
                        <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
                        <Route path={path.zingchart} element={<ZingChart />} />
                        <Route path={path.radio} element={<Updating />} />
                        <Route path={path.follow} element={<Updating />} />
                        <Route path={path.WEEKCHART_TITLE_PID} element={<WeekChart />} />
                        <Route path={path.SINGER} element={<Singer />} />
                        <Route path={path.ARTIST_SINGER} element={<Singer />} />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route path={path.ALL} element={<SearchAll />} />
                            <Route path={path.SONGS} element={<SearchSong />} />
                            <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    );
}

export default App;
