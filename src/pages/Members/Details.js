import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Members.css";

class Details extends Component {
    render() {
        return (
            <div>
                <Container style={{ marginTop: 88 }}>
                    <Row>
                        <Col md={4}>
                            <div className="f-box p-3 mb-2">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="circle" />
                                </div>
                                <h4 className="text-center mt-1">Roland Enola</h4>
                                <h5 className="text-muted text-center">aloneroland@gmail.com</h5>
                            </div>
                        </Col>

                        <Col lg={8}>
                        <div className="s-box p-3">
                            <Row>
                                <Col>
                                <h5 className="text-muted">Gender</h5>
                                    <h6>Male</h6>
                                    <hr/>
                                </Col>

                                <Col>
                                <h5 className="text-muted">Date of Birth</h5>
                                    <h6>Feb 24th, 1997</h6>
                                    <hr/>
                                </Col>

                                <Col>
                                <h5 className="text-muted">Phone Number</h5>
                                    <h6>07059606487</h6>
                                    <hr/>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                <h5 className="text-muted">Address</h5>
                                    <h6>Yenagoa, Bayelsa State</h6>
                                    <hr/>
                                </Col>

                                <Col>
                                <h5 className="text-muted">City</h5>
                                    <h6>Yenagoa</h6>
                                    <hr/>
                                </Col>

                                <Col>
                                <h5 className="text-muted">Occupation</h5>
                                    <h6>Graphics Designer</h6>
                                    <hr/>
                                </Col>

                            </Row>
                        </div>
                        
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Details;
