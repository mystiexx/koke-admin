import React, { Component } from "react";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import "./Shop.css";
import content from "./content.js";

class Shop extends Component {
    render() {
        return (
            <div>
                <Container style={{ marginTop: 88 }}>
                    <div className="shop-input p-3">
                        <h3>Add new Item</h3>
                        <div className="line mb-3" />
                        <Form>
                            <Form.Group>
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control type="text" placeholder="item name" />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Size</Form.Label>
                                        <Form.Control as="select" placeholder="item Size">
                                            <option readOnly>--Select option--</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                            <option>XXL</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group>
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control as="select" placeholder="item Size">
                                            <option readOnly>--Select option--</option>
                                            <option>Black</option>
                                            <option>White</option>
                                            <option>Yellow</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group>
                                <Form.Label>Item Price</Form.Label>
                                <Form.Control type="text" placeholder="item price" />
                            </Form.Group>

                            <Button variant="primary">Add</Button>
                        </Form>
                    </div>
                    <Row>
                        {content.map((data, i) => {
                            return (
                                <div className="d-flex justify-content-center align-items-center">
                                    <Col>
                                        <Card border="light" key={data.id} className="mt-5">
                                            <Card.Img src={data.image} variant="top" />
                                            <Card.Body>
                                                <h3>{data.name}</h3>
                                                <h4>{data.price}</h4>
                                                <button className="add">Delete</button>
                                                <button className="btn btn-link disabled">
                                                    Edit
                                                </button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Shop;
