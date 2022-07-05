
import './index.css';
import React from 'react';
function Menu() {
    return (
        <div>
            <nav className='Nav-Container'>
                <a className='Nav-Container-a' href="/">Проекты</a>
                <a className='Nav-Container-a' href="/error">Ошибки</a>
                <a className='Nav-Container-a' href="/task">Задачи</a>
                <a className='Nav-Container-a' href="/constructo-html">Конструктор HTML</a>
            </nav>
        </div>
    );
}
export default Menu;