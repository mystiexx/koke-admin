import React, { Component } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import "./Login.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "admin",
            password: "1234",
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
        const { loading, message } = this.state;
        return (
            <div>
                <div className="log-box p-4" loading={loading} message={message}>
                    <h3 className="mb-3">log in</h3>
                    <Form>
                        <TextField
                            id="outlined-name"
                            label="Username"
                            className="text-input"
                            type="text"
                            name="name"
                            margin="normal"
                            onChange={this.handleUser}
                            required
                        />
                        <br />

                        <TextField
                            id="outlined-name"
                            label="Password"
                            className="text-input"
                            type="password"
                            name="name"
                            margin="normal"
                            onChange={this.handlePass}
                            required
                        />

                        {!loading && message && <p className="text-danger">{message}</p>}
                        <div className="d-flex justify-content-center align-items-center">
                            <Button
                                variant="primary"
                                className="mt-4"
                                disabled={loading}
                                onClick={this.login}
                            >
                                {loading ? (
                                    <Spinner animation="border" role="status" aria-hidden="true" />
                                ) : (
                                    "Log in"
                                )}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
