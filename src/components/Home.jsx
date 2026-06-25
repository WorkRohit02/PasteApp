import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {

  // State for paste title and content
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  // Get pasteId from URL query params
  const [searchParams, setSearchparams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  const dispatch = useDispatch();

  // Get all pastes from Redux store
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    // If editing an existing paste, load its data
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    // Create paste object
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36), // Reuse id or generate new one
      createdAt: new Date().toISOString()
    };

    if (pasteId) {
      // Update existing paste
      dispatch(updateToPaste(paste));
    } else {
      // Add new paste
      dispatch(addToPaste(paste));
    }

    // Reset form after save
    setTitle('');
    setValue('');
    setSearchparams({});
  }

  return (
    <div>
      <div className='m-4'>
        <input
          type="text"
          className='p-2 rounded min-w-[265px]'
          placeholder='Enter Title Here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className='p-2 rounded m-2'
        >
          {/* If pasteId exists, show Update button */}
          {pasteId ? 'Update Paste' : 'Create Paste'}
        </button>
      </div>

      <div className="w-full flex justify-center">
        <textarea
          className="border border-gray-400 rounded p-4"
          value={value}
          placeholder='Enter content here'
          onChange={(e) => setValue(e.target.value)}
          rows={15}
          cols={50}
        />
      </div>
    </div>
  );
};

export default Home;