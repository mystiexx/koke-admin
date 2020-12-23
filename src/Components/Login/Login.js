import React, { Component } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "admin",
            password: '1234',
            user: "",
            pass: "",
            loading: false,
        };

        this.login = this.login.bind(this);
        this.handleUser = this.handleUser.bind(this);
        this.handlePass = this.handlePass.bind(this);
    }

    handleUser = (e) => {
        e.preventDefault();
        this.setState({ user: e.target.value });
    };

    handlePass = (e) => {
        e.preventDefault();
        this.setState({ pass: e.target.value });
    };

    login() {
        this.setState({ loading: true });
        const { username, password, user, pass } = this.state;

        if (user === username && pass === password) {
            this.setState({ loggedIn: true });
            localStorage.setItem("token", username);
            window.location.href = "/";
        } else {
            this.setState({ message: "invalid username/password combination" });
        }
        this.setState({ loading: false });
    }
    render() {
        const {loading, message} = this.state
        return (
            <div>
                <div className="log-box p-4" loading={loading} message={message}>
                    <h3 className="mb-3">log in</h3>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                onChange={this.handleUser}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={this.handlePass}
                            />
                        </Form.Group>

                        {!loading && message && <p className="text-danger">{message}</p>}

                        <Button
                            variant="primary"
                            disabled={loading}
                            onClick={this.login}
                            
                        >
                            {loading ? (
                                <Spinner animation="border" role="status" aria-hidden="true" />
                            ) : (
                                "Log in"
                            )}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
