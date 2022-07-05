
import './index.css';
import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../header/Header.js";
import { useParams} from 'react-router';
import base64 from 'base-64';
// function Gend({params}) {
//     return ReactDOM.render(params);
// }
class Gend extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
      return <h1>Привет, {this.props.name}</h1>;
    }
}
function ErrorItem() {
    const [Progect,SetProgect]=useState([])
    const [ListaUpdate,SetListaUpdate]=useState(0)
    
    let location = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(location?.id>0){
            SetProgect([])
            fetch('http://10.100.100.62:3001/api/getErrorById/'+location.id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data?.NAME){
                    data.DESCRIPTION_ERROR=data?.DESCRIPTION_ERROR
                    data.DESCRIPTION=data?.DESCRIPTION
                    SetProgect(data)
                }
            });
        }
    },[ListaUpdate]);
    return (
        <>
        <a href='/error'>Назад</a><br />
        <div className='add-project__wrapp'>
            <h1>{Progect.NAME}</h1>
            <h3 className='Error-Item-H3'>Описание ошибки</h3>
            <p className='Error-Item-Element' dangerouslySetInnerHTML={{__html:Progect.DESCRIPTION_ERROR}} />
            <h3 className='Error-Item-H3'>Решение ошибки</h3>
            <p className='Error-Item-Element' dangerouslySetInnerHTML={{__html:Progect.DESCRIPTION}} />
        </div>

        </>
    );
}
export default ErrorItem;