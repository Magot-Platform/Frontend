import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri';
import { useState, useEffect, useRef } from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  track: {
    color: '#D47A09',
    height: '1px',
    borderRadius: '3px'
  },
  rail: {
    opacity: 1,
    backgroundColor: '#aaaaaa',
    height: '1px',
    borderRadius: '3px'
  },
  thumb: {
    color: '#D47A09',
    width: '1rem',
    height: '1rem'
  },
  focusVisible: {},
  active: {}
});

const Holders = ({onChange}) => {
  const [isShow, toogleShow] = useState(false);
  const [val, setVal] = useState([0, 1000]);
  const classes = useStyles();

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

  const onChangeVal = (v) => {
    onChange(v);
    setVal(v);
  }

  const wrapperRef = useRef(null);
  useOutsideEvent(wrapperRef);

  return (
    <div className='relative w-full bg-transparent text-white outline-0 border-b text-xl'>
      <div className='flex justify-end mt-2' onClick={() => toogleShow(!isShow)}>
        <div className='text-center'>
        {val.length > 0  ? val[1] == 1000 ? `${val[0]}` + ` ~ ` + `${val[1]}+` : `${val[0]}` + ` ~ ` + `${val[1]}` : ''}
        </div>
        {isShow == false ? <div className='ml-20'><RiArrowDownSLine /></div> : <div className='ml-20'><RiArrowUpSLine /></div>}
      </div>
      {isShow ? 
      <div 
        className='absolute top-12 left-0 bg-white text-black w-full px-5 py-3 rounded-md z-10'
        ref={wrapperRef}
      >
        <div>
          <Slider
            classes={classes}
            step={1}
            min={0}
            max={1000}
            value={val}
            onChange={(ev, v) => onChangeVal(v)}
            onChangeCommitted={(ev, v) => console.log(v)}
            valueLabelDisplay='off'
            aria-labelledby='range-slider'
          />
        </div>
        <div className='flex justify-between text-slate-500 text-[16px]'>
          <div>{val.length > 0  ? `${val[0]}` : '0'}</div>
          <div>{val.length > 0  ? val[1] == 1000 ? `${val[1]}+` : `${val[1]}` : '1000+'}</div>
        </div>
        <div className='mt-5'>
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

export default Holders;