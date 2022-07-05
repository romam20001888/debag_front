
import React,{useState,useEffect} from 'react';
import Header from "../header/Header.js";
import { useNavigate } from "react-router-dom";
import { useParams} from 'react-router';
import './css/index.css';
function ProgectInfo() {
    const [Progect,SetProgect]=useState([])
    
    const navigate = useNavigate();
    let location = useParams();
    useEffect(() => {
        fetch('http://10.100.100.62:3001/api/getProgectById/'+location.id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            SetProgect(data)
        });
    },[location]);
    function deleteProgect(ID) {
        fetch('http://10.100.100.62:3001/api/deleteProgect/'+ID)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            navigate("/");
        });
    }
    return (
        <>
        
            <a href='/'>Назад</a><br />
            <div className='Title-Progect-Info'>
                <h1>Проект: {Progect?.NAME}</h1>
                <a className='Title-Progect-a' href='/progectsiteadd'>Добавить сайт для проекта</a>
                <button className='Title-Progect-a' onClick={()=>{deleteProgect(Progect?.ID)}}>Удалить проект</button>
            </div>
            <div>Номер телефона : {Progect?.CONTACT_PHONE}</div>
            <div>Email: {Progect?.CONTACT_EMAIL}</div>
            <div>Адрес: {Progect?.COMPANY_ADRESS}</div>
            <div>ИНН: {Progect?.INN}</div>
            <div>КПП: {Progect?.KPP}</div>
            <div>БИК: {Progect?.BIK}</div>
            <h3 className='Title-Progect-h3'>Список сайтов:</h3>
            {Progect?.SITES?.map((element,index)=>{
                return (
                    <div key={index}  className="Content-Progect-Item">
                        <a className='project-name'  href={`/progect/${Progect?.ID}/${element?.ID}`}>{element?.NAME}</a>

                        <a  href={`/progectadd/${element?.ID}`}>Изменить сайт</a>
                        <button onClick={()=>{deleteProgect(element?.ID)}} className="del-project">✖</button>
                    </div>
                )
            })}
        </>
    );
}
export default ProgectInfo;