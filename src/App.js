import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [work, setWork] = useState('');
  const [todos, setTodos] = useState([]);
  const handleAddJob = () => {
    if(todos.some((item) => item.id === work.replace(/\s/g, ''))){
      toast.warn('Công việc này đã được thêm trước đó!')
    } else {
      setTodos((prev) => [...prev, {id: work.replace(/\s/g, ''), job: work}]);
      setWork('');
    }
  }
  const handleDeleteJob = (id) => {
    setTodos(prev => prev.filter((item) => item.id !== id)) 
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      handleAddJob();
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8 h-screen items-center border border-red-500 justify-center">
        <div className=' flex gap-8'>
          <input 
            className="outline-none border border-blue-500 px-4 py-2 w-[400px] "
            value={work}
            onChange={(e) => setWork(e.target.value)}
            placeholder="Please enter the value here..."
            onKeyDown={handleKeyDown}
          />
          <button
            className="border border-transparent px-4 py-2 rounded-md bg-blue-500 text-white" 
            onClick={handleAddJob}
          >
            Add
          </button>
        </div >
        <div>
          <h3 className='font-bold text-xl'>Content:</h3>
          <ul>
            {todos.map((item) => { 
              return <li key={item.id} className="flex gap-6">
                        <span className='p-2 '>{item.job}</span>
                        <span onClick={() => handleDeleteJob(item.id)} className='p-2 cursor-pointer'>X</span>
                     </li>
            })}
          </ul>
        </div>
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
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
