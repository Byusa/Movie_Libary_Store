// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { authActions } from '../store/auth' 
// import { useNavigate } from 'react-router-dom';

// const SigninPage = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const dispatch = useDispatch()
//     const isAuth = useSelector( state => state.auth.isAuthenticated )

//     const emailChangeHandler = (event) => {
//         setEmail(event.target.value)
//     }
//     const passwordChangeHandler = (event) => {
//         setPassword(event.target.value)
//     }
//     const loginHandler = (event) => {
//         event.preventDefault()
//         console.log(email)
//         console.log(password)
//         console.log(isAuth)
//         dispatch(authActions.login())
//         navigate('/')
//     }

//     return (
//      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}></div>
//         <form onSubmit={loginHandler}>
//             <div>
//                 <label htmlFor='email'> Email </label>
//                 <input type='email' id='email' value={email} onChange={emailChangeHandler}/>
//             </div>
//             <div>
//                 <label htmlFor='Password'> Password </label>
//                 <input type='password' id='password' value={password} onChange={passwordChangeHandler}/>
//             </div>
//             <div>
//                 <button>Login</button>
//             </div>
//         </form>
//      </div>
//     )

// }
// export default SigninPage

import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import { authActions } from '../store/auth' 
import { useDispatch } from 'react-redux'
import { Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const SigninPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log(values);
    const enteredEmail = values.user.email
    const enteredPassword = values.user.password
    let token = null
    console.log("enteredEmail", enteredEmail)
    console.log("enteredPassword", enteredPassword)
    console.log("Env", process.env.REACT_APP_FIREBASE_API_KEY)
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    fetch(url, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }), 
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else{
            res.json().then(data => {
               let errorMessage = "Authentication failed";
               if (data && data.error && data.error.message) {
                     errorMessage = data.error.message;
               }
               alert(errorMessage);
               throw new Error(errorMessage);
            })
        }
    }).then(data => {
        console.log(data)
        token = data.idToken
        console.log(token)
        localStorage.setItem('token', token)
        dispatch(authActions.login(token))
        navigate('/')
    })
    .catch(err => {
        console.log(err)
        alert(err)
    })
  };
  return (
    <Space direction="vertical" style={{width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <Space direction="vertical">
                <Title level={2}>Welcome back</Title>
                <Text>Please enter your details</Text>
            </Space>
            <Space direction="vertical">
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                        {
                            required: true,
                            type: 'email',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'password']}
                        label="Password"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {/* <Form.Item
                        name={['user', 'password2']}
                        label="Confirm Password"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item> */}

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        // wrapperCol={{
                        // offset: 8,
                        // span: 16,
                        // }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                        SignIn
                        </Button>
                    </Form.Item>
                </Form>
                <Text>Don't have an account? 
                    <Link to="/signup">Sign up</Link>
                </Text>
            </Space>
        </Space>
  );
};
export default SigninPage;