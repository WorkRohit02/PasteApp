import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);

  // TO Search
  const [searchTerm, setSearchTerm] = useState('');

  // TO Edit
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className='w-full m-4'>
      <div>
        <input className='p-2 rounded-2xl min-w-[415px]' type="search" placeholder='Search...' value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
  
      <div className='flex flex-col gap-4 mt-4'>
        {
        filteredData.length > 0 && 
        filteredData.map((paste) => {
        return (
          <div className='border' key={paste?._id}>
            <div>
              {paste.title}
            </div>

            <div>
              {paste.content}
            </div>

            <div className='flex flex-row place-content-evenly m-2'>
              <button>
                <Link to={`/?pasteId=${paste?._id}`}>
                  Edit
                </Link>
              </button>
              <button>
                <Link to={`/pastes/${paste?._id}`}>
                  View
                </Link>
              </button>
              <button onClick={() => handleDelete(paste?._id)}>Delete</button>
              <button onClick={() => {
                navigator.clipboard.writeText(paste?.content);
                toast.success("Copied to Clipboard")
              }}>Copy</button>
              <button>Share</button>
            </div>
            
            <div>
              {paste.createdAt}
            </div>
          </div>
        )})
        }
      </div>
    </div>
  );
}

export default Paste;
