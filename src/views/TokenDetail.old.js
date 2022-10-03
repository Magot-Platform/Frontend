import { useState, useEffect } from 'react';
import MarketChart from '../components/section/MarketChart';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const TokenDetail = () => {

    let { chain, address } = useParams();
    const [pairInfo, setPairInfo] = useState([]);

    useEffect(() => {

        console.log(chain, address)
        const body = {
            chain: chain,
            address: address
        }
        const getData = async () => {
            const res = await api.post('/token', body);
            const data = await res.data;
            setPairInfo(data.pairs.at(0));
            console.log(data.pairs.at(0))
        }
        getData();
    }, [])

    return (
        <>
            <div className='flex justify-between bg-[#F9F9F9] pt-10'>
                <div className='w-1/5'>
                    <div className='bg-white shadow-lg  p-6'>
                        <div className='flex items-center justify-center gap-4'>
                            <img src='/img/social-media-profile-photos-3 1.png' className='rounded-full' alt='' />
                            <p className='font-medium'>RageInu ($RAGE)</p>
                        </div>
                        <div className='flex gap-3 mt-5 justify-center'>
                            <img src='/img/Group_307.png' className='rounded-full' alt='' />
                            <img src='/img/Group_301.png' className='rounded-full' alt='' />
                        </div>
                    </div>

                    <div className='bg-white shadow-lg p-6 mt-6'>
                        <img src='/img/Group_303.png' className='m-auto' alt='' />
                        <p className='font-bold text-2xl text-center mt-2'>MemeTools Rug Check</p>
                        <p className='font-medium text-center text-lg mt-2'>To unlock Rug Check, you need to hold 3 billion <span className='text-yellow-700'>DOBO</span> ($18)</p>
                        <button className='py-1 px-1 rounded-xl m-auto items-center mt-5 flex gap-2 text-black font-medium text-xl' style={{background: 'linear-gradient(90deg, #D47A09 0%, #EBBF33 100%)'}}>
                            <div className='bg-white p-2 rounded-xl'><img src='/img/metamask.png' alt='' /></div>
                            Connect with metamask
                        </button>
                        <p className='font-medium text-center text-lg mt-2'>Make sure you are  <span className='text-yellow-700'>connected to BSC.</span></p>
                    </div>
                    <div className='bg-gray-200 shadow-lg p-6 mt-6 h-32'>
                        <p>Rublic components</p>
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
                        <div className='grid grid-cols-2 gap-3'>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/Grosup.png' alt='' />
                                TokenSniffer
                            </button>
                            <button className='border-yellow-500 border flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/Group 507.png' alt='' />
                                Bubbl map
                            </button>
                        </div>
                        <button className='mt-3 border-yellow-500 border flex justify-center items-center gap-2 w-full py-2 rounded'>
                            <img src='/img/Vector (1).png' alt='' />
                            token holders
                        </button>
                        <div className='mt-3 grid grid-cols-2 gap-3'>
                            <button className='border-yellow-500 border flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/Vector (2).png' alt='' />
                                liquidity holders
                            </button>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/Vector_(5).png' alt='' />
                                read contract
                            </button>
                        </div>
                        <button className='mt-3 border-yellow-500 border flex justify-center items-center gap-2 w-full py-2 rounded'>
                            <img src='/img/💩.png' alt='' />
                            dev wallet check
                        </button>

                    </div>


                    <div className='bg-white shadow-lg p-6'>
                        <p className='font-bold text-2xl text-center'>History</p>
                    </div>
                    <div className='bg-white shadow-lg p-6 mt-4'>
                        <p className='font-bold text-2xl text-center'>Volume</p>
                        <img src='/img/Group 514.png' className='mt-2' alt='' />
                    </div>
                    <div className='bg-white shadow-lg p-6 mt-4'>
                        <p className='font-bold text-2xl text-center'>Transactions</p>
                        <img src='/img/Group 514.png' className='mt-2' alt='' />
                    </div>
                    <div className='bg-white shadow-lg p-6 mt-4'>
                        <p className='font-bold text-2xl text-center'>Liquidity</p>
                        <img src='/img/Group 514.png' className='mt-2' alt='' />
                    </div>

                    <div className='p-6 text-center'>
                        <p>The live RageInu price today is $ 0.000000154071 USD with a 24-hour trading volume of $ 0.00 USD. View our updated $RAGE to USD price, market cap and news in real-time.</p> 
                    </div>

                    <div className='border-t border-b border-gray-200 p-6'>
                        <p className='text-xl font-medium text-center'>is ragelnu audited?</p>
                    </div>
                </div>

                <div className='w-3/4 text-center px-4'>
                    <p className='text-3xl font-bold'>Bitcoin Price Chart (BTC/EURO)</p>
                    <div className='grid justify-items-center mt-10 w-full h-auto'>
                        <MarketChart />
                    </div>

                    <div className='rounded-3xl'>
                        <table className='cryptow shadow-lg mt-10 w-full text-center'>
                            <thead className='bg-[#F0F0F2]'>
                                <tr>
                                    <th>DATE</th>
                                    <th>TYPE</th>
                                    <th>USD</th>
                                    <th>$RAGE</th>
                                    <th>WBNB</th>
                                    <th>PRICE</th>
                                    <th>TXN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-red-500 font-medium text-center'>
                                    <td className='text-black'>Jun 1st 09:29:18 AM</td>
                                    <td className=''>Sell</td>
                                    <td className=''>5.7</td>
                                    <td className=''>47,544,043</td>
                                    <td className=''>0.01591</td>
                                    <td className=''>$0.0000001068</td>
                                    <td className=''>0xe63f</td>
                                </tr>
                                <tr className='text-green-500 font-medium text-center'>
                                    <td className='text-black'>Jun 1st 09:29:18 AM</td>
                                    <td className=''>Sell</td>
                                    <td className=''>5.7</td>
                                    <td className=''>47,544,043</td>
                                    <td className=''>0.01591</td>
                                    <td className=''>$0.0000001068</td>
                                    <td className=''>0xe63f</td>
                                </tr>
                                <tr className='text-red-500 font-medium text-center'>
                                    <td className='text-black'>Jun 1st 09:29:18 AM</td>
                                    <td className=''>Sell</td>
                                    <td className=''>5.7</td>
                                    <td className=''>47,544,043</td>
                                    <td className=''>0.01591</td>
                                    <td className=''>$0.0000001068</td>
                                    <td className=''>0xe63f</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                {pairInfo && pairInfo.chainId && ( 
                <div className='w-1/5'>
                    <div className='bg-white shadow-lg p-6'>
                        <div className='flex justify-center items-center gap-2 font-medium'>
                            <img src='/img/Group 426.png' alt='' />
                            <p>{pairInfo.chainId.toUpperCase()}</p>
                            <img src='/img/pancakeswap 1.png' alt='' />
                            <p>{pairInfo.dexId.toUpperCase()}</p>
                        </div>
                        <div className='flex justify-center items-center gap-2 font-medium mt-4'>
                            <img src='/img/Group 428.png' alt='' />
                            <p>$RAGE/WBNB Ragelnu</p>
                        </div>
                    </div>
                    <div className='bg-[#D47A09]/20 text-center p-5 mt-6'>
                        <img className='m-auto' src='/img/alert-triangle.png' alt='' />
                        <p className='text-[#D47A09]'>This pair has very little liquidity. <br/>What is liquidity?</p>
                    </div>
                    <div className='px-6 py-3 mt-3 flex justify-between'>
                        <div>
                            <p className='text-[#504F4F]'>PRICE USD</p>
                            <p className='font-medium text-lg'>${pairInfo.priceUsd}</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-[#504F4F]'>PRICE</p>
                            <p className='font-medium text-lg'>0.093414 WBNB</p>
                        </div>
                    </div>
                    <div className='px-6 py-3 border-t border-b border-gray-300 flex justify-between'>
                        <div>
                            <p className='text-[#504F4F]'>LIQUIDITY</p>
                            <p className='font-medium text-lg'>${Math.round(parseFloat(pairInfo.liquidity.usd)/1000)}K</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-[#504F4F]'>FDV</p>
                            <p className='font-medium text-lg'>${Math.round(parseFloat(pairInfo.fdv)/1000)}K</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-[#504F4F]'>MKT CAP</p>
                            <p className='font-medium text-lg'>${Math.round(parseFloat(pairInfo.fdv)/1000)}K</p>
                        </div>
                    </div>
                    <div className='px-6 py-3 flex justify-between'>
                        <div>
                            <p className='text-[#504F4F]'>5M</p>
                            <p className='font-medium text-lg'>{parseFloat(pairInfo.priceChange.m5)}%</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-[#504F4F]'>1H</p>
                            <p className='font-medium text-lg'>{parseFloat(pairInfo.priceChange.h1)}%</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-[#504F4F]'>6H</p>
                            <p className='font-medium text-lg'>{parseFloat(pairInfo.priceChange.h6)}%</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-[#504F4F]'>24H</p>
                            <p className='font-medium text-lg'>{parseFloat(pairInfo.priceChange.h24)}%</p>
                        </div>
                    </div>
                    <div className=' bg-white'>
                        <div className='grid text-center grid-cols-4'>
                            <div className='bg-[#D47A09] py-1'>5M</div>
                            <div className='bg-[#E4E4E4] py-1'>1H</div>
                            <div className='bg-[#E4E4E4] py-1'>6H</div>
                            <div className='bg-[#E4E4E4] py-1'>24H</div>
                        </div>
                        <div className='grid grid-cols-4 text-center'>
                            <div className='py-2'>
                                <p className='text-[#504F4F]'>TXNS</p>
                                <p className='font-medium text-lg'>0</p>
                            </div>
                            <div className='py-2'>
                                <p className='text-[#504F4F]'>BUYS</p>
                                <p className='font-medium text-lg'>0</p>
                            </div>
                            <div className='py-2'>
                                <p className='text-[#504F4F]'>SELLS</p>
                                <p className='font-medium text-lg'>0</p>
                            </div>
                            <div className='py-2'>
                                <p className='text-[#504F4F]'>VOLUME</p>
                                <p className='font-medium text-lg'>N/A</p>
                            </div>
                        </div>
                    </div>

                    <div className='py-6'>
                        <div className='grid grid-cols-2 gap-3'>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/star.png' alt='' />
                                Add to watchlist
                            </button>
                            <button className='border-yellow-500 border flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/ring.png' alt='' />
                                set price alerts
                            </button>
                        </div>
                        <div className='mt-3 flex gap-3'>
                            <button className='border-yellow-500 border flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/Vector (3).png' alt='' />
                                Telegram alerts
                            </button>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/Vector_(5).png' alt='' />
                                read contract
                            </button>
                        </div>
                        <div className='grid grid-cols-4 gap-3 mt-3'>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/🚀.png' alt='' />
                                2
                            </button>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/🔥.png' alt='' />
                            </button>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/💩.png' alt='' />
                                2
                            </button>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/🚩.png' alt='' />
                                2
                            </button>
                        </div>


                    </div>

                    <div className='bg-white shadow-lg px-6'>
                        <div className='flex justify-between items-center py-2 border-b border-gray-200'>
                            <p>Pair:</p>
                            <div className='flex justify-end items-center gap-3'>
                                <p>{pairInfo.pairAddress.slice(0,6) + '...' + pairInfo.pairAddress.slice(38)}</p>
                                <img src='/img/Vector (4).png' alt='' />
                                <img src='/img/Vector (5).png' alt='' />
                            </div>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b border-gray-200'>
                            <p>{pairInfo.baseToken.symbol}:</p>
                            <div className='flex justify-end items-center gap-3'>
                                <p>{pairInfo.baseToken.address.slice(0,6) + '...' + pairInfo.baseToken.address.slice(38)}</p>
                                <img src='/img/Vector (4).png' alt='' />
                                <img src='/img/Vector (5).png' alt='' />
                            </div>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b border-gray-200'>
                            <p>Pooled {pairInfo.baseToken.symbol}:</p>
                            <p>{pairInfo.liquidity.base}</p>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b border-gray-200'>
                            <p>Pooled WBNB:</p>
                            <p>{Math.round(pairInfo.liquidity.quote)}</p>
                        </div>
                        <div className='flex justify-between items-center py-2 border-b border-gray-200'>
                            <p>Pair created: {pairInfo.pairCreatedAt && Date.now() - parseInt(pairInfo.pairCreatedAt)}</p>     
                        </div>
                    </div>

                    <div className='mt-3'>
                        <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                            <img src='/img/Vector (8).png' alt='' />
                            Trade on PancakeSwap
                            <img src='/img/Vector (6).png' alt='' />
                        </button>
                        <div className='grid grid-cols-2 gap-3 mt-3'>
                            <button className='gradient_bg flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/Vector (9).png' alt='' />
                                Search on twitter
                            </button>
                            <button className='border-yellow-500 border flex justify-center items-center gap-2 w-full py-2 rounded'>
                                <img src='/img/google.png' alt='' />
                                Search on Google
                            </button>
                        </div>
                    </div>
                    
                    <div className='border-t border-b border-gray-200 p-6'>
                        <p className='text-lg text-center'>Token info not found on CoinGecko Chart by Trading View</p>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}

export default TokenDetail;