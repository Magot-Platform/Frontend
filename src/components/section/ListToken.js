import './index.css';

import { useState } from 'react';
import { connect } from 'react-redux';
import { createTokenList } from '../../actions/tokenlist';
import { notify } from '../../utils/notify';

const ListToken = ({isShow, setShow, createTokenList}) => {
    const [website, setWebsite] = useState(''),
        [telegram, setTelegram] = useState(''),
        [address, setAddress] = useState(''),
        [chain, setChain] = useState(''),
        [icon, setIcon] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (website.length === 0 || telegram.length === 0 || address.length === 0 || chain.length === 0 || icon.length === 0 ) {
            notify('warning', 'You Must Set All Fields');
            return;
        }

        const formData = new FormData();

        formData.append('icon', icon)
        formData.append('website', website);
        formData.append('telegram', telegram);
        formData.append('address', address);
        formData.append('chain', chain);

        const res = await createTokenList(formData);

        if(res.type === 'success') {
            notify(res.type, res.msg);
        } else if (res.type === 'warning') {
            notify(res.type, res.msg);
        } else {
            notify('error', 'Token List Failed');
        }

        setShow(false);
    }

    return (
        <div className={`scrollbox fixed z-[999999] top-0 left-0 w-full h-full bg-slate-700/40 items-center justify-center ${isShow ? 'flex' : 'hidden'}`}>
            <div className='max-w-[650px] w-9/12 h-6/7 bg-[#F5F5DC] text-center rounded-2xl p-6 overflow-auto scroller dark:text-slate-600 dark:bg-slate-200'>
                <div className='text-2xl font-medium flex justify-between'>
                    <p>List Token</p>
                    <p className='cursor-pointer' onClick={() => setShow(false)}>&#x2715;</p>
                </div>
                <div className='bg-transparent/5 p-4 mt-4 text-left'>
                    <p className='text-xl font-medium'>Why list on Magot?</p>
                    <div className='flex gap-2 items-start mt-2'>
                        <img className='mt-1' src='/img/confirm2.png' alt='' />
                        <p>Listings are automated (within 1-2 minutes), while CoinMarketCap and CoinGecko can take weeks, even months</p>
                    </div>
                    <div className='flex gap-2 items-start mt-2'>
                        <img className='mt-1' src='/img/confirm2.png' alt='' />
                        <p>Our 1500+ Telegram members are looking for degen plays every day</p>
                    </div>
                    <div className='flex gap-2 items-start mt-2'>
                        <img className='mt-1' src='/img/confirm2.png' alt='' />
                        <p>Your listing will be called in our Telegram group</p>
                    </div>
                </div>
                {/* <p className='text-[#D47A09] font-Poppins text-2xl text-center font-bold mt-3'>Token icon (square):</p> */}

                <div className='mt-2 text-left'>
                    <p className='font-medium text-sm'>Icon:</p>
                <input
                    type='file'
                    className='mt-1 w-full py-1 px-3 bg-transparent/5'
                    onChange={(e)=>setIcon(e.target.files[0])}
                />
                </div>

                <div className='mt-2 text-left'>
                    <p className='font-medium text-sm'>Website:</p>
                    <input
                        type='text'
                        className='mt-1 w-full py-1 px-3 bg-transparent/5'
                        placeholder='https://Lorem Ipsum.com'
                        onChange={(e)=>setWebsite(e.target.value)}
                    />
                </div>
                <div className='mt-2 text-left'>
                    <p className='font-medium text-sm'>Telegram:</p>
                    <input
                        type='text'
                        className='mt-1 w-full py-1 px-3 bg-transparent/5'
                        placeholder='https://t.me/Lorem Ipsum.com'
                        onChange={(e)=>setTelegram(e.target.value)}
                    />
                </div>
                <div className='mt-2 text-left'>
                    <p className='font-medium text-sm'>Address:</p>
                    <input
                        type={'text'}
                        className='mt-1 w-full py-1 px-3 bg-transparent/5'
                        placeholder='0xAe2Df9f730c54400934255258522am'
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>
                <div className='mt-2 text-left'>
                    <p className='font-medium text-sm'>Chain:</p>
                    <select
                        className='mt-1 w-full py-1 px-3 bg-transparent/5'
                        onChange={(e)=>setChain(e.target.value)}
                    >
                        <option value='eth'>Ethereum</option>
                        <option value='optimism'>Optimism</option>
                        <option value='bsc'>BSC</option>
                        <option value='polygon'>Polygon</option>
                        <option value='fantom'>Fantom</option>
                        <option value='arbitrum'>Arbitrum</option>
                        <option value='celo'>Celo</option>
                        <option value='avalanche'>Avalanche</option>
                    </select>
                </div>

                <div className='mt-2 text-left flex gap-2 items-center'>
                    <input
                        type='checkbox'
                        className='bg-transparent/5'
                    />
                    <p className='text-sm'>I accept the <span className='text-yellow-600'>Terms of Service.</span></p>
                </div>

                <div className='mt-3 flex justify-between items-center'>
                    <p>Total 100 BUSD</p>
                    <button
                        className='px-6 py-2 rounded bg-yellow-500 hover:bg-yellow-700 text-white font-medium' 
                        onClick={handleSubmit}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    tokenlist: state.tokenlist
});

export default connect(mapStateToProps, { createTokenList })(ListToken);