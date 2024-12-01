import React, { useState } from "react";
import { Informer } from '@consta/uikit/Informer';


const AuthPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState('');

    const onButtonClick = (evt) => {
        evt.preventDefault();

        if ('' === email) {
            setIsError('Введите email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setIsError('Введите корректный email')
            return
        }

        if ('' === password) {
            setIsError('Введите пароль')
            return
        }

        if (password.length < 7) {
            setIsError('Пароль должен быть больше 8 символов')
            return
        }

        // TODO: redirect
        console.log('Успех!');
    }

    return (
        <form onSubmit={onButtonClick}>
            <label>Введите email:
                <input 
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
            </label>
            <br></br>
            <label>Введите пароль:
                <input 
                    value={password} 
                    onChange={(ev) => setPassword(ev.target.value)}
                />
            </label> 
            <br></br>
            <br></br>
            { 
                isError !== '' ? <Informer status="alert" view="filled" title="Ошибка" label={isError}/> : undefined
            }
            <br></br>
            <button type='submit'>Отправить</button>
        </form> 
    )
}

export default AuthPage;