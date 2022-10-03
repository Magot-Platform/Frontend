import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
import api from '../utils/api';

const TokenDetail = () => {
    let {chain, address} = useParams();
    const [dexurl, setDexURL] = useState();
    const [tokenInfo, setTokenInfo] = useState();
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        setDexURL(`https://dexscreener.com/`+chain+`/`+address);
    }, [dexurl, chain, address]);

    useEffect(() => {
        const getData = async () => {
            if (address && flag === true ) {
                const body = {
                    address: address
                }
                const res = await api.post('/tokens/one', body);
                const data = await res.data;

                console.log(data);
                setTokenInfo(data);
                setFlag(false)
            }
        };

        getData();
    }, [tokenInfo, chain, address, flag]);

    return (
        <div className='flex justify-between bg-[#F9F9F9] dark:bg-slate-800 dark:text-slate-200'>
            <div className='w-1/5 h-screen overflow-auto scroller'>
                <div className='bg-white shadow-lg p-6 dark:bg-slate-800'>
                    { tokenInfo &&
                    <div className='flex items-center justify-center gap-4'>
                        <img src={`/img/tokens/${tokenInfo.tokenIcon}`} width='40' className='rounded-full' alt='' />
                        <p className='font-bold text-xl'>{tokenInfo.tokenName} (${tokenInfo.tokenSymbol})</p>
                    </div>
                    }
                    <div className='flex gap-3 mt-5 justify-center'>
                        <img src='/img/Group_307.png' className='rounded-full' alt='' />
                        <img src='/img/Group_301.png' className='rounded-full' alt='' />
                    </div>
                </div>

                <div className='bg-white shadow-lg p-6 mt-6 dark:bg-slate-800'>
                    <img src='/img/Group_303.png' className='m-auto' alt='' />
                    <p className='font-bold text-2xl text-center mt-2'>Magot Rug Check</p>
                    <p className='font-medium text-center text-lg mt-2'>To unlock Rug Check, you need to hold 3 billion <span className='text-yellow-700'>DOBO</span> ($18)</p>
                    <button className='py-1 px-3 rounded-xl m-auto items-center mt-5 flex gap-2 text-black font-medium text-lg' style={{background: 'linear-gradient(90deg, #D47A09 0%, #EBBF33 100%)'}}>
                        <div className='bg-white p-2 rounded-xl'><img src='/img/metamask.png' alt='' /></div>
                        Connect with Metamask
                    </button>
                    <p className='font-medium text-center text-lg mt-2'>Make sure you are  <span className='text-yellow-700'>connected to BSC.</span></p>
                </div>
                <div className='bg-gray-200 mt-6 rounded' height={600}>
                    <div id='rubic-widget-root'>
                        <Iframe
                            url='https://widgets.rubic.exchange/?iframe=vertical&theme=light&background=white'
                            height='500'
                            width='100%'
                        />
                    </div>
                </div>
                <div className='mt-5 p-6'>
                    <p className='border-b border-gray-200 p-2'>Honeypot:</p>
                    <p className='border-b border-gray-200 p-2'>Unlocked liquidity:</p>
                    <p className='border-b border-gray-200 p-2'>Liquidity whale:</p>
                    <p className='border-b border-gray-200 p-2'>Ownership:</p>
                    <p className='border-b border-gray-200 p-2'>Changeable code (Proxy):</p>
                    <p className='border-b border-gray-200 p-2'>Buy fee:</p>
                    <p className='border-b border-gray-200 p-2'>Sell fee:</p>
                    <p className='border-b border-gray-200 p-2'>Max TX amount:</p>
                    <p className='border-b border-gray-200 p-2'>% of supply burnt:</p>
                    <p className='border-b border-gray-200 p-2'>% of supply in liquidity:</p>
                    <p className='border-b border-gray-200 p-2'>Top 5 whales:</p>
                    <p className='border-b border-gray-200 p-2'>Top 1 whale:</p>
                </div>

                <div className='py-6'>
                    <div className='grid grid-cols-2 gap-3 p-1'>
                        <a href='https://tokensniffer.com/'
                            className='bg-yellow-500 hover:bg-yellow-700 text-black font-medium flex justify-center items-center gap-2 w-full py-2 rounded'
                        ><img src='/img/Grosup.png' alt='' />TokenSniffer</a>
                        <a href='https://tokensniffer.com/'
                            className='bg-yellow-500 hover:bg-yellow-700 border text-black font-medium flex justify-center items-center gap-2 w-full py-2 rounded '
                        ><img src='/img/Group 507.png' alt='' />Bubble map</a>
                    </div>
                    <div className='p-1'>
                        <a href={`https://bscscan.com/token/${address}#balances`}
                            className='mt-3 border-yellow-500 hover:bg-yellow-500 border flex justify-center text-black font-medium items-center gap-2 w-full py-2 rounded'
                        ><img src='/img/Vector (1).png' alt='' />Token holders</a>
                    </div>
                    <div className='mt-3 grid grid-cols-2 gap-3 p-1'>
                        <button
                            className='border-yellow-500 hover:bg-yellow-500 border flex justify-center text-black font-medium items-center gap-2 w-full py-2 rounded'
                        >
                            <img src='/img/Vector (2).png' alt='' />
                            Liquidity holders
                        </button>
                        <a href={`https://bscscan.com/token/${address}#code`}
                            className='bg-yellow-500 hover:bg-yellow-700 flex justify-center text-black font-medium items-center gap-2 w-full py-2 rounded'
                        ><img src='/img/Vector_(5).png' alt='' />Read contract</a>
                    </div>
                    <div className='p-1'>
                        <button className='mt-3 border-yellow-500 hover:bg-yellow-500 border flex justify-center text-black font-medium items-center gap-2 w-full py-2 rounded'>
                            <img src='/img/💩.png' alt='' />
                            Dev wallet check
                        </button>
                    </div>

                </div>


                <div className='bg-white shadow-lg p-6 dark:bg-slate-800'>
                    <p className='font-bold text-2xl text-center'>History</p>
                </div>
                <div className='bg-white shadow-lg p-6 mt-4 dark:bg-slate-800'>
                    <p className='font-bold text-2xl text-center'>Volume</p>
                    <img src='/img/Group 514.png' className='mt-2' alt='' />
                </div>
                <div className='bg-white shadow-lg p-6 mt-4 dark:bg-slate-800'>
                    <p className='font-bold text-2xl text-center'>Transactions</p>
                    <img src='/img/Group 514.png' className='mt-2' alt='' />
                </div>
                <div className='bg-white shadow-lg p-6 mt-4 dark:bg-slate-800'>
                    <p className='font-bold text-2xl text-center'>Liquidity</p>
                    <img src='/img/Group 514.png' className='mt-2' alt='' />
                </div>

                <div className='p-6 text-center'>
                    <p>The live {tokenInfo && tokenInfo.tokenName} price today is $ 0.000000154071 USD with a 24-hour trading volume of $ 0.00 USD. View our updated $RAGE to USD price, market cap and news in real-time.</p> 
                </div>

                <div className='border-t border-b border-gray-200 p-6'>
                    <p className='text-xl font-medium text-center'>Is {tokenInfo && tokenInfo.tokenName} audited?</p>
                </div>
            </div>
            <div className='w-4/5 overflow-hidden'>
                {chain &&
                <Iframe
                    url={ dexurl }
                    width='114%'
                    height='105%'
                    className='iframe'
                    styles={{height: '25px'}}
                /> }
            </div>
        </div>
    )
}

export default TokenDetail;
