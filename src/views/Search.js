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
import DataTable from 'react-data-table-component';

// Search Items
import Marketcap from '../components/dropdown/Marketcap';
import Supply from '../components/dropdown/Supply';
import Day from '../components/dropdown/Day';
import Volume from '../components/dropdown/Volume';
import Change from '../components/dropdown/Change';
import Holders from '../components/dropdown/Holders';
import LaunchDay from '../components/dropdown/LaunchDay';
import { Sparklines, SparklinesLine } from 'react-sparklines';

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

const customStyles = {
    rows: {
        style: {
            fontSize: '14px',
        },
    },
    headCells: {
        style: {
            fontSize: '16px',
            justifyContent: 'center',
        },
    },
    cells: {
        style: {
            width: 'auto',
        },
    },
};

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

    const columns = [
        {
            name: '#',
            cell: (row) => {
                return (row.isPaid === true ?
                    <span className='flex justify-center text-green-600 text-xl w-auto'><FaFlag /></span> : ''
                )
            },
            width: '50px',
            sortable: true
        },
        {
            name: 'Added',
            selector: row=>row.date.slice(0, 10),
            cell: (row) => {
                return (
                    <div className='w-[100p]'>{ row.date.slice(0, 10) }</div>
                )
            },
            sortable: true
        },
        {
            name: 'Name',
            selector: row => row.tokenName,
            cell: (row) => {
                return (
                    <div className='flex gap-2 justify-center items-center'>
                        <img className='mt-2' width={25} src={ '/img/tokens/' + row.tokenIcon } alt='' />
                        <p className='mt-2'>{ row.tokenName + ' (' + row.tokenSymbol + ')' }</p>
                    </div>
                )
            },
            grow: 1.5,
            sortable: true
        },
        {
            name: 'Chain',
            selector: row => row.chain,
            cell: (row) => {
                return (
                    <p className='bg-[#F29D20] px-3 py-1 w-max rounded-xl m-auto text-white'>{ row.chain.toUpperCase() }</p>
                )
            },
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            cell: (row) => {
                return (
                    '$' + row.price
                )
            },
            grow: 2,
            sortable: true
        },
        {
            name: '24h %',
            selector: row => row.percentChange24h,
            cell: (row) => {
                return ( row.percentChange24h > 0 ?
                    <p className='bg-green-300 text-green-900 rounded p-1'>{ row.percentChange24h.toFixed(2) } %</p> :
                    <p className='bg-red-300 text-red-900 rounded p-1'>{ row.percentChange24h.toFixed(2) } %</p>
                )
            },
            sortable: true
        },
        {
            name: '7d %',
            selector: row => row.percentChange7d,
            cell: (row) => {
                return ( row.percentChange7d > 0 ?
                    <p className='bg-green-300 text-green-900 rounded p-1'>{ row.percentChange7d.toFixed(2) } %</p> :
                    <p className='bg-red-300 text-red-900 rounded p-1'>{ row.percentChange7d.toFixed(2) } %</p>
                )
            },
            sortable: true
        },
        {
            name: 'Market Cap',
            selector: row => row.marketCap,
            cell: (row) => {
                return (
                    <p>${ Math.round(row.marketCap) }</p>
                )
            },
            grow: 1.5,
            sortable: true
        },
        {
            name: 'Volume (24h)',
            selector: row => row.volume24h,
            cell: (row) => {
                return (
                    <p>${ row.volume24h.toFixed(2) }</p>
                )
            },
            grow: 1.5,
            sortable: true
        },
        {
            name: 'Circulating Supply',
            selector: row => row.totalSupply,
            cell: (row) => {
                return (
                    <div>${ row.totalSupply } <p className='text-slate-500'>{ Math.round(row.totalSupply/row.price) } { row.tokenSymbol }</p></div>
                )
            },
            grow: 2.5,
            sortable: true
        },
        {
            name: 'Last 7 Days',
            cell: (row) => {
                return (
                    <Sparklines data={row.chartInfo}>
                        <SparklinesLine style={{ fill: 'none' }} color='black' />
                    </Sparklines>
                )
            },
            grow: 1.5,
            sortable: true,
            ignoreRowClick: true,
        },
    ];

    let navigate = useNavigate();

    const [tokenInfo, setTokenInfo] = useState([]),
        [searchRes, setSearchRes] = useState([]),
        [chartInfo, setChartInfo] = useState([]);

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
                    <DataTable
                        columns={columns}
                        pagination
                        noDataComponent={
                            <div className='text-center w-full'>
                                <span className='font-medium text-lg'>There is no result.</span>
                            </div>
                        }
                        data={
                            searchRes && searchRes.map((item, index) => {
                            return {
                                id: index,
                                'isPaid': item.isPaid,
                                'chain': item.chain,
                                'date': item.date,
                                'tokenIcon': item.tokenIcon,
                                'tokenName': item.tokenName,
                                'tokenSymbol': item.tokenSymbol,
                                'price': item.price,
                                'percentChange24h': item.percentChange24h,
                                'percentChange7d': item.percentChange7d,
                                'marketCap': item.marketCap,
                                'volume24h': item.volume24h,
                                'totalSupply': item.totalSupply,
                                'chartInfo': chartInfo[index]?.chart,
                                'tokenAddress': item.tokenAddress
                            }
                            })
                        }
                        customStyles={customStyles}
                        progressPending={isLoading}
                        progressComponent={
                            <div className='m-auto w-max'>
                                <Bars heigth='100' width='100' color='orange' ariaLabel='loading-indicator' />
                            </div>
                        }
                        onRowClicked={(row) => next(row.chain, row.tokenAddress)}
                    />
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
