import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { set, get } from 'lodash';
import { BaseContainer } from "../../containers";
import {
    Card, CardHeader, CardBody, Button, Row, Col, Form,
    UncontrolledAlert, CardFooter
} from 'reactstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import simpleRestProvider from '../../dataProvider';
import { isEmpty } from 'lodash';
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import { DeleteModalButton } from '../ModalButtons';

class Detail extends Component {
    constructor(props) {
        super(props);
    }

}

class DetailForm extends Detail {
    onChange = (e) => {
        let newRecord = this.state.record;
        if (e.target.type === "checkbox") {
            set(newRecord, e.target.name, e.target.checked);
        } else if (e.target.multiple) {
            let v = get(newRecord, e.target.name);
            v.push(e.target.value);
            set(newRecord, e.target.name, v);
        } else {
            set(newRecord, e.target.name, e.target.value);
        }
        this.setState({ record: newRecord });
    }
}

export class Show extends Detail {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            record: {},
            loading: true
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        simpleRestProvider().get(this.props.urlData + "/" + id)
            .then(res => {
                const data = res.data;
                this.setState({
                    record: data,
                    loading: false
                });
            })
    }

    handleClick(e) {
        e.preventDefault();
        const { resource } = this.props;
        var url = "/" + resource + "/";
        this.props.history.push(url);
    }

    render() {
        const { record, loading } = this.state;
        const { children, title, rotaMeio } = this.props;
        return (
            <TemplateShow
                record={record}
                children={children}
                title={title}
                loading={loading}
                handleClick={this.handleClick}
                rotaMeio={rotaMeio}
                {...this.props} />
        )
    }
}

Show.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    urlData: PropTypes.string.isRequired,
    headerField: PropTypes.string.isRequired
};


class TemplateShow extends Component {
    handleDeleteClick = (id) => {
        this.setState({ loading: true });
        simpleRestProvider().delete(this.getUrl(id)).then(() => {
            this.componentDidMount();
        }).catch(err => {
            this.setState({ loading: false });
        })
    }

    handleEditClick = (id) => {
        const { resource } = this.props;
        var url = "/" + resource + "/" + id + "/editar";
        this.props.history.push(url);
    }
    render() {
        const {
            record, children, title, loading, rotaMeio
        } = this.props;
        return (
            <BaseContainer
                title={title}
                rotaMeio={rotaMeio}
                loading={loading}>
                <Row>
                    {!isEmpty(record) ? (
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    {title}
                                    <Button
                                        className="float-right ml-2"
                                        size="sm"
                                        onClick={() => this.handleEditClick(record.id)}
                                        color="primary"
                                    >
                                        <FaEdit />{" Editar"}
                                    </Button>
                                    <Button color="secondary" size="sm" className="float-right">
                                        <FaPrint />{" Imprimir"}
                                    </Button>
                                </CardHeader>
                                <CardBody>
                                    {React.Children.map(children, child => {
                                        return React.cloneElement(child, {
                                            record
                                        })
                                    })}
                                </CardBody>
                                <CardFooter>
                                    <DeleteModalButton
                                        className="float-right"
                                        size="sm"
                                        onClick={() => this.handleDeleteClick(record.id)}
                                        color="danger"
                                        icon={FaTrash}
                                        buttonLabel={" Deletar"}
                                    />

                                </CardFooter>
                            </Card>
                        </Col>
                    ) : null}
                </Row>
            </BaseContainer>
        );
    }
}

export class Create extends DetailForm {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            record: {},
            loading: false,
            alerts: []
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { resource } = this.props;
        simpleRestProvider().post(resource, this.state.record).then(v => {
            var url = "/" + resource + "/" + v.data.id;
            this.props.history.push(url);
        }).catch(err => {
            let novosAlerts = this.state.alerts;
            let data = err.response.data;
            Object.keys(data).forEach(i => {
                novosAlerts.push({ color: "danger", message: i + ": " + data[i] })
            })
            this.setState({ alerts: novosAlerts });
        })
    }

    handleCancel(e) {
        e.preventDefault();
        const { resource } = this.props;
        var url = "/" + resource + "/";
        this.props.history.push(url);
    }

    render() {
        const { record, loading } = this.state;
        const { children, title, rotaMeio } = this.props;
        return (
            <BaseContainer
                title={title}
                loading={loading}
                rotaMeio={rotaMeio}>
                <Card>
                    <CardHeader>{title}</CardHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <CardBody>
                            {this.state.alerts.length > 0 ? (
                                this.state.alerts.map((alert, i) => {
                                    return (
                                        <UncontrolledAlert key={i} color={alert.color}>
                                            {alert.message}
                                        </UncontrolledAlert>
                                    )
                                })
                            ) : null}
                            {React.Children.map(children, child => {
                                return React.cloneElement(child, {
                                    onChange: this.onChange,
                                    record: record,
                                })
                            })}
                        </CardBody>
                        <CardFooter>
                            <Button size="sm" color="primary" type="submit">
                                <FaSave />{" Salvar"}
                            </Button>
                            <Button size="sm" onClick={this.handleCancel} type="button">
                                <FaTimes />{" Cancelar"}
                            </Button>
                        </CardFooter>
                    </Form>
                </Card>
            </BaseContainer >
        )
    }
}


export class Edit extends DetailForm {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            record: {},
            loading: true,
            alerts: []
        }
    }

    getUrl = () => {
        const { id } = this.props.match.params;
        return this.props.urlData + "/" + id;
    }

    componentDidMount() {
        simpleRestProvider().get(this.getUrl())
            .then(res => {
                const data = res.data;
                this.setState({
                    record: data,
                    loading: false
                });
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { resource } = this.props;
        simpleRestProvider().put(this.getUrl(), this.state.record).then(v => {
            var url = "/" + resource + "/" + v.data.id;
            this.props.history.push(url);
        }).catch(err => {
            let novosAlerts = this.state.alerts;
            let data = err.response.data;
            Object.keys(data).forEach(i => {
                novosAlerts.push({ color: "danger", message: i + ": " + data[i] })
            })
            this.setState({ alerts: novosAlerts });
        })
    }

    handleCancel(e) {
        e.preventDefault();
        const { resource } = this.props;
        var url = "/" + resource + "/";
        this.props.history.push(url);
    }

    render() {
        const { record, loading } = this.state;
        const { children, title, rotaMeio } = this.props;
        return (
            <BaseContainer
                title={title}
                loading={loading}
                rotaMeio={rotaMeio}>
                {!isEmpty(record) ? (
                    <Card>
                        <CardHeader>{title}</CardHeader>
                        <Form onSubmit={this.handleSubmit}>
                            <CardBody>
                                {this.state.alerts.length > 0 ? (
                                    this.state.alerts.map((alert, i) => {
                                        return (
                                            <UncontrolledAlert key={i} color={alert.color}>
                                                {alert.message}
                                            </UncontrolledAlert>
                                        )
                                    })
                                ) : null}
                                {React.Children.map(children, child => {
                                    return React.cloneElement(child, {
                                        record,
                                        onChange: this.onChange
                                    })
                                })}
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" color="primary" type="submit">
                                    <FaSave />{" Salvar"}
                                </Button>
                                <Button size="sm" onClick={this.handleCancel} type="button">
                                    <FaTimes />{" Cancelar"}
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                ) : null}
            </BaseContainer >
        )
    }
}