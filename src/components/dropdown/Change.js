import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri';
import { useState, useEffect, useRef } from 'react';

const Change = ({onChange}) => {
  const [isShow, toogleShow] = useState(false);
  const [val, setVal] = useState([0, 1000]);

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

  // const onChangeVal = (v) => {
  //   onChange(v);
  //   setVal(v);
  // }

  const wrapperRef = useRef(null);
  useOutsideEvent(wrapperRef);

  return (
    <div className='relative w-full bg-transparent text-white outline-0 border-b text-xl'>
      <div className='flex justify-end mt-2' onClick={() => toogleShow(!isShow)}>
        {isShow == false ? <div className='ml-20'><RiArrowDownSLine /></div> : <div className='ml-20'><RiArrowUpSLine /></div>}
      </div>
      {isShow ? 
      <div 
        className='absolute top-12 left-0 bg-white text-black w-full px-4 py-2 rounded-md text-[14px] shadow-md z-10'
        ref={wrapperRef}
      >
        <div className='text-[14px]'>Etendue de l’evolution</div>
        <div className='flex mt-1 gap-2'>
          <button className='bg-yellow-50 hover:bg-yellow-700 pl-2 pr-8 rounded-md'>-100%</button>
          a
          <button className='bg-yellow-50 hover:bg-yellow-700 pl-2 pr-8 rounded-md'>1000%</button>
        </div>
        <div className='text-[14px]'>Etendues plus recherchees</div>
        <div className='flex mt-1 gap-2'>
          <button className='bg-yellow-50 hover:bg-yellow-700 px-2 text-center rounded-sm'>+50%</button>
          <button className='bg-yellow-50 hover:bg-yellow-700 px-2 text-center rounded-sm'>10 ~ 50%</button>
          <button className='bg-yellow-50 hover:bg-yellow-700 px-2 text-center rounded-sm'>0 ~ 10%</button>
        </div>
        <div className='flex mt-1 gap-2 mb-2'>
          <button className='bg-yellow-50 hover:bg-yellow-700 px-1 text-center rounded-sm'>-10 ~ 0%</button>
          <button className='bg-yellow-50 hover:bg-yellow-700 px-1 text-center rounded-sm'>-50 ~ -10%</button>
          <button className='bg-yellow-50 hover:bg-yellow-700 px-1 text-center rounded-sm'>-50%</button>
        </div>
        <div className='border-t border-slate-300 pt-2'>
          <button 
            className='bg-yellow-500 hover:bg-yellow-700 text-black font-medium rounded text-[16px] px-2'
            onClick={() => setVal([0, 1000])}
          >
            &#x2715; Reset
          </button>
        </div>
      </div> : null
      }
    </div>        
  );
}

export default Change;