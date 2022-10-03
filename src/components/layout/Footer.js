import './footer.css';
import { FaYoutube, FaTwitter, FaTelegram } from 'react-icons/fa';
import MailImage from '../../images/mail.png';

const Footer = () => {

    return (
        <div className='bg-gradient-to-b from-[#010101] to-[#2F2B27]'>
            <div className='n-container'>
                <div className='py-20 sm:flex justify-between gap-5'>
                    <div>
                        <img src='/img/logo.png' alt='' />
                        <p className='footer_text max-w-[300px] mt-5'>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry.</p>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title '>Quick Links</h1>

                        <div className='mt-5'>
                            <p className='footer_text'>- Home</p>
                            <p className='footer_text'>- Swap</p>
                            <p className='footer_text'>- Liquidity</p>
                            <p className='footer_text'>- Farms</p>
                            <p className='footer_text'>- Pools</p>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title'>Help</h1>

                        <div className='mt-5'>
                            <p className='footer_text'>- Support</p>
                            <p className='footer_text'>- Teams & Conditions</p>
                            <p className='footer_text'>- Privacy Policy</p>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title'>Newsletter</h1>

                        <div className='mt-5'>
                            <p className='footer_text'>Duis aute irure dolor in reprehen derit in velit.</p>
                        </div>

                        <div className='flex items-center mt-5'>
                            <input
                                type='text'
                                className='bg-white rounded-3xl px-3 py-3 text-black w-full'
                                placeholder='Enter email address'
                            />
                            <img src={MailImage} style={{marginLeft: '-40px'}} alt='' />
                        </div>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title '>Social</h1>

                        <div className='mt-5 font-[Poppins]'>
                            <a href='https://www.youtube.com/channel/UCiwByY5g0G-Qj_ENgJdEfUQ' className='footer_text flex hover:text-slate-400'>
                                <FaYoutube className='mt-1'/>&nbsp;Youtube
                            </a>
                            <a href='https://twitter.com/CryptoMagot' className='footer_text flex hover:text-slate-400'><FaTwitter className='mt-1'/>&nbsp;Twitter</a>
                            <a href='https://t.me/MagotEnglish' className='footer_text flex hover:text-slate-400'><FaTelegram className='mt-1'/>&nbsp;Telegram</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer;
