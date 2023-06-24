import cl from './Profile.module.scss'
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import {generate} from "@wcj/generate-password";
import {signValidatePassword, validateEmail} from "../Header/Auth";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {getThemeMode} from "../../store/selectors";

export const Profile = () => {

    const theme = useSelector(getThemeMode)

    const [changeMode,setChangeMode] = useState(false)

    const [emailValue,setEmailValue] = useState()

    const [passwordMode,setPasswordMode] = useState(false)
    const [repeatPasswordMode,setRepeatPasswordMode] = useState(false)

    const [checkMode,setCheckMode] = useState(false)

    const [repeatPasswordValue,setRepeatPasswordValue] = useState('')
    const [repeatPasswordValidateValue,setRepeatValidatePasswordValue] = useState(true)

    const [passwordValidateValue,setValidatePasswordValue] = useState(true)
    const [passwordValue,setPasswordValue] = useState('')

    const notify = () => toast.success("Пароль скопирован в буфер обмена",
        {
            theme:theme ? "light" : "dark",
        });

    return <section id={'profile'}>
        <div className="container">
            <div className={cl.main}>
                <div className={cl.message}>
                    <ToastContainer />
                </div>
                <div className="title">
                    <h1>Профиль</h1>
                </div>
                <div className={cl.content}>
                    <div className={cl.info}>
                        <div className={cl.img}>
                            <img src="./assets/user.png" alt=""/>
                        </div>
                        <div>
                            <h1>withered-leaf</h1>
                            <h2>atoyanrobert21@gmail.com</h2>
                        </div>
                    </div>
                    <div className={cl.balance}>
                        <h3>Общий баланс</h3>
                        <h2>
                            <span>≈ 0.00</span>
                            <span>USDT</span>
                        </h2>
                        <h3>
                            <span>Доступно:</span>
                            <span>0.00 USDT</span>
                        </h3>
                    </div>
                </div>
                <div className={cl.change}>
                    <button onClick={() => setChangeMode(prev => !prev)}>Изменить данные</button>
                    {changeMode &&
                        <Formik
                            initialValues={{ email:'',password:'',repeatPassword:''}}
                            onSubmit={(values, actions) => {
                                if(passwordValue && repeatPasswordValue && passwordValue === repeatPasswordValue) console.log({...values,password:passwordValue,repeatPassword:repeatPasswordValue})
                                else {
                                    signValidatePassword(passwordValue,(value) => setValidatePasswordValue(value))
                                    signValidatePassword(repeatPasswordValue,(value) => setRepeatValidatePasswordValue(value))
                                }
                                actions.setSubmitting(false);
                            }}
                        >
                            {({ errors, touched, isValidating }) => (
                                <Form className={cl.form}>
                                    <div className={cl.item}>
                                        <Field name="email"
                                               placeholder={'Электронная почта'}
                                               validate={validateEmail} />
                                        {errors.email && touched.email && <div className={cl.error}>{errors.email}</div>}
                                    </div>

                                    <div className={cl.item}>
                                        <div className={cl.password}>
                                            <Field name="password"
                                                   value={passwordValue}
                                                   placeholder={'Придумайте пароль'}
                                                   onChange={(event) => {
                                                       setPasswordValue(event?.currentTarget.value)
                                                       signValidatePassword(event?.currentTarget.value,(value) => setValidatePasswordValue(value))
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
                                                   placeholder={'Повторите пароль'}
                                                   value={repeatPasswordValue}
                                                   onChange={(event) => {
                                                       setRepeatPasswordValue(event?.currentTarget.value)
                                                       signValidatePassword(event?.currentTarget.value,(value) => setRepeatValidatePasswordValue(value))
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


                                    <div className={cl.item}>
                                        <button type="button" className={cl.random} onClick={() => {
                                            const pass = generate({ length: 23 ,upperCase:true})
                                            setRepeatPasswordValue(pass)
                                            setPasswordValue(pass)
                                            signValidatePassword(pass,(value) => setValidatePasswordValue(value))
                                            signValidatePassword(pass,(value) => setRepeatValidatePasswordValue(value))
                                            navigator.clipboard.writeText(pass)
                                                .then(() => {

                                                })
                                                .catch(err => {
                                                    console.log('Something went wrong', err);
                                                });
                                            notify()
                                        }}>Сгенерировать надёжный пароль</button>
                                    </div>

                                    <button type="submit">Изменить</button>
                                </Form>
                            )}
                        </Formik>
                    }
                </div>
            </div>

        </div>
    </section>
}