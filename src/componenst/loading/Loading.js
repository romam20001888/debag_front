
import './index.css';
import React from 'react';
function Loading() {
    return (
        <div className='Loading-Container-Main'>
            <div className='Loading-Container'>
                <div className='Loading-Container-Line-1'></div>
                <div className='Loading-Container-Line-2'></div>
                <div className='Loading-Container-Line-3'></div>
                <div className='Loading-Container-Line-4'></div>
            </div>
            <span>TW Company</span>
        </div>
    );
}
export default Loading;