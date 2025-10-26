import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';



const Viewpaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes)

  const paste = allPastes.filter((p) => p._id === id)[0]
  return (
    <div>
      <div className='m-4 '>
        <input type="text" className='p-2 rounded min-w-[413px]' placeholder='Enter Title Here' 
        value={paste.title} disabled onChange={(e) => setTitle(e.target.value)}/>

      </div>

      <div className="w-full flex justify-center">
        <textarea
          className="border border-gray-400 rounded p-4 "
           value={paste.content} disabled placeholder='Enter content here' 
        onChange={(e) => setValue(e.target.value)} rows={15} cols={50}></textarea>
      </div>
    </div>
  );
}

export default Viewpaste;
