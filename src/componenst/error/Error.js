

import './index.css';
import React,{useState,useEffect} from 'react';
// import Loading from "../loading/Loading.js";
import CryptoJS from 'crypto-js';

function Pagination({numPage,CountPage,SetNumPage,elementsCount}) {
    var listCount=Math.ceil(elementsCount/CountPage)
    if(listCount>1){
        if(listCount>5){
            if(numPage===1){
                return (
                    <>
                        <span onClick={()=>{SetNumPage(1)}}>1</span>
                        <span onClick={()=>{SetNumPage((numPage+1))}}>{numPage+1}</span>
                        ...
                        <span onClick={()=>{SetNumPage((listCount))}}>{listCount}</span>
                        <span onClick={()=>{SetNumPage((numPage+1))}}>+</span>
                    </>
                )
            }else if(numPage===listCount){
                return (
                    <>
                        <span onClick={()=>{SetNumPage((numPage-1))}}>-</span>
                        <span onClick={()=>{SetNumPage(1)}}>1</span>
                        ...
                        <span onClick={()=>{SetNumPage((numPage-1))}}>{numPage-1}</span>
                        <span onClick={()=>{SetNumPage((numPage))}}>{numPage}</span>
                    </>
                )
            }else{
                return (
                    <>
                        <span onClick={()=>{SetNumPage((numPage-1))}}>-</span>
                        <span onClick={()=>{SetNumPage(1)}}>1</span>
                        ...
                        <span onClick={()=>{SetNumPage((numPage-1))}}>{numPage-1}</span>
                        <span onClick={()=>{SetNumPage((numPage))}}>{numPage}</span>
                        <span onClick={()=>{SetNumPage((numPage+1))}}>{numPage+1}</span>
                        ...
                        <span onClick={()=>{SetNumPage((listCount))}}>{listCount}</span>
                        <span onClick={()=>{SetNumPage((numPage+1))}}>+</span>
                    </>
                )
            }
        }else if(listCount===5){
            return (
                <>
                    <span onClick={()=>{SetNumPage(1)}}>1</span>
                    <span onClick={()=>{SetNumPage(2)}}>2</span>
                    <span onClick={()=>{SetNumPage(3)}}>3</span>
                    <span onClick={()=>{SetNumPage(4)}}>4</span>
                    <span onClick={()=>{SetNumPage(listCount)}}>{listCount}</span>
                </>
            )
        }else if(listCount===4){
            return (
                <>
                    <span onClick={()=>{SetNumPage(1)}}>1</span>
                    <span onClick={()=>{SetNumPage(2)}}>2</span>
                    <span onClick={()=>{SetNumPage(3)}}>3</span>
                    <span onClick={()=>{SetNumPage(listCount)}}>{listCount}</span>
                </>
            )
        }else if(listCount===3){
            return (
                <>
                    <span onClick={()=>{SetNumPage(1)}}>1</span>
                    <span onClick={()=>{SetNumPage(2)}}>2</span>
                    <span onClick={()=>{SetNumPage(listCount)}}>{listCount}</span>
                </>
            )
        }else if(listCount===2){
            return (
                <>
                    <span onClick={()=>{SetNumPage(1)}}>1</span>
                    <span onClick={()=>{SetNumPage(listCount)}}>{listCount}</span>
                </>
            )
        }
        if(listCount===numPage){
            return (
                <>
                    <span onClick={()=>{SetNumPage(1)}}>1</span>
                    ...
                    <span>{listCount}</span>
                </>
            )
        }else if(numPage===1){
            return (
                <>
                    <span>1</span>
                    ...
                    <span onClick={()=>{SetNumPage(listCount)}}>{listCount}</span>
                </>
            )
        }else{
            return (
                <>
                    <span onClick={()=>{SetNumPage(1)}}>1</span>
                    ...
                    <span onClick={()=>{SetNumPage(listCount)}}>{listCount}</span>
                </>
            )
        }
    }
}


function Error() {
    const [Error,SetError]=useState([])
    const [ListaUpdate,SetListaUpdate]=useState(0)
    const [CountPage,SetCountPage]=useState(5)
    const [numPage,SetNumPage]=useState(1)
    const [AllCountElement,SetAllCountElement]=useState(1)
    useEffect(() => {
        fetch('http://10.100.100.62:3001/api/getAllError/',{
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body:JSON.stringify(
                {
                    "numPage":numPage,
                    "CountPage":CountPage,
                }
            )
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            SetError(data.rows)
            SetAllCountElement(data.count)
        }).catch((e)=>{
            console.log(e)
        });
    },[ListaUpdate,CountPage,numPage]);
    function Search(input) {
        if(input!==""){
            fetch('http://10.100.100.62:3001/api/searchError/',{
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer', 
                body:JSON.stringify(
                    {
                        "INPUT":CryptoJS.DES.encrypt(input, 'DES').toString(),
                    }
                )
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                SetError(data.rows)
                SetAllCountElement(data.count)
            }).catch((e)=>{
                console.log(e)
            });
        }else{
            fetch('http://10.100.100.62:3001/api/getAllError/',{
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer', 
                body:JSON.stringify(
                    {
                        "numPage":numPage,
                        "CountPage":CountPage,
                    }
                )
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                SetError(data.rows)
                SetAllCountElement(data.count)
            }).catch((e)=>{
                console.log(e)
            });
        }
    }
    function deleteError(ID) {
        fetch('http://10.100.100.62:3001/api/deleteError/'+ID)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            SetListaUpdate(ID)
        });
    }
    return (
        <div>
            <div className='Title-Progect'>
                <h1>Список ошибок:</h1><a className='Title-Progect-a' href='/erroradd'>Добавить ошибку</a><br />
            </div>
            <div className='Error-Search-Container'>
                <input onChange={(e)=>{Search(e.target.value)}} className='Error-Search-Input' placeholder='Поиск'/>
            </div>
            {Error.map((element,index)=>{
                return (
                    <div key={index} className="Content-Progect-Item">
                        <a className='project-name' href={`/Error/${element?.ID}`}>{element?.NAME}</a>
                        <a  href={`/Erroradd/${element?.ID}`}>Изменить ошибку</a>
                        <button onClick={()=>{deleteError(element?.ID)}} className="del-project">✖</button>
                    </div>
                )
            })}
            <div>
                <select onChange={(e)=>{SetCountPage(e.target.value)}}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                {Error.length>0?
                    <span className='Error-Pagination'>
                        <Pagination numPage={numPage} SetNumPage={SetNumPage} CountPage={CountPage} elementsCount={AllCountElement}  />
                    </span>
                :""}
            </div>
        </div>
    );
}
export default Error;