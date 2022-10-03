import { useState } from 'react';
import { connect } from 'react-redux';
import { notify } from '../utils/notify';
import {
  MAGOT_TOKEN_ADDRESS,
  MEMBERSHIP_ADDRESS,
  STARTER_MEMBERSHIP,
  PREMIUM_MEMBERSHIP
} from '../config';
import ABI from '../contracts/magot_token_abi.json';
import Payment from '../components/section/Payment';
import ListToken from '../components/section/ListToken';

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { updateMembership } from '../actions/auth';
import { FaCheck } from 'react-icons/fa';
import { TiCancel, TiInfoOutline } from 'react-icons/ti';

const Home = ({ isAuthenticated, user, wallet, updateMembership }) => {
  const [open, setOpen] = useState(0);
  const [selectedMembership, setSelectedMembership] = useState(0);
  const [isShowModal, setShowModal] = useState(false);
  const [isListModalShow, setListModalShow] = useState(false);
  const [isAnnual, setAnnual] = useState(false);

  const AnnualClass = isAnnual === true ? 'rounded-3xl py-2 px-6 bg-yellow-500 text-md font-medium' : 'rounded-3xl py-2 px-6 text-md font-medium';
  const MonthlyClass = isAnnual === false ? 'rounded-3xl py-2 px-6 bg-yellow-500 text-md font-medium' : 'rounded-3xl py-2 px-6 text-md font-medium';

  const membership = isAnnual === false ? [0, 49, 99] : [0, 499, 999];

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const onFreeMembership = async (membership) => {
    if ( isAuthenticated === false ) {
      notify('error', 'First, You Must Login');
      return;
    }

    try {
      await updateMembership(membership)
    } catch (err) {
      notify('warning', 'Your action is cancelled');
    }
  }

  return (
    <div className='dark:bg-slate-800 dark:text-white'>
      <div className='dark:bg-slate-800'>

        <div className='n-container'>
          <div className='sm:flex justify-between items-center'>
            <div className='sm:w-1/2'>
              <p className='text-4xl text-yellow-500 font-bold'>Invest the right token</p>
              <p className='text-4xl text-black font-bold dark:text-white'>at the best time and make more profits.</p>
              <p className='mt-5'>Magot analyses all online cryptocurrencies to help you find the best project to invest in, and the best metrics in your favorite blockchain  in just a few clicks.</p>
              <button className='text-slate-1000 bg-yellow-500 rounded px-5 py-2 mt-3 text-lg font-medium hover:bg-yellow-400'
                onClick={() => setListModalShow(true)}
              >Start</button>
              <ListToken isShow={isListModalShow} setShow={setListModalShow} />
            </div>
            <div className='sm:w-1/2 sm:-mr-20 mt-10 sm:mt-0'>
              <img src='/img/kindpng_28773751.png' className='dark:grayscale-[70%]' alt='' />
            </div>
          </div>
        </div>

        <div className='n-container'>
          <div className='sm:flex justify-between items-center mt-10'>
            <div className='bg-yellow-100 rounded-[40px] sm:w-1/2 py-6 sm:py-12 pr-9 dark:bg-slate-300'>
              <div className='-ml-20 relative max-w-[400px] dark:grayscale-[70%]'>
                <img src='/img/shutterstock_735743386.png' alt='' />
                <img src='/img/Vector.png' className='absolute top-1/3 left-[40%] w-20' alt='' />
              </div>
            </div>
            <div className='sm:-ml-20 sm:w-2/3'>
              <p className='text-2xl font-medium'>“ <span className='text-yellow-500'>Magot is simply the perfect tool for crypto research</span> and the best investment you can make in your e-commerce business to access the last token in growthing and safing. “</p>
              <div className='mt-10 flex items-center gap-4'>
                <img src='/img/Ellipse1.png' alt='' className='rouned-full h-20 dark:grayscale-[70%]' />
                <div>
                  <p className='font-medium text-2xl'>John Doe</p>
                  <p className=''>721k on Youtube</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='n-container'>
          <div className='sm:flex justify-between items-center mt-10'>
            <div className='sm:w-1/2'>
              <p className='font-Poppins font-bold text-4xl leading-10 text-black dark:text-white'>Magot analysis, you make the <span className='text-yellow-500'>best decision.</span></p>
              <p className='mt-4 text-[#636363] font-Inter font-normal text-lg dark:text-slate-400'>Magot helps you to find the right token at the best time. It allows you to focus on your strategy. </p>
              <div className='mt-7'>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='flex gap-3'>
                    <p className='font-Poppins font-bold text-3xl text-black dark:text-white'>01</p>
                    <p className='text-[#636363] font-Inter font-normal text-md leading-5 text-justify dark:text-slate-400'>Magot selects high potential crypto in 2 clicks. Stop spending TIME scrolling through Twitter and take action with Magot. </p>
                  </div>
                  <div className='flex gap-3'>
                    <p className='font-Poppins font-bold text-3xl text-black dark:text-white'>02</p>
                    <p className='text-[#636363] font-Inter font-normal text-md leading-5 text-justify dark:text-slate-400'>With a strong experience in the Blockchain, Magot's teams provide you with key statistics that will allow you to make the best decision on the choice of your crypto.</p>
                  </div>
                  <div className='flex gap-3'>
                    <p className='font-Poppins font-bold text-3xl text-black dark:text-white'>03</p>
                    <p className='text-[#636363] font-Inter font-normal text-md leading-5 text-justify dark:text-slate-400'>Magot allows you to find tokens in growthing in the main blockchain Ethereum, Binance Smart Chain, Avalanche, Polygon… </p>
                  </div>
                  <div className='flex gap-3'>
                    <p className='font-Poppins font-bold text-3xl text-black dark:text-white'>04</p>
                    <p className='text-[#636363] font-Inter font-normal text-md leading-5 text-justify dark:text-slate-400'>Through our POWERFUL search engine, you will find new or growing projects. This will help you in decision making.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='sm:block hidden sm:w-1/2 md:-mr-20'>
              <img src='/img/Rectangle181.png' className='dark:grayscale-[70%]' alt='' />
            </div>
          </div>
        </div>

        <div className='n-container'>
          <div className='mt-20'>
            <div className='flex border border-[#C4C4C4] w-max m-auto rounded-3xl p-1 gap-5'>
              <button className={MonthlyClass} onClick={() => setAnnual(!isAnnual)} >Monthly</button>
              <button className={AnnualClass} onClick={() => setAnnual(!isAnnual)} >Annual</button>
            </div>
          </div>

          <div className='mt-10 sm:grid grid-cols-4 gap-4 items-end'>
            <div className='pb-6'>
              <p>Research credits</p>
              <p>Facebook Ads</p>
              <p>Influencer placements</p>
              <p>Snapchat Ads (coming soon)</p>
              <p>Details of ads and placements</p>
              <p>Advanced Filters</p>
              <p>Chrome Extension</p>
              <p>Tiktok Ads</p>
              <p>Pinterest Ads</p>
              <p>Shop analysis</p>
            </div>

            <div className='rounded-xl p-6 text-center bg-[#F5F5DC] dark:bg-slate-200 dark:text-slate-400'>
              <p className='font-Poppins font-bold text-4xl text-yellow-500 mt-2'>Free</p>
              <p className='text-2xl font-bold mt-2'>{membership[0]} $ <span className='text-sm font-thin'>{isAnnual === false ? '/ month' : '/ year'}</span></p>
              <p className='mt-3 font-Poppins font-medium text-md text-[#636363] dark:text-slate-400'>Without <br/>commitment</p>
              <button
                className='rounded-3xl py-1 px-6 mt-5 font-medium text-md text-slate-100 bg-yellow-500 hover:bg-yellow-700'
                onClick={ () => { setSelectedMembership(0); setShowModal(true); }}
                disabled={ (user && user.membership === 0) ? 'disabled' : '' }
              >
                { user && user.membership === 0 ? 'Current Plan' :'Join Magot' }
              </button>
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <p className='mt-2 font-black text-xl'>-</p>
              <p className='font-black text-xl'>-</p>
              <p className='font-black text-xl'>-</p>
            </div>

            <div className='rounded-xl shadow-xl p-6 text-center dark:text-slate-400'>
              <p className='rounded-lg p-1' style={{background: 'linear-gradient(90deg, rgba(212, 122, 9, 0.2) 0%, rgba(235, 191, 51, 0.2) 100%)' }}>Popular</p>
              <p className='font-Poppins font-bold text-4xl text-yellow-500 mt-2'>Starter</p>
              <p className='text-2xl font-bold mt-2'>{membership[1]} $ <span className='text-sm font-thin'>{isAnnual === false ? '/ month' : '/ year'}</span></p>
              <p className='mt-3 font-Poppins font-medium text-md text-[#636363] dark:text-slate-400'>Without <br/>commitment</p>
              <button
                className='rounded-3xl py-1 px-6 mt-5 font-medium text-md text-slate-100 bg-yellow-500 hover:bg-yellow-700'
                onClick={ () => { setSelectedMembership(1); setShowModal(true); }}
                disabled={ (user && user.membership === 1) ? 'disabled' : '' }
              >
                { user && user.membership === 1 ? 'Current Plan' :'Join Magot' }
              </button>
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <p className='mt-2 font-black text-xl'>-</p>
              <p className='font-black text-xl'>-</p>
              <p className='font-black text-xl'>-</p>
            </div>

            <div className='rounded-xl p-6 text-center bg-[#F5F5DC] dark:text-slate-400 dark:bg-slate-200'>
              <p className='font-Poppins font-bold text-4xl text-yellow-500 mt-2'>Premium </p>
              <p className='text-2xl font-bold mt-2'>{membership[2]} $ <span className='text-sm font-thin'>{isAnnual === false ? '/ month' : '/ year'}</span></p>
              <p className='mt-3 font-Poppins font-medium text-md text-[#636363] dark:text-slate-400'>Without <br/>commitment</p>
              <button
                className='rounded-3xl py-1 px-6 mt-5 font-medium text-md text-white bg-yellow-500 hover:bg-yellow-700'
                onClick={() => {setSelectedMembership(2); setShowModal(true); }}
                disabled={ (user && user.membership === 2) ? 'disabled' : '' }
              >
                { user && user.membership === 2 ? 'Current Plan' :'Join Magot' }
              </button>
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <img className='m-auto mt-4 w-4 dark:grayscale-[70%]' src='/img/confirm.png' alt='' />
              <p className='mt-2 font-black text-xl'>-</p>
              <p className='font-black text-xl'>-</p>
              <p className='font-black text-xl'>-</p>
            </div>
          </div>
        </div>

        <div className='mt-10 pt-16 pb-5 dark:grayscale' style={{background: 'linear-gradient(180deg, #010101 0%, #2F2B27 100%)'}}>
          <p className='text-center text-white text-4xl'> - Happy Clients -</p>
          <div className='cient_bg py-10 mt-10 dark:text-slate-600'>
            <div className='n-container'>
              <div className=' sm:grid grid-cols-3 gap-10'>
                <div className='bg-white p-6 text-center'>
                  <img className='m-auto mb-5 dark:grayscale-[70%]' src='/img/Group-85.png' alt='' />
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                  <img src='/img/Ellipse10.png' className='m-auto mt-5 border-4 border-[#D47A09] rounded-full dark:grayscale-[70%]' alt='' />
                  <p className='mt-2 font-Inter font-medium text-lg text-[#001029]'>John Smithy</p>
                  <p >Manager</p>
                </div>
                <div className='bg-white p-6 text-center'>
                  <img className='m-auto mb-5 dark:grayscale-[70%]' src='/img/Group-85.png' alt='' />
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                  <img src='/img/Ellipse10.png' className='m-auto mt-5 border-4 border-[#D47A09] rounded-full dark:grayscale-[70%]' alt='' />
                  <p className='mt-2 font-Inter font-medium text-lg text-[#001029]'>John Smithy</p>
                  <p >Manager</p>
                </div>
                <div className='bg-white p-6 text-center'>
                  <img className='m-auto mb-5 dark:grayscale-[70%]' src='/img/Group-85.png' alt='' />
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                  <img src='/img/Ellipse10.png' className='m-auto mt-5 border-4 border-yellow-500 rounded-full dark:grayscale-[70%]' alt='' />
                  <p className='mt-2 font-Inter font-medium text-lg text-[#001029]'>John Smithy</p>
                  <p >Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='n-container py-10 dark:text-slate-600'>
          <p className='text-center font-Poppins text-4xl font-bold dark:text-white'>Frequently Asked <span className='text-amber-600'>Questions</span></p>

          <Accordion open={open === 1} onClick={() => handleOpen(1)} className='mt-10 bg-[#F5F5DC] dark:bg-slate-200'>
            <AccordionHeader className='p-4 font-bold'>Does Hudly work with Magot?</AccordionHeader>
            <AccordionBody className='p-4 '>
            <p className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} onClick={() => handleOpen(2)} className='mt-5 bg-[#F5F5DC] dark:bg-slate-200'>
            <AccordionHeader className='p-4 font-bold'>Does Hudly work with Magot?</AccordionHeader>
            <AccordionBody className='p-4 '>
            <p className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} onClick={() => handleOpen(3)} className='mt-5 bg-[#F5F5DC] dark:bg-slate-200'>
            <AccordionHeader className='p-4 font-bold'>Does Hudly work with Magot?</AccordionHeader>
            <AccordionBody className='p-4 '>
            <p className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            </AccordionBody>
          </Accordion>
        </div>

      </div>

    { isAuthenticated && isShowModal ? (
      <div className='flex justify-center items-center bg-gray-400/50 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
      { selectedMembership > 0 ? <Payment membership={selectedMembership} showModal={(v) => setShowModal(v)} /> :
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-3 pt-4 rounded-t'>
              <p className='text-[darkgoldenrod]'>
                <span className='flex items-center text-md'>
                  <TiInfoOutline className='mr-2 text-2xl'/>This is free membership. Okay?
                </span>
              </p>
            </div>
            <div className='flex items-center justify-around p-4 border-t border-solid border-blueGray-200 rounded-b'>
              <button
                className='text-red-500 hover:text-red-800'
                onClick={() => setShowModal(false)}
              >
                <TiCancel className='text-2xl' />
              </button>
              <button
                className='text-green-500 hover:text-green-800'
                onClick={() => {onFreeMembership(0); setShowModal(false);} }
              >
                <FaCheck className='text-xl' />
              </button>
            </div>
          </div>
        </div>
      }
      </div>) : null }
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  wallet: state.wallet.wallet
});

export default connect(mapStateToProps, { updateMembership })(Home);
