import React, { Component } from 'react';
import {
    Button, InputGroup, InputGroupAddon, Input,
    UncontrolledTooltip
} from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import './SearchButton.css';

export default class SearchButton extends Component {
    state = {
        open: false
    }
    onClick = () => {
        this.setState(state => {
            state.open = !this.state.open;
            return state;
        })
    }
    render() {
        const { open } = this.state;
        return (
            <InputGroup className="float-right mr-2 searchButton" size="sm">
                {open ? (
                    <Input bsSize="sm" />
                ) : null}
                <InputGroupAddon addonType="prepend">
                    <Button size="sm" color="link" id="searchButtonTooltip" onClick={this.onClick}>
                        <FaSearch />
                    </Button>
                    <UncontrolledTooltip placement="top" target="searchButtonTooltip">
                        Buscar um registro
                    </UncontrolledTooltip>
                </InputGroupAddon>
            </InputGroup>
        )
    }
}