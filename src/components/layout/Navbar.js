import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';
import ConnectButton from '../../components/connect';
// import ListToken from './../../components/section/ListToken';
import { notify } from '../../utils/notify';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from '@material-tailwind/react';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineSetting } from 'react-icons/ai';
import UserImage from '../../images/user.png';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from '../../hook/useDarkSide';
import LanguageSelector from '../containers/LanguageSelector';
import { Text } from '../../Text';

const Navbar = ({ isAuthenticated, logout, user }) => {
    let navigate = useNavigate();

    const [isShow, toggleModal] = useState(false);
    // const [isListModalShow, setListModalShow] = useState(false);
    const [colorTheme, setTheme] = useDarkSide();
    const [isDarkMode, setDarkMode] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkMode(checked);
    };

    const onLogout = async () => {
        await logout();
        navigate('/');
    }

    return (
        <div className='bg-white py-5 z-20 dark:bg-slate-800' >
            <div className='n-container'>
                <div className='flex justify-between items-center'>
                    <Link to={'/'}>
                        <div className='flex items-center gap-2'>
                            <img src='/logo.png' alt='logo' className='h-12 sm:h-16' />
                        </div>
                    </Link>

                    <div className='hidden sm:flex items-center gap-5'>
                        <DarkModeSwitch
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            size={25}
                        />
                        <div className='flex font-bold text-slate-800 hover:text-slate-400 gap-2 dark:text-white dark:bg-slate-800'>
                            <LanguageSelector />
                        </div>

                        {/* <p className='cursor-pointer font-bold text-slate-800 hover:text-slate-400'
                            data-modal-toggle='defaultModal'
                            onClick={() => setListModalShow(true)}
                        >List Token</p> */}

                        <Link to='/price' className='font-bold text-slate-800 hover:text-slate-400 dark:text-white dark:hover:text-slate-200'><p><Text tid='price' /></p></Link>
                        { isAuthenticated && isAuthenticated === true ?
                        <>
                            <ConnectButton />
                            <button
                                onClick={() => {
                                    if(!isAuthenticated) {
                                        notify('warning', 'Please login first');
                                        navigate('/login')
                                    } else {
                                        navigate('/search')
                                    }
                                }}
                                className='py-2 px-5 rounded text-white font-bold bg-yellow-500 hover:bg-yellow-700'
                            >
                                <Text tid='appSearch' />
                            </button>
                        </> : ''}

                        { isAuthenticated && isAuthenticated === true ?
                        (<Menu placement='bottom-start'>
                            <MenuHandler>
                                <button className='flex justfy-between py-2 px-3 rounded text-black font-bold hover:text-slate-500 gap-2 dark:text-white dark:hover:text-slate-200'>
                                    <img width='25' className='rounded-full' src={user && user?.avatar ? `/img/avatars/${user.avatar}` : UserImage} alt='' />{user && user.name}
                                </button>
                            </MenuHandler>
                            <MenuList className='dark:bg-slate-600 border-none'>
                                <MenuItem className='mb-3'>
                                    <button
                                        className='text-slate-800 hover:text-slate-400 rounded font-bold dark:text-white dark:hover:text-slate-200'
                                        onClick={onLogout}
                                    >
                                        <span className='flex justify-between gap-3'><BiLogOut className='text-2xl'/>Log out</span>
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <a className='text-slate-800 hover:text-slate-400 rounded font-bold dark:text-white dark:hover:text-slate-200'
                                        href='/setting'
                                    ><span className='flex justify-between gap-2'><AiOutlineSetting className='text-2xl'/><Text tid='setting' /></span></a>
                                </MenuItem>
                            </MenuList>
                        </Menu>) :
                        (<Link
                            to='/login'
                            className='border border-[#D6800C] bg-white text-[#D6800C] rounded py-2 px-3 font-bold hover:bg-yellow-500 hover:border-white'
                        >
                            <p><Text tid='Login' /></p>
                        </Link>)}
                    </div>

                    <p className='none sm:hidden text-black pointer' onClick={() => toggleModal(true)} >&#9776;</p>
                </div>
            </div>

            <div className={`${ isShow ? '' : 'hidden' } bg-white  font-bold absolute left-0 top-0 w-full`}>
                <p className='none sm:hidden text-black text-right pointer m-5 mt-5' onClick={() => toggleModal(false)} >&#9776;</p>
                <div className='text-lg text-center mt-12'>
                    {/* <p className='cursor-pointer font-bold text-slate-800 hover:text-slate-400' data-modal-toggle='defaultModal' onClick={() => setListModalShow(true)}>List Token</p>                             */}
                    <Link to='/price' className='font-bold text-slate-800 hover:text-slate-400'><p><Text tid='price' /></p></Link>
                    { isAuthenticated && isAuthenticated === true ? <ConnectButton /> : ''}
                    <button className='font-bold text-slate-800 hover:text-slate-400'
                        onClick={() => {
                            if(!isAuthenticated) {
                                notify('warning', 'Please login first');
                                navigate('/login')
                            } else {
                                navigate('/search')
                            }
                        }}
                    >App Search</button>
                    { isAuthenticated && isAuthenticated === true ? (
                    <Menu>
                        <MenuHandler>
                            <div className='flex justfy-between py-2 px-5 rounded text-black font-bold hover:text-slate-500'
                            ><span className='mt-1 mr-2'><FaRegUserCircle /></span>{user && user.name}</div>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className='mt-2'>
                                <button
                                    className='py-2 px-5 rounded text-slate-800 hover:text-slate-400 font-bold'
                                    onClick={onLogout}
                                >
                                    <p>LOG OUT</p>
                                </button>
                            </MenuItem>
                        </MenuList>
                    </Menu>) : (
                    <Link
                        to='/login'
                        className='font-bold hover:bg-yellow-500 hover:border-white'
                    >
                        <p>Login</p>
                    </Link>
                )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    wallet: state.wallet.wallet,
    user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);