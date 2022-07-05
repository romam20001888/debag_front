import React,{useState,useEffect} from 'react';
import Loading from "../loading/Loading.js";
import './css/index.css';
function Home() {
    const [Progect,SetProgect]=useState([])
    const [ListaUpdate,SetListaUpdate]=useState(0)
    useEffect(() => {
        SetProgect([])
        fetch('http://10.100.100.62:3001/api/getAllProgect/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            SetProgect(data)
        });
    },[ListaUpdate]);
    function deleteProgect(ID) {
        fetch('http://10.100.100.62:3001/api/deleteProgect/'+ID)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            SetListaUpdate(ID)
        });
    }
    return (
        <>
            <div className='Title-Progect'>
                <h1>Список проектов:</h1><a className='Title-Progect-a' href='/progectadd'>Добавить проект</a><br />
            </div>
            {Progect.map((element,index)=>{
                return (
                    <div key={index} className="Content-Progect-Item">
                        <a className='project-name' href={`/progect/${element?.ID}`}>{element?.NAME}</a>
                        
                        <a  href={`/progectadd/${element?.ID}`}>Изменить проект</a>
                        <button onClick={()=>{deleteProgect(element?.ID)}} className="del-project">✖</button>
                    </div>
                )
            })}
            {Progect.length===0?<Loading />:""}
        </>
    );
}
export default Home;