import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Public, Home, Login, Personal, Album, Search, SearchSong, SearchAll, Singer, SearchPlaylist } from '~/public/index';
import { WeekChart } from './components/WeekChart';
import 'react-toastify/dist/ReactToastify.css';
import path from './utils/path';
import * as actions from '~/redux/actions';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getHome());
    });

    return (
        <>
            <div>
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MYMUSIC} element={<Personal />} />
                        <Route path={path.ALBUM_TITLE_PID} element={<Album />} />
                        <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
                        <Route path={path.SINGER} element={<Singer />} />
                        <Route path={path.WEEKCHART_TITLE_PID} element={<WeekChart />} />
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
