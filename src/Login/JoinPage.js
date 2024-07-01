import React, { useState } from "react";
import './LoginPage.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JoinPage () {

    const navigate = useNavigate()
    const mainNavi = (e) => {
        if(e.target.className === 'login'){
            navigate('/')
        }
    }

    const [UserInfo, setUserInfo] = useState({userId: '', nickName: '', password: '', confirmPassword: ''})

    const joinInputChange = (e) => {
        const {name, value} = e.target
        setUserInfo({...UserInfo, [name] : value})
    }

    const sendUserInfo = async (e) => {
        e.preventDefault()
        const {data} = await axios.post('/chess/join', {
            ...UserInfo
        })
        console.log(data)
    }


    return (
        <section className="login" onClick={mainNavi}>
            <div className="box join">
                <h1>회원가입</h1>
                <form>
                    <label className="nick-name">
                        <span>닉네임</span>
                        <input type="text" name="nickName" onChange={joinInputChange} value={UserInfo.nickName}/>
                    </label>
                    <label className="id-label">
                        <span>ID</span>
                        <input type="text" name="userId" onChange={joinInputChange} value={UserInfo.userId}/>
                    </label>
                    <label className="pw-label">
                        <span>비밀번호</span>
                        <input type="password" name="password" onChange={joinInputChange} value={UserInfo.password}/>
                    </label>
                    <label className="cf-pw-label">
                        <span>비밀번호 확인</span>
                        <input type="password" name="confirmPassword" onChange={joinInputChange} value={UserInfo.confirmPassword}/>
                    </label>
                    
                    <button onClick={sendUserInfo}>완료</button>
                </form>
            </div>
        </section>
    )
}

export default JoinPage