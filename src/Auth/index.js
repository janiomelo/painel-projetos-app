import React, { Component } from 'react';
import {
    Form, Input, Label, Button, FormGroup, Col, Container, Row
} from 'reactstrap';
import { isEmpty } from 'lodash';
import simpleRestProvider from '../dataProvider';
import { setToken, removeToken } from '../services/auth';

import { AlertDefault } from '../Components/Alert';

const md5 = require("md5");

export class Logar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erro: false,
            mensagem: null,
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let newState = this.state;
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState(state => {
            state.erro = false;
            state.mensagem = null;
            state.loading = true;
            return state;
        });
        if (!this.state.email || !this.state.senha) {
            this.setState(state => {
                state.erro = true;
                state.mensagem = "Informe seu e-mail e senha.";
                state.loading = false;
                return state;
            });
        } else {
            let erro, mensagem, token;
            simpleRestProvider().post('/autenticar', {
                email: this.state.email,
                senha: md5(this.state.senha)
            }).then(res => {
                if (isEmpty(res.data) || !res.data.token) {
                    mensagem = "Erro no login.";
                    erro = true;
                } else {
                    token = res.data.token;
                    erro = false;
                }
            }).catch(err => {
                erro = true;
                mensagem = err.response.data.mensagem;
            }).finally(a => {
                this.setState(state => {
                    state.erro = erro;
                    state.mensagem = mensagem;
                    state.loading = false;
                    return state;
                });
                if (!erro) {
                    setToken(token);
                    this.props.history.push("/");
                    window.location.reload();
                }
            })
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={{ size: 4, offset: 4 }}>
                        {this.state.erro ? (<AlertDefault color="danger" mensagem={this.state.mensagem} />) : null}
                        <Form>
                            <FormGroup row>
                                <Label for="email" sm={3}>E-mail</Label>
                                <Col sm={9}>
                                    <Input value={this.state.value} onChange={this.handleChange} type="email" bsSize="sm" name="email" id="email" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="senha" sm={3}>Senha</Label>
                                <Col sm={9}>
                                    <Input onChange={this.handleChange} type="password" bsSize="sm" name="senha" id="senha" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.handleSubmit} className="float-right" size="sm">Entrar</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export const Sair = (props) => {
    removeToken();
    props.history.push("/logar");
    return window.location.reload();
}
