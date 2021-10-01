import React, { Component } from "react";
import axios from "axios";

export class ShowConnection extends Component{
    constructor(props) {
        super(props);

        this.state = {
            msg: "no connection"
        };

        axios.get("http://localhost:5000/")
            .then ( (res) => {
                console.log("called backend");
                this.setState({msg: res.data});
                }
            );
        console.log(this.state.msg);
    }

    render () {
        return (<h1>{this.state.msg}</h1>
        );
    }
    
}
