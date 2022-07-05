

import React,{useState,useEffect} from 'react';
import Header from "../header/Header.js";
import {useParams} from 'react-router';
function ProgectSiteInfoPage() {
    const [Progect,SetProgect]=useState([])
    
    let location = useParams();
    useEffect(() => {
        fetch('http://10.100.100.62:3001/api/getFileById/'+location.id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            SetProgect(data)
        });
    },[location]);
    return (
        <>
            <a href={`/progect/${location.ProgectId}/${location.SiteId}`}>Назад</a>
            <h1>{Progect?.NAME}</h1>
            <h4>{Progect?.DESCRIPTION}</h4>
            <h4>Путь к файлу: {Progect?.URL}</h4>
            <h3>Список изменений</h3>
            {Progect?.ROW_UPDATE?.map((element,index)=>{
                return (
                    <div key={index} >
                        {element?.createdAt}. Строка : {element?.ROW_ID}<br />
                        {element?.DESCRIPTION}<br />
                        <span>
                            <h5>Код до</h5>
                            <pre>{element?.OLD_CODE}</pre>
                        </span>
                        <span>
                            <h5>Код после</h5>
                            <pre>{element?.NEW_CODE}</pre>
                        </span>
                    </div>
                )
            })}
        </>
    );
}
export default ProgectSiteInfoPage;