import React, { Component } from "react";
import {Container} from 'react-bootstrap'
import UserCard from "./UserCard.js";

class Users extends Component {
    render() {
        return (
            <div>
                <Container style={{ marginTop: 88 }}>
                    <UserCard />
                </Container>
            </div>
        );
    }
}

export default Users;
