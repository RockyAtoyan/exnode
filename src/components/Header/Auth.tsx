import cl from './Auth.module.scss'
import {Field, Form, Formik} from "formik";
import {FC, useState} from "react";

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

export const Auth:FC<{on:any}> = ({on}) => {

    const [passwordMode,setPasswordMode] = useState(false)

    return <div className={cl.modal}>
        <div className={cl.modal_content}>
            <button className={cl.close} onClick={on}>
                <img src="./assets/plus-solid.svg" alt=""/>
            </button>
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
                            <Field name="email" validate={validateEmail} />
                            {errors.email && touched.email && <div className={cl.error}>{errors.email}</div>}
                        </div>

                        <div className={cl.item}>
                            <div className={cl.password}>
                                <Field name="password" type={passwordMode ? 'text' : 'password'} validate={validatePassword} />
                                <span onClick={() => setPasswordMode(prev => !prev)}>
                                    view
                            </span>
                            </div>
                            {errors.password && touched.password && <div className={cl.error}>{errors.password}</div>}
                        </div>

                        <div className={cl.item}>
                            <div>
                                <Field name="rememberMe" type={'checkbox'} />
                                <h3>Запомнить меня</h3>
                            </div>
                            <a href="./">Забыли пароль</a>
                        </div>

                        <button type="submit">Авторизоваться</button>
                    </Form>
                )}
            </Formik>
            <button className={cl.sign}>
                Зарегистрироваться
            </button>
        </div>
    </div>
}