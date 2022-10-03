import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri';
import { useState, useEffect, useRef } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LaunchDay = ({onChange}) => {
  const [isShow, toogleShow] = useState(false);
  
  const handleChange = (e) => {
    toogleShow(!isShow);
    setStartDate(e);
    onChange(e);
  };
  const [startDate, setStartDate] = useState(new Date());

  function useOutsideEvent(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          toogleShow(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }  

  const wrapperRef = useRef(null);
  useOutsideEvent(wrapperRef);

  return (
    <div className='relative w-full bg-transparent text-white outline-0 border-b text-xl'>
      <div className='flex justify-end mt-2' onClick={() => toogleShow(!isShow)}>
        {startDate.toISOString().slice(0, 10)}
        {isShow == false ? <div className='ml-20'><RiArrowDownSLine /></div> : <div className='ml-20'><RiArrowUpSLine /></div>}
      </div>
      {isShow ? 
      <div 
        className='absolute top-12 left-3 bg-white text-black w-full rounded-md shadow-md'
        ref={wrapperRef}
      >
        <div>
          <DatePicker selected={startDate} onChange={handleChange} inline />
        </div>
        <div className='mt-5 z-10'>
          <button 
            className='bg-yellow-500 hover:bg-yellow-700 text-black font-medium rounded text-[16px] px-2'
          >
            &#x2715; Reset
          </button>
        </div>
      </div> : null
      }
    </div>        
  );
}

export default LaunchDay;