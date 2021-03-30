import React from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import CardDeck from 'react-bootstrap/CardDeck'
import './MainPage.css'
import SideBar from "./Sidebar"

class MainPage extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            mainData: [],
            dataFromChild: []
        }

    }
   
    handleCallback = (childData) => {
        //console.log("the data from child before set state", childData)
        this.setState({ dataFromChild: childData }, () => {
           // console.log("the data from child is ", this.state.dataFromChild)
        })
    }
    render() {
       // console.log("the data from child is ", this.state)
        return (

            <div className="parent">
                <div className="sidebar-parent">
                    <SideBar parentCallback={this.handleCallback} />
                </div>
                <div>
                    <Container className="custom-container">
                        <Row>
                            {this.state.dataFromChild.map(flight =>
                            <Col sm={12} md={6} lg={3}>
                                <Card style={{ width: '16rem', height: '25rem' }}>
                                    <div style={{}}>
                                        <Card.Img style={{ height: '10rem' }} variant="top" src={flight.links.flickr_images[0] || "https://img.icons8.com/ios/452/no-image.png"} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{flight.mission_name}</Card.Title>
                                        <Card.Text>
                                            <p>Mission Ids: <span class='text-muted'>{flight.mission_id[0]}</span></p>
                                            <p>Launch Year: <span class='text-muted'>{flight.launch_year}</span></p>
                                            <p>Successfull Launch: <span class='text-muted'>{flight.launch_success ? "True" : "False"}</span></p>
                                            <p>Successfull Landing: <span class='text-muted'>{flight.rocket.first_stage.cores.land_success}</span></p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}

                        </Row>
                    </Container>
                </div>
            </div>
        )
    }

}

export default MainPage