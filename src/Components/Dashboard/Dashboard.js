import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./Dashboard.css";
import Mission from "./Mission.js";
import Vision from "./Vision.js";
import { FaUserAstronaut } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import Page from "../../resources/landin.svg";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        };
    }

    componentDidMount(){
        this.setState({ loading: false})
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? (
                    <div className="spin">
                    <Spinner  animation="border" role="status" />
                    </div>
                ) : (
                    <Container style={{ marginTop: 88 }} f>
                        <div className="w-box p-3 mb-5">
                            <div className="d-flex justify-content-between">
                                <div className="m-h-text">
                                    <h2>Welcome</h2>
                                    <h3>Roland Enola</h3>
                                </div>
                                <img src={Page} alt='"page' className="page" />
                            </div>
                        </div>

                        <h6 className="mb-3">Overview</h6>
                        <Row>
                            <Col>
                                <div className="u-box p-2">
                                    <Row>
                                        <Col>
                                            <FaUserAstronaut className="ico p-3" />
                                        </Col>
                                        <Col md={9}>
                                            <h4 className="mt-3">Users</h4>
                                            <h5>0</h5>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col>
                                <div className="m-box p-2">
                                    <Row>
                                        <Col>
                                            <TiGroup className="m-ico p-3" />
                                        </Col>

                                        <Col md={9}>
                                            <h4 className="mt-3"> Members</h4>
                                            <h5>0</h5>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className="mt-5">
                                    <Mission />
                                </div>
                            </Col>

                            <Col>
                                <div className="mt-5">
                                    <Vision />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
            </div>
        );
    }
}

export default Dashboard;
