import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../header/Header.js";
import { useParams} from 'react-router';
function ProgectAdd() {
    const [ProgectNAME,SetProgectNAME]=useState("")
    const [ProgectCONTACT_PHONE,SetProgectCONTACT_PHONE]=useState("")
    const [ProgectCONTACT_EMAIL,SetProgectCONTACT_EMAIL]=useState("")
    const [ProgectINN,SetProgectINN]=useState("")
    const [ProgectKPP,SetProgectKPP]=useState("")
    const [ProgectBIK,SetProgectBIK]=useState("")
    const [ProgectCOMPANY_ADRESS,SetProgectCOMPANY_ADRESS]=useState("")
    const [Progect,SetProgect]=useState([])
    const [ListaUpdate,SetListaUpdate]=useState(0)
    
    let location = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(location?.id>0){
            SetProgect([])
            fetch('http://10.100.100.62:3001/api/getProgectById/'+location.id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                SetProgectNAME(data?.NAME?data.NAME:"")
                SetProgectCONTACT_PHONE(data?.CONTACT_PHONE?data.CONTACT_PHONE:"")
                SetProgectCONTACT_EMAIL(data?.CONTACT_EMAIL?data.CONTACT_EMAIL:"")
                SetProgectINN(data?.INN?data.INN:"")
                SetProgectKPP(data?.KPP?data.KPP:"")
                SetProgectBIK(data?.BIK?data.BIK:"")
                SetProgectCOMPANY_ADRESS(data?.COMPANY_ADRESS?data.COMPANY_ADRESS:"")
                SetProgect(data)
                console.log(data)
            });
        }
    },[ListaUpdate]);
    function saveProgect() {
        fetch('http://10.100.100.62:3001/api/AddProgect/?'+
        'NAME='+ProgectNAME+'&'+
        'CONTACT_PHONE='+ProgectCONTACT_PHONE+'&'+
        'CONTACT_EMAIL='+ProgectCONTACT_EMAIL+'&'+
        'INN='+ProgectINN+'&'+
        'KPP='+ProgectKPP+'&'+
        'BIK='+ProgectBIK+'&'+
        'COMPANY_ADRESS='+ProgectCOMPANY_ADRESS
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data?.ID>0){
                navigate("/");
            }else{
                alert("error")
            }
        });
    }
    function updateProgect() {
        fetch('http://10.100.100.62:3001/api/UpdateProgect/'+location.id+'/?'+
        'NAME='+ProgectNAME+'&'+
        'CONTACT_PHONE='+ProgectCONTACT_PHONE+'&'+
        'CONTACT_EMAIL='+ProgectCONTACT_EMAIL+'&'+
        'INN='+ProgectINN+'&'+
        'KPP='+ProgectKPP+'&'+
        'BIK='+ProgectBIK+'&'+
        'COMPANY_ADRESS='+ProgectCOMPANY_ADRESS
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            navigate("/");
        });
    }
    return (
        <>
        <div className='add-project__wrapp'>
            <input onChange={(e)=>{SetProgectNAME(e.target.value)}} value={ProgectNAME} placeholder="Название проекта"/><br />
            <input onChange={(e)=>{SetProgectCONTACT_PHONE(e.target.value)}} value={ProgectCONTACT_PHONE} placeholder="Номер телефона компании"/><br />
            <input onChange={(e)=>{SetProgectCONTACT_EMAIL(e.target.value)}} value={ProgectCONTACT_EMAIL} placeholder="Email компании"/><br />
            <input onChange={(e)=>{SetProgectINN(e.target.value)}} value={ProgectINN} placeholder="ИНН"/><br />
            <input onChange={(e)=>{SetProgectKPP(e.target.value)}} value={ProgectKPP} placeholder="КПП"/><br />
            <input onChange={(e)=>{SetProgectBIK(e.target.value)}} value={ProgectBIK} placeholder="БИК"/><br />
            <input onChange={(e)=>{SetProgectCOMPANY_ADRESS(e.target.value)}} value={ProgectCOMPANY_ADRESS} placeholder="Адрес"/><br />
            <button onClick={()=>{location?.id>0?updateProgect():saveProgect()}}>Сохранить</button>
        </div>

        </>
    );
}
export default ProgectAdd;