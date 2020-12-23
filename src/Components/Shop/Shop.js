import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap'
import './Shop.css'

class Shop extends Component {
    render(){
        return(
            <div>
                   <Container style={{ marginTop: 88 }} >
                    <div className="shop-input p-3">
                        <h3>Add new Item</h3>
                        <Form>
                            <Form.Group>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="item name"/>
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Item Size</Form.Label>
                            <Form.Control type="text" placeholder="item Size"/>
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Item Price</Form.Label>
                            <Form.Control type="text" placeholder="item price"/>
                            </Form.Group>
                        </Form>

                    </div>

                   </Container>
            </div>
        )
    }
}

export default Shop