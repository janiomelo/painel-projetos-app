import React, { Component } from 'react';
import { isAuthenticated } from "../services/auth";
import { Redirect } from "react-router-dom";

export class Home extends Component {
    render() {
        return (
            isAuthenticated() ? (
                <h2>Home</h2>
            ) : (
                    <Redirect to={{ pathname: "/logar", state: { from: this.props.location } }} />
                )
        )
    }
}
