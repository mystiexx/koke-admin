import React, { Component } from "react";
import {  Col,  Card } from "react-bootstrap";
import NumberFormat from "react-number-format"
import "./Shop.css";

class ShopCard extends Component {
    render() {
        const {  price, name, image, id } = this.props;

        return (
            <div>
                <div className="d-flex justify-content-center align-items-center">
                    <Col>
                        <Card border="light" key={id} className="mt-5">
                            {image.slice(0, 1).map((data, i) => {
                                return <Card.Img src={data} variant="top" />;
                            })}

                            <Card.Body>
                                <h3>{name}</h3>
                                <h4><NumberFormat
                                value={price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₦"}
                                />
                                </h4>
                                <button className="add">Delete</button>
                                <button className="btn btn-link disabled">Edit</button>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        );
    }
}

export default ShopCard;
