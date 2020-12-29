import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import members from "./content.js";
import User from "../../resources/male.jpg";
import "./Members.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";

class Members extends Component {
    constructor() {
        super();
        this.state = {
            content: members,
        };
    }
    render() {
        const { content } = this.state;
        return (
            <div>
                <Container style={{ marginTop: 88 }}>
                    <h2>2 members</h2>
                    <div className="d-flex justify-content-between">
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Search..."/>
                            </Form.Group>
                        </Form>
                        <Breadcrumbs aria-label="breadcrumb" className="mb-2">
                        <Link color="inherit" href="/members">
                            Members
                        </Link>
                        <Link color="inherit">
                            information
                        </Link>
                    </Breadcrumbs>
                    </div>
                   
                    {content.map((data, index) => (
                        <div>
                            <Link to={`/members/information/${index}`} className="m-link">
                            <div className="members p-2 mb-3" key={index}>
                                <div className="d-flex flex-row ">
                                    <img src={User} alt="member" className="mt-2" />

                                    <h4 className="ml-2 mt-4">{data.name}</h4>
                                    <h4 className="ml-3 mt-4">{data.number}</h4>
                                    <h4 className="ml-3 mt-4">{data.city}</h4>
                                    <h4 className="ml-3 mt-4">{data.proffession}</h4>
                                    <h4 className="ml-3 mt-4">{data.email}</h4>
                                    <FiEdit className="m-icon mt-4 ml-4" />
                                    <h4 className="ml-1 mt-4">Edit</h4>
                                    <RiDeleteBin5Line className="m-icon-del mt-4 ml-4" />
                                    <h4 className="mt-4 ml-1">Delete</h4>
                                </div>
                            </div>
                            </Link>
                        </div>
                    ))}
                </Container>
            </div>
        );
    }
}

export default Members;
