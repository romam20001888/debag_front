
import logo from '../../logo.png';
import './index.css';
import React from 'react';
function Header() {
    return (
        <div>
            <div className='Header-Logo-Container'>
                <a href={`/`}><img src={logo} /></a>
            </div>
        </div>
    );
}
export default Header;