import cl from './Auth.module.scss'
import {Field, Form, Formik} from "formik";
import {FC, useState} from "react";
import { generate } from '@wcj/generate-password';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from "react-redux";
import {getThemeMode} from "../../store/selectors";

function validateEmail(value:any ) {
    let error;
    if (!value) {
        error = 'Это обязательное поле';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Неправильный адрес';
    }
    return error;
}

function validatePassword(value:any) {
    let error;
    if (!value) {
        error = 'Это обязательное поле';
        return error;
    }
}

function signValidatePassword(value:any,func:any) {
    let error : string | boolean = false;
    if (!value) {
        error = 'Это обязательное поле';
        func(error)
        return
    }
    if(value.length < 10){
        error = 'Пароль должен быть не менее 10 символов';
        func(error)
        return
    }
    if(!new RegExp(/[A-Z|А-Я]+/g).test(value)){
        error = 'Пароль должен содержать хотя бы одну заглавную букву';
        func(error)
        return
    }
    if(!new RegExp(/[.,&^$%#@!?*(){}]+/g).test(value)){
        error = 'Пароль должен содержать хотя бы один специальный символ';
        func(error)
        return
    }
    func(error)
}

export const Auth:FC<{on:any}> = ({on}) => {

    const theme = useSelector(getThemeMode)

    const [regMode,setRegMode] = useState(false)

    const [passwordMode,setPasswordMode] = useState(false)
    const [repeatPasswordMode,setRepeatPasswordMode] = useState(false)

    const [checkMode,setCheckMode] = useState(false)

    const [repeatPasswordValue,setRepeatPasswordValue] = useState('')
    const [repeatPasswordValidateValue,setRepeatValidatePasswordValue] = useState<any>(true)

    const [passwordValidateValue,setValidatePasswordValue] = useState<any>(true)
    const [passwordValue,setPasswordValue] = useState('')

    const [emailValue,setEmailValue] = useState('')

    const notify = () => toast.success("Пароль скопирован в буфер обмена",
        {
            theme:theme ? "light" : "dark",
        });

    return <div className={cl.modal}>
        <div className={cl.message}>
            <ToastContainer />
        </div>
        <div className={cl.modal_content}>
            <button className={cl.close} onClick={on}>
                <img src="./assets/plus-solid.svg" alt=""/>
            </button>
            {!regMode ? <>
                <div className={cl.text}>
                    <h2>Авторизация</h2>
                    <h3>
                        Для пользования P2P площадкой необходимо зарегистрировать отдельный аккаунт на p2p.exnode.ru
                    </h3>
                </div>
                <Formik
                    initialValues={{ email: '',password:'',rememberMe:false }}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        actions.setSubmitting(false);
                    }}
                >
                    {({ errors, touched, isValidating }) => (
                        <Form className={cl.form}>
                            <div className={cl.item}>
                                <Field name="email"
                                       validate={validateEmail} />
                                {errors.email && touched.email && <div className={cl.error}>{errors.email}</div>}
                            </div>

                            <div className={cl.item}>
                                <div className={cl.password}>
                                    <Field name="password"
                                           type={passwordMode ? 'text' : 'password'} validate={validatePassword} />
                                    <span onClick={() => setPasswordMode(prev => !prev)}>
                                        <img src="./assets/eye-light.svg" alt=""/>
                            </span>
                                </div>
                                {errors.password && touched.password && <div className={cl.error}>{errors.password}</div>}
                            </div>

                            <div className={cl.item + ' ' + cl.checkbox_item}>
                                <div>
                                    <div className={cl.checkbox_wrapper} onClick={() => setCheckMode(prev => !prev)}>
                                        <div className={cl.checkbox}>
                                            {checkMode && <img src="./assets/check.svg" alt=""/>}
                                        </div>
                                        <Field name="rememberMe" type={'checkbox'} />
                                    </div>
                                    <h3>Запомнить меня</h3>
                                </div>
                                <a href="./">Забыли пароль</a>
                            </div>

                            <button type="submit">Авторизоваться</button>
                        </Form>
                    )}
                </Formik>
                <button className={cl.sign} type="button" onClick={() => setRegMode(prev => !prev)}>
                    Зарегистрироваться
                </button>
            </> :
                <>
                    <div className={cl.text}>
                        <h2>Регистрация</h2>
                    </div>
                    <Formik
                        initialValues={{ email:'',password:'',repeatPassword:''}}
                        onSubmit={(values, actions) => {
                            if(passwordValue && repeatPasswordValue && passwordValue === repeatPasswordValue) console.log({...values,password:passwordValue,repeatPassword:repeatPasswordValue})
                            else {
                                signValidatePassword(passwordValue,(value:any) => setValidatePasswordValue(value))
                                signValidatePassword(repeatPasswordValue,(value:any) => setRepeatValidatePasswordValue(value))
                            }
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ errors, touched, isValidating }) => (
                            <Form className={cl.form}>
                                <div className={cl.item}>
                                    <Field name="email"
                                           validate={validateEmail} />
                                    {errors.email && touched.email && <div className={cl.error}>{errors.email}</div>}
                                </div>

                                <div className={cl.item}>
                                    <div className={cl.password}>
                                        <Field name="password"
                                               value={passwordValue}
                                               onChange={(event:any) => {
                                                   setPasswordValue(event?.currentTarget.value)
                                                   signValidatePassword(event?.currentTarget.value,(value:any) => setValidatePasswordValue(value))
                                               }}
                                               type={passwordMode ? 'text' : 'password'} />
                                        <span onClick={() => setPasswordMode(prev => !prev)}>
                                            {passwordValidateValue  && <img src="./assets/warning.svg" alt=""/>}
                                            {!passwordValidateValue  && <img src="./assets/check-password.svg" alt=""/>}
                                            <img src="./assets/eye-light.svg" alt=""/>
                                        </span>
                                    </div>
                                    {passwordValidateValue && <div className={cl.error}>{passwordValidateValue ? passwordValidateValue : ''}</div>}
                                </div>

                                <div className={cl.item  + ' ' + cl.repeatPassword}>
                                    <div className={cl.password}>
                                        <Field name="repeatPassword"
                                               value={repeatPasswordValue}
                                               onChange={(event:any) => {
                                                   setRepeatPasswordValue(event?.currentTarget.value)
                                                   signValidatePassword(event?.currentTarget.value,(value:any) => setRepeatValidatePasswordValue(value))
                                               }}
                                               type={repeatPasswordMode ? 'text' : 'password'} />
                                        <span onClick={() => setRepeatPasswordMode(prev => !prev)}>
                                            { repeatPasswordValidateValue && <img src="./assets/warning.svg" alt=""/>}
                                            { !repeatPasswordValidateValue  && <img src="./assets/check-password.svg" alt=""/>}
                                            <img src="./assets/eye-light.svg" alt=""/>
                                        </span>
                                    </div>
                                    {repeatPasswordValidateValue && <div className={cl.error}>{repeatPasswordValidateValue ? repeatPasswordValidateValue : ''}</div>}
                                </div>

                                <div className={cl.item + ' ' + cl.checkbox_item}>
                                    <div>
                                        <div className={cl.checkbox_wrapper} onClick={() => setCheckMode(prev => !prev)}>
                                            <div className={cl.checkbox}>
                                                {checkMode && <img src="./assets/check.svg" alt=""/>}
                                            </div>
                                            <Field name="rememberMe" type={'checkbox'}  />
                                        </div>
                                        <h3 className={cl.sign_copy}>
                                            Мне больше 18 лет, я принимаю условия <a href="/">Пользовательского соглашения</a> и <a
                                            href="/">Политики конфиденциальности</a>
                                        </h3>
                                    </div>
                                </div>

                                <div className={cl.item}>
                                    <button type="button" className={cl.random} onClick={() => {
                                        const pass = generate({ length: 23 ,upperCase:true})
                                        setRepeatPasswordValue(pass)
                                        setPasswordValue(pass)
                                        signValidatePassword(pass,(value:any) => setValidatePasswordValue(value))
                                        signValidatePassword(pass,(value:any) => setRepeatValidatePasswordValue(value))
                                        navigator.clipboard.writeText(pass)
                                            .then(() => {

                                            })
                                            .catch(err => {
                                                console.log('Something went wrong', err);
                                            });
                                        notify()
                                    }}>Сгенерировать надёжный пароль</button>
                                </div>

                                <button type="submit">Зарегистрироваться</button>
                            </Form>
                        )}
                    </Formik>
                    <a href={'/'} className={cl.sign}>
                        Уже есть аккаунт? Войти
                    </a>
                </>
            }

        </div>
    </div>
}