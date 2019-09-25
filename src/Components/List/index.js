import React, { Component } from 'react';
import {
    Card, Button, CardHeader, CardBody, CardFooter, Row, Col
} from 'reactstrap';
import { BaseContainer } from "../../containers";
import { TextField } from '../../Components/Fields';
import simpleRestProvider from '../../dataProvider';
import { FaEdit, FaBars, FaTrash, FaPlus } from 'react-icons/fa';
import { DeleteModalButton } from '../ModalButtons';
import { AlertDefault } from '../Alert';
import SearchButton from '../SearchButton';
import { isEmpty } from 'lodash';
import './List.css';

export class List extends Component {
    constructor(props) {
        super(props);
        this.handleShowClick = this.handleShowClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNewlick = this.handleNewlick.bind(this);
        this.state = {
            list: [],
            loading: true
        }
    }

    componentDidMount() {
        simpleRestProvider().get(this.props.urlData)
            .then(res => {
                const list = res.data;
                this.setState({
                    list: list,
                    loading: false
                });
            })
    }

    getUrl = (id) => {
        const { resource } = this.props;
        return "/" + resource + "/" + id;
    }

    handleShowClick(id) {
        this.props.history.push(this.getUrl(id));
    }

    handleDeleteClick(id) {
        this.setState({ loading: true });
        simpleRestProvider().delete(this.getUrl(id)).then(() => {
            this.componentDidMount();
        }).catch(err => {
            this.setState({ loading: false });
        })
    }

    handleNewlick(e) {
        const { resource } = this.props;
        var url = "/" + resource + "/novo";
        this.props.history.push(url);
    }

    handleEditClick(id) {
        const { resource } = this.props;
        var url = "/" + resource + "/" + id + "/editar";
        this.props.history.push(url);
    }

    render() {
        /// TODO <div class="w-100"></div> quando quiser quebrar linha
        return (
            <BaseContainer title={this.props.title} loading={this.state.loading}>
                {!this.state.loading ? (
                    <div className="clearfix mb-4">
                        <Button
                            className="float-right"
                            size="sm"
                            onClick={this.handleNewlick}
                            color="primary"
                        >
                            <FaPlus />{" "}{this.props.labelAdd || "Novo"}
                        </Button>
                        <SearchButton />
                    </div>
                ) : null}
                <Row>
                    {!isEmpty(this.state.list) ? (
                        this.state.list.map((record, i) => {
                            return (
                                <Col lg="6" key={i}>
                                    <Card className="mb-4">
                                        <CardHeader>
                                            <TextField col="12" source={this.props.headerField} record={record} />
                                        </CardHeader>
                                        <CardBody>
                                            {React.Children.map(this.props.children, child => {
                                                return React.cloneElement(child, {
                                                    record
                                                })
                                            })}
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                className="float-left"
                                                size="sm"
                                                onClick={() => this.handleShowClick(record.id)}
                                            >
                                                <FaBars />{" Detalhes"}
                                            </Button>
                                            <DeleteModalButton
                                                className="float-right"
                                                size="sm"
                                                onClick={() => this.handleDeleteClick(record.id)}
                                                color="danger"
                                                icon={FaTrash}
                                            />
                                            <Button
                                                className="float-right mr-2"
                                                size="sm"
                                                onClick={() => this.handleEditClick(record.id)}
                                                color="primary"
                                            >
                                                <FaEdit />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            )
                        })
                    ) : (
                            !this.state.loading ? <Col>
                                <AlertDefault color="warning" mensagem="Nenhum registro encontrado." />
                            </Col> : null
                        )}
                </Row>
            </BaseContainer>
        );
    }
}