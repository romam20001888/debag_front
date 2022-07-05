
import React,{useState,useEffect} from 'react';
import Header from "../header/Header.js";
import {useParams} from 'react-router';
function ProgectSiteInfo() {
    const [Progect,SetProgect]=useState([])
    
    let location = useParams();
    useEffect(() => {
        fetch('http://10.100.100.62:3001/api/getSiteById/'+location.id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            SetProgect(data)
        });
    },[location]);
    return (
        <>
            <a href={`/progect/${location.ProgectId}`}>Назад</a>
            <h1><a href={Progect?.URL} target="_blank" rel="noreferrer">{Progect?.NAME}</a></h1>
            <div>Логин: {Progect?.ADMIN_LOGIN}</div>
            <div>Пароль: {Progect?.ADMIN_PASSWORD}</div>
            <h3>Список файлов</h3>
            {Progect?.MAP?.map((element,index)=>{
                return (
                    <div key={index} >
                        <a href={`/progect/${location.ProgectId}/${location.id}/${element?.ID}`}>{element?.NAME} "{element?.DESCRIPTION}"</a>
                    </div>
                )
            })}
        </>
    );
}
export default ProgectSiteInfo;