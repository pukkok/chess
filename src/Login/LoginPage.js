import React, { useState } from "react";
import './LoginPage.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage () {

    const navigate = useNavigate()
    const mainNavi = (e) => {
        if(e.target.className === 'login'){
            navigate('/')
        }
    }

    const [userInfo, setUserInfo] = useState({userId:'', password:''})
    const loginInputChange = (e) => {
        const {name, value} = e.target
        setUserInfo({...userInfo, [name] : value})
    }
    const login = async (e) => {
        e.preventDefault()
        const {data} = await axios.post('/chess/login', {
            ...userInfo
        })
        console.log(data)
        if(data.code === 200){
            localStorage.setItem('token', JSON.stringify(data.token))
        }
    }

    return (
        <section className="login" onClick={mainNavi}>
            <div className="box">
                <h1>로그인<span>(손쉬운 회원가입)</span></h1>
                <form>
                    <label className="id-label">
                        <span>ID</span>
                        <input type="text" name="userId" onChange={loginInputChange} value={userInfo.userId}/>    
                    </label>
                    <label className="pw-label">
                        <span>PW</span>
                        <input type="password" name="password" onChange={loginInputChange} value={userInfo.password}/>
                    </label>
                    <button onClick={login}>로그인</button>
                </form>
                <div className="btn-box">
                    <button>아이디 찾기<br/>비밀번호 찾기</button>
                    <button><Link to={'/join'}>회원가입</Link></button>
                </div>
            </div>
        </section>
    )
}

export default LoginPage