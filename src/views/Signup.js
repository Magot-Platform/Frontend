import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { register } from '../actions/auth';
import { notify } from '../utils/notify';

function Signup({ register }) {
    let navigate = useNavigate();

    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = value => {
        setCountryOption(value);
        setCountry(value.label)
    }

    const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [password2, setPassword2] = useState(''),
        [countryOption, setCountryOption] = useState(''),
        [country, setCountry] = useState('');

    const onRegister = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            notify('warning', 'Please enter a password with 7 or more characters');
            return;
        }

        if (password !== password2) {
            notify('warning', 'Passwords do not match');
            return;
        } else {
            const res = await register({ name, email, country, password });

            notify(res.type, res.msg);

            if (res.type === 'success')
                navigate('/login');
        }
    };

    return (
        <div className='signup-bg'>
            <div className='bg-white/5 w-full h-full flex justify-center pt-10'>
                <div>
                    <img src='/img/logo.png' className='w-16 h-20 m-auto' alt='' />

                    <div className='bg-white rounded-3xl p-10 mt-10 w-[500px]'>
                        <p className='text-2xl font-medium'>Create Free Account</p>
                        <div className='mt-2'>
                            <p className='font-medium text-gray-400 mb-1'>Your best email</p>
                            <input 
                                type={'text'} 
                                placeholder='Your email' 
                                className='w-full p-1 outline-0 border border-gray-200 rounded-md' 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <p className='font-medium text-gray-400 mb-1'>Your first name</p>
                            <input 
                                type={'text'} 
                                placeholder='Used to create your referral coupon' 
                                className='w-full p-1 outline-0 border border-gray-200 rounded-md' 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <p className='font-medium text-gray-400 mb-1'>Country</p>
                            <Select 
                                className='w-full'
                                placeholder='Select Country'
                                options={options} 
                                value={countryOption} 
                                onChange={changeHandler} 
                            />
                        </div>
                        <div className='mt-2'>
                            <p className='font-medium text-gray-400 mb-1'>Password</p>
                            <input 
                                type={'password'} 
                                placeholder='*******' 
                                className='w-full p-1 outline-0 border border-gray-200 rounded-md' 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <p className='font-medium text-gray-400 mb-1'>Confirm Password</p>
                            <input 
                                type={'password'} 
                                placeholder='*******' 
                                className='w-full p-1 outline-0 border border-gray-200 rounded-md' 
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                        <div className='mt-5'>
                            <button 
                                className='w-full py-2 bg-yellow-500 hover:bg-yellow-700 font-medium text-white'
                                onClick={onRegister}
                            > Create Account
                            </button>
                            <Link to='/login'><p className='text-[#DC9217] text-center mt-5 cursor-pointer'>Already Have Account?</p></Link>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Signup);