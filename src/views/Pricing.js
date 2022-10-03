import { useEffect, useState } from 'react';
import MarketChart from '../components/section/MarketChart';
import api from '../utils/api';
import { Bars } from 'react-loader-spinner';
import { FaFlag } from 'react-icons/fa';

const Pricing = () => {

    const [tokenInfo, setTokenInfo] = useState([]);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const res = await api.get('/tokens/list');
            const data = await res.data;
            setTokenInfo(data);

            setLoading(false);
        }

        getData();
    }, []);

    return (
        <div className='dark:bg-slate-800'>
            <div className='sm:flex justify-between'>
                <div className='sm:w-1/2 relative flex justify-end mb-20'>

                    <div className='p-10'>
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-3'>
                                <img src='/img/bit_x32_.png' alt='' className='h-8' />
                                <p className='font-bold text-2xl dark:text-white'>Bitcoin</p>
                            </div>
                            <p className='bg-[#DADADA] text-sm py-0 px-2 rounded'>BTC</p>
                            <img src='/img/Group_151.png' className='h-8' alt='' />
                        </div>

                        <div className='mt-5 flex items-center gap-3'>
                            <p className='bg-[#F29D20] py-1 px-3 font-medium rounded'>Position n° 1</p>
                            <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded'>Monnaie</p>
                            <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded'>On 3,177,310 watchlists</p>
                        </div>

                        <div className='mt-5 flex items-center gap-3'>
                            <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded flex gap-2 items-center'>
                                <img src='/img/Vector_(1).png' className='h-4' alt='' />
                                bitcoin.org
                                <img src='/img/Group.png' className='h-4' alt='' />
                            </p>
                            <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded flex gap-2 items-center'>
                                <img src='/img/Vector_(2).png' className='h-4' alt='' />
                                Explorateurs
                                <img src='/img/Group.png' className='h-4' alt='' />
                            </p>
                            <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded flex gap-2 items-center'>
                                <img src='/img/Vector_(4).png' className='h-4' alt='' />
                                Communauté
                                <img src='/img/Group.png' className='h-4' alt='' />
                            </p>
                        </div>
                        <div className='mt-5 flex items-center gap-3 border-b border-gray-300 pb-5'>
                            <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded flex gap-2 items-center'>
                                <img src='/img/Vector_(5).png' className='h-4' alt='' />
                                Code source
                                <img src='/img/Group.png' className='h-4' alt='' />
                            </p>
                            <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded flex gap-2 items-center'>
                                <img src='/img/Vector_(6).png' className='h-4' alt='' />
                                Livre blanc
                                <img src='/img/Group.png' className='h-4' alt='' />
                            </p>
                        </div>
                        <div className='mt-4'>
                            <p className='text-2xl font-medium dark:text-white'>Tags:</p>

                            <div className='mt-5 flex items-center gap-3'>
                                <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded'>Mineable</p>
                                <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded'>Pow</p>
                                <p className='bg-[#E4E4E4] py-1 px-4 font-medium rounded'>SHA-256</p>
                                <p className='bg-[#FFE6C8] text-[#D47A09] py-1 px-4 font-medium rounded'>Tout Voir</p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='sm:w-1/2 bg-[#F5F5DC] rounded-bl-[40px] p-10 dark:bg-slate-200'>
                    <div className='flex justify-between max-w-[500px]'>
                        <div>
                            <p>Prix de Bitcoin (BTC)</p>
                            <p className='mt-2 text-4xl font-bold'>$28,332.86</p>
                        </div>
                        <div className='text-center'>
                            <p>14.68 ETH <span className='text-green-500 ml-3'>&#x2191; 0.22%</span> </p>
                            <div className='flex justify-end'>
                                <p className='mt-2 bg-red-600  text-white text-right py-1 px-3 text-2xl'>&#x2193; 2.57%</p>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-6 max-w-[500px] mt-7'>
                        <div className='bg-white p-4'>
                            <p className='font-Inter text-md text-[#636363]'>Cap. Marché</p>
                            <p className='font-Inter text-xl font-bold mt-3'>$539,542,376,610</p>
                            <p className='text-[#CD2824] font-medium mt-12'>&#x2193; 2.57%</p>
                        </div>
                        <div className='bg-white p-4'>
                            <p className='font-Inter text-md text-[#636363]'>Capitalisation boursière Fully Diluted</p>
                            <p className='font-Inter text-xl font-bold mt-3'>$594,990,161,408</p>
                            <p className='text-[#CD2824] font-medium mt-6'>&#x2193; 1.87%</p>
                        </div>
                        <div className='bg-white p-4'>
                            <p className='font-Inter text-md text-[#636363]'>Volume</p>
                            <p className='font-Inter text-xl font-bold mt-3'>$27,871,527,060</p>
                            <p className='text-[#CD2824] font-medium mt-2'>&#x2193; 1.87%</p>

                            <div className='flex justify-between mt-10'>
                                <p>Volume</p>
                                <p>0.05138</p>
                            </div>
                        </div>
                        <div className='bg-white p-4'>
                            <p className='font-Inter text-md text-[#636363]'>Offre en Circulation</p>
                            <p className='font-Inter text-xl font-bold mt-3'>19,042,987.00 BTC</p>
                            <div className='bg-[#E4E4E4] h-3 w-full mt-3 rounded-md'>
                                <div className='bg-[#C4C4C4] h-3 w-9/12 rounded-md'>
                                </div>
                            </div>
                            <p className='text-[#C4C4C4] text-right'>91%</p>

                            <div className='flex justify-between mt-2'>
                                <p>Offre Max</p>
                                <p>21,000,000</p>
                            </div>
                            <div className='flex justify-between mt-1'>
                                <p>Offre Total</p>
                                <p>19,042,987</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='max-w-[1600px] m-auto pt-20 dark:text-white'>
                <div className='flex justify-between'>
                    <p className='text-3xl font-bold'><span className='text-orange-500'>Bitcoin</span> Marchés</p>

                    {/* <div className='flex border border-[#C4C4C4] w-max rounded-3xl p-1 gap-5'>
                        <button className='rounded-3xl py-1 px-6 text-md font-medium' style={{background: 'linear-gradient(90deg, #D47A09 0%, #EBBF33 100%)'}}>Au comptant</button>
                        <button className='rounded-3xl py-1 px-6 text-md font-medium'>Au comptant</button>
                        <button className='rounded-3xl py-1 px-6 text-md font-medium'>Contrats à terme</button>
                    </div> */}
                </div>

                <div className='my-10 shadow-lg '>
                    <table className='pricing w-full text-center rounded-3xl '>
                        <thead className='bg-[#F0F0F2] dark:bg-slate-600'>
                            <tr>
                                <th>#</th>
                                <th>ADDED</th>
                                <th>NAME</th>
                                <th>NETWORK</th>
                                <th>PRICE (CHANGE)</th>
                                <th>MARKET CAP</th>
                                <th>VOLUME (24H)</th>
                            </tr>
                        </thead>
                        <tbody>
                        { isLoading && isLoading === true ? (
                            <tr>
                                <td colSpan={7} className='text-center w-full'>
                                    <div className='m-auto w-max'>
                                        <Bars heigth='100' width='100' color='orange' ariaLabel='loading-indicator' />
                                    </div>
                                </td>
                            </tr>) : ''
                        }
                        { tokenInfo && tokenInfo.map((item, index) =>
                            <tr key={ index } className='border-b font-medium'>
                                <td>{ item.isPaid === true ?
                                    <span className='flex justify-center text-green-600 text-xl'><FaFlag /></span> : ''
                                }</td>
                                <td>{ item.date.slice(0, 10) }</td>
                                <td className='flex gap-2 justify-center items-center'>
                                    <img className='mt-2' width={25} src={ '/img/tokens/' + item.tokenIcon } alt='' />
                                    <p className='mt-2'>{ item.tokenName + ' (' + item.tokenSymbol + ')' }</p>
                                </td>
                                <td><p className='bg-[#F29D20] px-3 py-1 w-max rounded-xl m-auto text-white'>{ item.chain.toUpperCase() }</p></td>
                                <td className='flex justify-center gap-4 items-center'>
                                    {item.percentChange1h > 0 ?
                                    <p className='bg-green-300 text-green-900 px-2 rounded mb-2'>{ item.percentChange1h.toFixed(2) }</p> :
                                    <p className='bg-red-300 text-red-900 px-2 rounded mb-2'>{ item.percentChange1h.toFixed(2) }</p>
                                    }
                                    <p className='mb-2'>${ item.price }</p>
                                </td>
                                <td>${ Math.round(item.marketCap) }</td>
                                <td>${ item.volume24h.toFixed(2) }</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='qutbg'>
                <div className='bg-black/60 py-10'>
                    <div className='n-container'>
                        <p className='text-white text-3xl py-10 text-center font-bold'>Qu’est-ce que ie Bitcoin <span className='text-orange-500'>(BTC)</span>?</p>
                        <p className='m-auto mt-1 text-white text-xl w-9/12 text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        <p className='m-auto mt-5 text-white text-xl w-9/12 text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        <div className='flex justify-center gap-5 mt-5 pb-5'>
                            <button className='py-1 px-5 rounded' style={{background: 'linear-gradient(90deg, #D47A09 0%, #D47A09 100%)'}}>Read More</button>
                            <button className='py-1 px-5 border border-white rounded text-white'>Download PDF</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-10 dark:bg-slate-800 dark:text-slate-200'>
                <div className='n-container'>
                    <p className='text-3xl font-bold'>Bitcoin Price Chart (BTC/EURO)</p>

                    <div className='grid justify-items-center mt-10 w-full h-auto'>
                        <MarketChart />
                    </div>
                </div>
            </div>

            {/* <div className='grid grid-cols-6 mt-10'>
                <div className='bg-[#355087] py-12 flex justify-center items-center'>
                    <img src='/img/Vector(1).png' alt='' />
                </div>
                <div className='bg-[#CD2824] py-12 flex justify-center items-center'>
                    <img src='/img/Vector(2).png' alt='' />
                </div>
                <div className='bg-[#0799D4] py-12 flex justify-center items-center'>
                    <img src='/img/Vector(3).png' alt='' />
                </div>
                <div className='bg-[#7146CB] py-12 flex justify-center items-center'>
                    <img src='/img/Vector(4).png' alt='' />
                </div>
                <div className='bg-[#E60019] py-12 flex justify-center items-center'>
                    <img src='/img/Vector(5).png' alt='' />
                </div>
                <div className='bg-[#32B8E8] py-12 flex justify-center items-center'>
                    <img src='/img/Vector(6).png' alt='' />
                </div>
            </div> */}

        </div>
    )
}

export default Pricing;
