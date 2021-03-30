
import React from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Sidebar.css'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom';


class SideBar extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            originalDataYear: [],
            originalData: [],
            launchTrueData: [],
            landTrue: false

        }
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        fetch("https://api.spaceXdata.com/v3/launches?limit=100")
            .then(response => response.json())
            .then(data => {
                let a = [];
                data.forEach(element => {
                    if (!a.includes(element.launch_year))
                        a.push(element.launch_year)
                });
                this.setState({ originalDataYear: a }, () => {
                    this.setState({ originalData: data }, () => {
                        this.props.parentCallback(this.state.originalData)
                    })
                })
            })

    }
    handleTrueForLaunch = () => {
        let params = queryString.parse(window.location.search);


        params.limit = 100;
        params.launch_success = true;
        console.log("launch true", params)
        fetch(`https://api.spacexdata.com/v3/launches?${queryString.stringify(params)}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ originalData: data }, () => {
                    this.props.parentCallback(this.state.originalData)
                })
            })

        window.history.pushState({}, null, `/?${queryString.stringify(params)}`)
            ;


    }
    handleFalseForLaunch = () => {

        let params = queryString.parse(window.location.search);
        params.limit = 100;
        params.launch_success = false;
        console.log("launch false", params)
        fetch(`https://api.spacexdata.com/v3/launches?${queryString.stringify(params)}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ originalData: data }, () => {
                    this.props.parentCallback(this.state.originalData)
                })
            })

        window.history.pushState({}, null, `/?${queryString.stringify(params)}`)
    }
    handleTrueForLand = () => {

        let params = queryString.parse(window.location.search);
        console.log(" the params here is ", params)

        params.land_success = true;
        console.log("landing true", params)
        fetch(`https://api.spacexdata.com/v3/launches?${queryString.stringify(params)}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ originalData: data }, () => {
                    this.props.parentCallback(this.state.originalData)
                })
            })

        window.history.pushState({}, null, `/?${queryString.stringify(params)}`)


    }

    handleFalseForLand = () => {

        let params = queryString.parse(window.location.search);
        console.log(" the params here is ", params)

        params.land_success = false;
        console.log("landing false", params)
        fetch(`https://api.spacexdata.com/v3/launches?${queryString.stringify(params)}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ originalData: data }, () => {
                    this.props.parentCallback(this.state.originalData)
                })
            })


        window.history.pushState({}, null, `/?${queryString.stringify(params)}`)
    }

    itemClicked = (item) => {
        console.log(" item clicked", item)

        let params = queryString.parse(window.location.search);


        params.limit = 100;
        params.launch_year = item;
        console.log("launch year", params)
        fetch(`https://api.spacexdata.com/v3/launches?${queryString.stringify(params)}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ originalData: data }, () => {
                    this.props.parentCallback(this.state.originalData)
                })
            })

        window.history.pushState({}, null, `/?${queryString.stringify(params)}`)
    }
    render() {

        return (
            <React.Fragment>
                <div className="sidebar">
                    <h4>Filters</h4>
                    <label style={{ justifyContent: "center", display: "flex" }}>Launch Year</label>
                    <p>--------------------------------------</p>
                    <Container>
                        <Row>
                            {this.state.originalDataYear.map(item =>

                                <Col>

                                    <button type="button" class="btn btn-success" onClick={() => this.itemClicked(item)}>{item}</button>
                                </Col>

                            )}

                        </Row>
                    </Container>
                    <br />
                    <label style={{ justifyContent: "center", display: "flex" }}>Successful Launch</label>
                    <p>--------------------------------------</p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <button type="button" class="btn btn-success" onClick={this.handleTrueForLaunch} >True</button>
                        <button type="button" class="btn btn-success" onClick={this.handleFalseForLaunch}>False</button>
                    </div>
                    <br />
                    <br />
                    <label style={{ justifyContent: "center", display: "flex" }}>Successful Landing</label>
                    <p>--------------------------------------</p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <button type="button" class="btn btn-success" onClick={this.handleTrueForLand}>True</button>
                        <button type="button" class="btn btn-success" onClick={this.handleFalseForLand}>False</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SideBar;