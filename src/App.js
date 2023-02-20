import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { test } = useSelector(state => state.app)
  console.log(test);
  return (  
    <>
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
