import React, {useEffect, useState} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../utils/api';
import { getTokenBalance } from '../utils/token';
import { notify } from '../utils/notify';
import { Bars } from 'react-loader-spinner';
import { BiSearchAlt } from 'react-icons/bi';
import { FaFlag } from 'react-icons/fa';
// Search Items
import Marketcap from '../components/dropdown/Marketcap';
import Supply from '../components/dropdown/Supply';
import Day from '../components/dropdown/Day';
import Volume from '../components/dropdown/Volume';
import Change from '../components/dropdown/Change';
import Holders from '../components/dropdown/Holders';
import LaunchDay from '../components/dropdown/LaunchDay';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import useDarkSide from '../hook/useDarkSide';

const chainOptions = [
    { key: 'Ethereum', cat: 'eth' },
    { key: 'Optimism', cat: 'optimism' },
    { key: 'BSC', cat: 'bsc' },
    { key: 'Polygon', cat: 'polygon' },
    { key: 'Fantom', cat: 'fantom' },
    { key: 'Arbitrum', cat: 'arbitrum' },
    { key: 'Celo', cat: 'celo' },
    { key: 'Avalanche', cat: 'avalanche' },
];

const SearchCrypto = ({user, wallet}) => {
    const [isLoading, setLoading] = useState(false);

    const [chains, setChain] = useState([]),
        [marketcap, setMarketcap] = useState([]),
        [volume, setVolume] = useState([]),
        [day, setDay] = useState([]),
        [changePercent, setChangePercent] = useState([]),
        [supply, setSupply] = useState([]),
        [category, setCategory] = useState(0),
        [holder, setHolder] = useState(0);

    let navigate = useNavigate();

    const [tokenInfo, setTokenInfo] = useState([]),
        [searchRes, setSearchRes] = useState([]),
        [chartInfo, setChartInfo] = useState([]);

    const [colorTheme] = useDarkSide();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const res = await api.get('/tokens/list');
            const data = await res.data;
            setTokenInfo(data);
            setSearchRes(data);

            setLoading(false);
        }

        getData();
    }, []);

    useEffect(() => {
        const getChartData = async () => {
            const res = await api.get('/tokens/chart');
            const data = await res.data;
            setChartInfo(data);
        }

        getChartData();
    }, []);

    const next = async(chain, contractAddress) => {
        if (user.membership > 0 ) {
            navigate(`/token/${chain}/${contractAddress}`);
        } else {
            if (user.membership === 0) {
                notify('error', `You can't access. Upgrade your membership`);
                return;
            }

            const res = await getTokenBalance(chain, wallet, contractAddress);

            if (parseInt(res.result) > 0) {
                navigate(`/token/${chain}/${contractAddress}`);
            } else {
                notify('warning', 'You have no membership and token \n Please upgrade your membership or purchase token for this action')
            }
        }
    }

    const onSearch = () => {
        if (user.membership === 0) {
            notify('warning', 'Action Denied! \n Please upgrade your membership');
            return;
        }

        const _searchRes = [];

        tokenInfo.map((item, index) => {
            let _marketcap = Math.round(item.marketCap),
                _supply = item.totalSupply,
                _volume = Math.round(item.volume24h);

            if (chains.length > 0) {
                for (var i = 0; i < chains.length; i++)
                    if(item.chain === chains[i]) {
                        _searchRes.push(item);
                    }
            }
            if (volume && volume.length > 0 && volume[1] === 1000) {
                if(_volume > volume[0]) {
                    _searchRes.push(item);
                }
            } else if(volume && volume.length > 0 && _volume >= volume[0] && _volume <= volume[1]) {
                _searchRes.push(item);
            }
            if (marketcap && marketcap.length > 0 && marketcap[1] === 1000) {
                if(_marketcap > marketcap[0]) {
                    _searchRes.push(item);
                }
            } else if(marketcap && marketcap.length > 0 && _marketcap >= marketcap[0] && _marketcap <= marketcap[1]) {
                _searchRes.push(item);
            }
            if (supply && supply.length > 0 && supply[1] === 1000) {
                if(_supply > supply[0]) {
                    _searchRes.push(item);
                }
            } else if(supply && supply.length > 0 && _supply >= supply[0] && _supply <= supply[1]) {
                _searchRes.push(item);
            }
        });

        setSearchRes(_searchRes);
    }

    const changeChainList = (item) => {
        const _chains = [...chains];

        _chains.push(item.cat);
        setChain(_chains);
    }

    const onClearAll = () => {
        setChain([]);
        setVolume([]);
        setMarketcap([]);
        setSupply([]);
        setSearchRes(tokenInfo);
    }

    return (
        <div className='dark:bg-slate-800'>
            <div className='search_bg'>
                <div className='bg-black/50 py-10'>
                    <div className='n-container'>
                        <p className='text-white text-3xl font-bold text-center mt-10'>Search for ads</p>

                        {/* <input type={'text'} placeholder='Search' className='outline-0 mt-5 border-b border-white w-full bg-transparent text-2xl px-2 text-white' /> */}
                        <div className='grid'>
                            <div className='mt-4 flex'>
                                <span className='py-2 w-36 bg-transparent text-white text-xl'>Chain List :</span>
                                <Multiselect
                                    className='w-full bg-transparent text-white outline-0 border-b text-xl'
                                    displayValue='key'
                                    // onKeyPressFn={function noRefCheck(){}}
                                    onRemove={function noRefCheck(){}}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={(list, item) => changeChainList(item)}
                                    options={chainOptions}
                                    style={{
                                        chips: {
                                            background: '#9b9b9b'
                                        },
                                        multiselectContainer: {
                                            color: '#4c4c4c'
                                        },
                                        searchBox: {
                                            border: 'none',
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-6'>
                            <div className='mt-4 flex'>
                                <span className='py-2 w-3/5 bg-transparent text-white outline-0 border-b text-xl'>MarketCap :</span>
                                <Marketcap
                                    onChange={(v) => setMarketcap(v)}
                                />
                            </div>
                            <div className='mt-4 flex'>
                                <span className='py-2 w-3/5 bg-transparent text-white outline-0 border-b text-xl'>Volume :</span>
                                <Volume
                                    onChange={(v) => setVolume(v)}
                                />
                            </div>
                            <div className='mt-4 flex'>
                                <span className='py-2 w-3/5 bg-transparent text-white outline-0 border-b text-xl'>Day :</span>
                                <Day
                                    onChange={(v) => setDay(v)}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-6 mt-4'>
                            <div className='flex'>
                                <span className='py-2 w-3/5 bg-transparent text-white outline-0 border-b text-xl'>% Change :</span>
                                <Change
                                    onChange={(v) => setChangePercent(v)}
                                />
                            </div>
                            <div className='flex '>
                                <span className='py-2 w-3/5 bg-transparent text-white outline-0 border-b text-xl'>Launch Date :</span>
                                <LaunchDay />
                            </div>
                            <div className='flex'>
                                <span className='py-2 w-3/5 bg-transparent text-white outline-0 border-b text-xl'>Supply :</span>
                                <Supply
                                    onChange={(v) => setSupply(v)}
                                />
                            </div>

                            {/* <div className='flex'>
                                <span className='py-2 w-full bg-transparent text-white outline-0 border-b text-xl'>Category :</span>
                                <select
                                    className='py-2 w-full bg-transparent text-white outline-0 border-b text-xl'
                                    name='category'
                                    onClick={changeItems}
                                >
                                    <option defaultValue={''}></option>
                                    <option className='py-2 my-2 text-black'>Category</option>
                                    <option className='py-2 my-2 text-black'>Volume1</option>
                                </select>
                            </div> */}
                        </div>
                        <div className='grid grid-cols-3 gap-6 mt-4'>
                        </div>

                        <div className='mt-9 flex justify-between'>
                            <button
                                className='bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded'
                                onClick={onClearAll}
                            >
                                &#x2715; Clear All
                            </button>
                            <div className='flex justify-end'>
                                <button
                                    className='bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded'
                                    onClick={onSearch}
                                >
                                    <span className='flex items-center'>
                                        <BiSearchAlt className='mr-2'/>Search
                                    </span>
                                </button>
                            </div>
                            {/* <div className='flex w-1/3 justify-end gap-3'>
                                <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded w-full'>Save Current Search</button>

                                <select className='py-2 w-full bg-transparent text-white outline-0 border-b text-xl'>
                                    <option className='py-2 my-2 text-black'>Select Search </option>
                                    <option className='py-2 my-2 text-black'>Volume1</option>
                                </select>
                            </div> */}
                        </div>
                        <div className='mt-4 flex flex-wrap'>
                        {/* {liquidity == 0 ? '' : (
                            <div className={`mr-3 inline leading-6 mt-3`}>
                                <p className='w-full outline-1 border-slate-500 rounded-lg bg-slate-100 text-slate-600 py-1 px-4'>
                                {liquidity == 100 ? 'Liquidity: 0 ~ 100' :
                                ( liquidity == -1 ?
                                    'Liquidity: All Scope' :
                                    ('Liquidity: ' + String(liquidity/10000) + 'K' + ' ~ ' + String(liquidity/1000) + 'K')
                                )}
                                    <button
                                        className='text-black font-medium hover:text-slate-300 ml-2'
                                        onClick={() => {deleteItem(1, 'liquidity')}}
                                    >&#x2715;</button>
                                </p>
                            </div>
                        )} */}
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-[1600px] m-auto pt-20'>
                <div className='shadow-lg py-10 border-none'>
                    <table className='pricing w-full text-center rounded-3xl dark:text-slate-200'>
                        <thead className='bg-[#F0F0F2] dark:bg-slate-600'>
                            <tr>
                                <th>#</th>
                                <th>Added</th>
                                <th>Name</th>
                                <th>Network</th>
                                <th>Price</th>
                                <th>24h %</th>
                                <th>7d %</th>
                                <th>Market Cap</th>
                                <th>Volume (24h)</th>
                                <th>Circulating Supply</th>
                                <th>Last 7 Days</th>
                            </tr>
                        </thead>
                        <tbody>
                        { isLoading && isLoading === true ? (
                            <tr>
                                <td colSpan={11} className='text-center w-full'>
                                    <div className='m-auto w-max'>
                                    <Bars heigth='100' width='100' color='orange' ariaLabel='loading-indicator' />
                                    </div>
                                </td>
                            </tr>) : ''
                        }
                        { searchRes && searchRes.length > 0 ? searchRes.map((item, index) =>
                            <tr key={ index } className='border-b font-medium' onClick={() => next(item.chain, item.tokenAddress)}>
                                <td>{ item.isPaid === true ?
                                    <span className='flex justify-center text-green-600 text-xl'><FaFlag /></span> : ''
                                }</td>
                                <td>{ item.date.slice(0, 10) }</td>
                                <td className='flex gap-2 justify-center items-center'>
                                    <img className='mt-2' width={25} src={ '/img/tokens/' + item.tokenIcon } alt='' />
                                    <p className='mt-2'>{ item.tokenName + ' (' + item.tokenSymbol + ')' }</p>
                                </td>
                                <td><p className='bg-[#F29D20] px-3 py-1 w-max rounded-xl m-auto text-white'>{ item.chain.toUpperCase() }</p></td>
                                <td><p>${ item.price }</p></td>
                                <td>
                                { item.percentChange24h > 0 ?
                                    <p className='bg-green-300 text-green-900 rounded'>{ item.percentChange24h.toFixed(2) } %</p> :
                                    <p className='bg-red-300 text-red-900 rounded'>{ item.percentChange24h.toFixed(2) } %</p>
                                }
                                </td>
                                <td>
                                { item.percentChange7d > 0 ?
                                    <p className='bg-green-300 text-green-900 rounded'>{ item.percentChange7d.toFixed(2) } %</p> :
                                    <p className='bg-red-300 text-red-900 rounded'>{ item.percentChange7d.toFixed(2) } %</p>
                                }
                                </td>
                                <td>${ Math.round(item.marketCap) }</td>
                                <td>${ item.volume24h.toFixed(2) }</td>
                                <td>${ item.totalSupply } <p className='text-slate-500'>{ Math.round(item.totalSupply/item.price) } { item.tokenSymbol }</p></td>
                                <td>
                                    <Sparklines data={chartInfo && chartInfo[index]?.chart}>
                                        <SparklinesLine style={{ fill: 'none' }} color='black' />
                                    </Sparklines>
                                </td>
                            </tr>
                        ) : ( !isLoading && (
                            <tr>
                                <td colSpan={11} className='text-center w-full'>
                                    <span className='font-bold text-xl'>There are no results</span>
                                </td>
                            </tr>)
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    wallet: state.wallet.wallet
});

export default connect(mapStateToProps)(SearchCrypto);
