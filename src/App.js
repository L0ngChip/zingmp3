import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import { Public, Home, Login } from '~/public/index';
import 'react-toastify/dist/ReactToastify.css';
import path from './utils/path';

function App() {
    return (
        <>
            <div>
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
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
