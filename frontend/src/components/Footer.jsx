import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

import RiyaImage from '../images/riya.png';

import '../styles/components-styles/Footer.css'

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className='upper-footer mm-5'>
            <ul className="footer-icons">
                <li className='mm-5 point'> <Link target='_blank' to='https://www.instagram.com/iitbhilai'><FaInstagram size={25} color='#F6412F'/></Link></li>
                <li className='mm-5 point'><Link target='_blank' to='https://www.facebook.com/iit.bh'><FaFacebook size={25} color='#F6412F'/></Link></li>
                <li className='mm-5 point'><Link target='_blank' to='https://twitter.com/IIT_Bhilai'><FaTwitter size={25} color='#F6412F'/></Link></li>
            </ul>
            <div className='main-heading theme-color'>tastyBites</div>
            </div>
            <div className='lower-footer mm-5'>
                <img className='my-image' src={RiyaImage} alt='Loading'></img>
                <div>
                <div className='my-name second-color'>Riya Dhiman </div>
                <div className='copy-right second-color'>Copyright &copy; 2022 | All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;