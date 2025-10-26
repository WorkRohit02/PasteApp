import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {

  const [title,setTitle] = useState('');
  const [value,setValue] = useState('');
  const [searchParams,setSearchparams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content)
      }

    } , [pasteId])

  function createPaste(){
    const paste ={
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(36) ,
      createdAt: new Date().toISOString()
    }


    if(pasteId){
      // Update existing paste
      dispatch(updateToPaste(paste));
    }
    else{
      // Create new paste
      dispatch(addToPaste(paste));
    }

    // Clear input fields
    setTitle('');
    setValue('');
    setSearchparams({});
  }
  
  return (
    <div>
      <div className='m-4 '>
        <input type="text" className='p-2 rounded min-w-[265px]' placeholder='Enter Title Here' 
        value={title} onChange={(e) => setTitle(e.target.value)}/>

        <button onClick={createPaste} className='p-2 rounded m-2'>
          {/* to run Update Paste "http://localhost:5174/?pasteId=dvnfdlivdf" */}
          {pasteId ? "Update Paste" : 'Create Paste'}
        </button>
      </div>

      <div className="w-full flex justify-center">
        <textarea
          className="border border-gray-400 rounded p-4 "
           value={value} placeholder='Enter content here' 
        onChange={(e) => setValue(e.target.value)} rows={15} cols={50}></textarea>
      </div>
    </div>
  );
}

export default Home;
