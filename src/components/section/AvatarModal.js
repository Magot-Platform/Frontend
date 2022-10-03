import { useState } from 'react';
import { updateUserAvatar } from '../../actions/auth';
import { connect } from 'react-redux';

const AvatarModal = ({isShow, showModal, updateUserAvatar}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [checkFile, setCheckFile] = useState(false);

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setCheckFile(true);
  }

  const imageSubmission = async (e) => {
    e.preventDefault();

    if (checkFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await updateUserAvatar(formData);
      showModal(false);
    } else {
      alert('select a file');
    }
  }

  return (
    <div className={`${isShow ? 'flex' : 'hidden'} scrollbox fixed z-[999999] top-0 left-0 w-full h-full bg-slate-700/40 items-center justify-center`}>
      <div className='rounded-lg shadow-xl bg-gray-50 lg:w-[300px]'>
        <div className='m-4'>
          <label className='inline-block mb-2 text-gray-500'>Upload
            Avatar(jpg,png,svg,jpeg)</label>
          <div className='flex items-center justify-center w-full'>
            <label className='flex flex-col w-40 h-40 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300'>
            <img className={`h-40 rounded ${checkFile ? 'opacity-1' : 'opacity-0'}`} src={selectedFile ? URL.createObjectURL(selectedFile) : null} alt='' />
              <div className={` ${checkFile  ? 'hidden' : 'flex'} flex-col items-center justify-center pt-7`}>
                <svg xmlns='http://www.w3.org/2000/svg'
                  className='w-12 h-12 text-gray-400 group-hover:text-gray-600' viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path fillRule='evenodd'
                    d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                    clipRule='evenodd' />
                </svg>
                <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
                  Select a photo</p>
              </div>
              <input type='file' className='opacity-0' onChange={imageHandler} />
            </label>
          </div>
        </div>
        <div className='flex p-2 space-x-4 justify-between'>
          <button className='px-4 py-2 text-blue-800 hover:text-blue-400 rounded shadow-xl' onClick={() => showModal(false)}>Cannel</button>
          <button className='px-4 py-2 text-blue-800 hover:text-blue-400 rounded shadow-xl' onClick={(e) => imageSubmission(e)}>Change</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUserAvatar })(AvatarModal);
