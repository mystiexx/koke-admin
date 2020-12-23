import React, { Component } from "react";
import { Container } from "react-bootstrap"

class About extends Component {
    render() {
        return (
            <div>
                <Container style={{ marginTop: 88 }} >
                    <div className="v-box p-3">
                        <h3>About</h3>
                        <div className="line mb-3" />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo,
                            enim ac molestie varius, mauris ante blandit orci, quis vehicula velit
                            magna a purus. Etiam hendrerit ornare ligula. Sed dictum cursus ante,
                            auctor tincidunt est molestie ac. Nulla facilisi. Suspendisse euismod
                            velit sit amet urna egestas interdum. Sed laoreet quis nulla et tempus.
                            Nullam interdum orci vitae libero accumsan, id porttitor dolor
                            sollicitudin. Donec rutrum commodo elit ac volutpat. Vestibulum eget
                            commodo est. Orci varius natoque penatibus et magnis dis parturient
                            montes, nascetur ridiculus mus. Sed ullamcorper purus id finibus
                            iaculis. Quisque mattis lacus sit amet aliquam bibendum. Aenean sed
                            maximus arcu. Donec vestibulum diam vitae euismod ullamcorper. Orci
                            varius natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus.
                        </p>

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="add">Add</button>
                            <button className="btn btn-link disabled">Edit</button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default About;
