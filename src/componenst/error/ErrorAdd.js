
import './index.css';
import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams} from 'react-router';
import CryptoJS from 'crypto-js';

import { EditorState, ContentState, convertFromHTML } from 'draft-js'

import { stateToHTML } from "draft-js-export-html";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function ErrorAdd() {
    const [ProgectNAME,SetProgectNAME]=useState("")
    
    
    const [editorState1, setEditorState1] = React.useState();
    
    const [editorState2, setEditorState2] = React.useState();

    let location = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(location?.id>0){
            fetch('http://10.100.100.62:3001/api/getErrorById/'+location.id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                SetProgectNAME(data?.NAME?data.NAME:"")
                setEditorState1(EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                    convertFromHTML(String(data?.DESCRIPTION_ERROR?data.DESCRIPTION_ERROR:""))
                    )
                ))
                
                setEditorState2(EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                    convertFromHTML(String(data?.DESCRIPTION?data.DESCRIPTION:""))
                    )
                ))
            });
        }
    });
    function saveError() {
        fetch('http://10.100.100.62:3001/api/AddError/',{
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
                    "NAME":ProgectNAME,
                    "DESCRIPTION_ERROR":CryptoJS.DES.encrypt(stateToHTML(editorState1.getCurrentContent()), 'DES').toString(),
                    "DESCRIPTION":CryptoJS.DES.encrypt(stateToHTML(editorState2.getCurrentContent()), 'DES').toString()
                }
            )
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data?.ID>0){
                navigate("/error");
            }else{
                alert("error")
            }
        }).catch((e)=>{
            console.log(e)
        });
    }
    function updateError() {
        fetch('http://10.100.100.62:3001/api/UpdateError/'+location.id+'/'
        ,{
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
                    "NAME":ProgectNAME,
                    "DESCRIPTION_ERROR":CryptoJS.DES.encrypt(stateToHTML(editorState1.getCurrentContent()), 'DES').toString(),
                    "DESCRIPTION":CryptoJS.DES.encrypt(stateToHTML(editorState2.getCurrentContent()), 'DES').toString()
                }
            )
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            navigate("/error");
        });
    }
    return (
        <>
        <div className='add-project__wrapp'>
            <input onChange={(e)=>{SetProgectNAME(e.target.value)}} value={ProgectNAME} placeholder="Название ошибки"/><br />
            <h4>Текст ошибки</h4>
            <Editor 
                editorState={editorState1}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState1}
            />
            <h4>Решение ошибки</h4>
            <Editor 
                editorState={editorState2}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState2}
            />
            <button onClick={()=>{location?.id>0?updateError():saveError()}}>Сохранить</button>
        </div>

        </>
    );
}
export default ErrorAdd;