import React, { useState } from "react";
import { Button, Col, Container as Con, Form, FormGroup, FormLabel, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Flex } from "rebass";
import styled from '@emotion/styled'
import { ToastContainer, toast } from 'react-toastify';
import Config from '../config'
import { signIn } from "../remote";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Login: React.FC<any> = () => {
    const [user, setUser] = useState({ username: "", password: "", confirmPassword: '' })
    const [isSignUp, setIsSignUp] = useState(false)

    const mutation = useMutation(signIn, {
        onSuccess(data, variables, context) {
            console.log(data, 'success');
            // queryClient.invalidateQueries()
        },
        onSettled(data, error, variables, context) {
            console.log(data, error, variables, context)
        },
        onError(error: any, variables, context) {
            toast(error.message, { type: 'error' })
        },
    })

    const submitLoginForm = (event: any) => {
        event.preventDefault();
        if (isSignUp && (user.password != user.confirmPassword)) return toast("password didn't match", { type: 'warning' })

        mutation.mutate({ username: user.username, password: user.password })
    }

    const { register, login } = Config.auth.routes
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <ToastContainer />
            <Container className="my-5">
                <Header>
                    <h2 className="fw-normal mb-5">{isSignUp ? 'Sign-Up' : 'Login'}</h2>
                    <SignUpCTA onClick={() => {
                        navigate(!isSignUp ? register : login);
                        setIsSignUp(state => !state)
                    }} variant="outline-success">{isSignUp ? 'Login' : 'Sign-Up'}</SignUpCTA>
                </Header>
                <Row>
                    <Col md={{ span: 6 }}>
                        <Form id="loginForm" onSubmit={submitLoginForm}>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-username'}>Username</FormLabel>
                                <input type={'text'} onChange={(e) => setUser(u => ({ ...u, username: e.target.value }))} className="form-control" id={'login-username'} name="username" required />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                                <input type={'password'} onChange={(e) => setUser(u => ({ ...u, password: e.target.value }))} className="form-control" id={'login-password'} name="password" required />
                            </FormGroup>
                            {isSignUp &&
                                <FormGroup className="mb-3">
                                    <FormLabel htmlFor={'login-password'}>Confirm Password</FormLabel>
                                    <input type={'password'} onChange={(e) => setUser(u => ({ ...u, confirmPassword: e.target.value }))} className="form-control" id={'login-password'} name="password" required />
                                </FormGroup>}

                            <Button disabled={mutation.isLoading} type="submit" className="btn-success mt-2" id="login-btn">{isSignUp ? 'Register' : 'Login'}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
const SignUpCTA = styled(Button)<any>(({ theme }) => ({
    height: '100%'
}))

const Container = styled(Con)<any>(({ theme }) => ({
    maxWidth: '1440px',
    padding: '0 50px'
}))

const Header = styled(Flex)<any>(({ theme }) => ({
    justifyContent: 'space-between'
}))

export default Login;