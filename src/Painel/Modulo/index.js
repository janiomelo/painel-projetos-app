import React, { Component } from 'react';
import { TextField, RowField, BooleanField } from '../../Components/Fields';
import { TextInput, BooleanInput } from '../../Components/Input';
import { Show, Edit, Create } from '../../Components/Detail';
import { TableList } from '../../Components/TableList';

export class ModuloShow extends Component {
    render() {
        return (
            <Show
                match={this.props.match}
                history={this.props.history}
                title="Modulo"
                resource="modulos"
                urlData="modulos"
                headerField="nome"
                rotaMeio={{ url: "/modulos", rotulo: "Modulos" }}
            >
                <RowField title="Dados Gerais">
                    <TextField className="col-sm-6" source="sigla" label="Sigla" />
                    <TextField className="col-sm-6" source="nome" label="Nome" />
                    <BooleanField className="col-sm-6" source="ativo" label="Ativo" />
                </RowField>
            </Show>
        )
    }
}

export class ModuloEdit extends Component {
    render() {
        return (
            <Edit
                match={this.props.match}
                history={this.props.history}
                title="Modulo"
                resource="modulos"
                urlData="modulos"
                rotaMeio={{ url: "/modulos", rotulo: "Modulos" }}
            >
                <RowField title="Dados Gerais">
                    <TextInput className="col-sm-2" source="sigla" label="Sigla" />
                    <TextInput className="col-sm-6" source="nome" label="Nome" />
                    <BooleanInput className="col-sm-4" source="ativo" label="Ativo" />
                </RowField>
            </Edit>
        )
    }
}


export class ModuloNovo extends Component {
    render() {
        return (
            <Create
                match={this.props.match}
                history={this.props.history}
                title="Novo Modulo"
                resource="modulos"
                urlData="modulos"
                rotaMeio={{ url: "/modulos", rotulo: "Modulos" }}
            >
                <RowField title="Dados Gerais">
                    <TextInput className="col-sm-2" source="sigla" label="Sigla" />
                    <TextInput className="col-sm-6" source="nome" label="Nome" />
                    <BooleanInput className="col-sm-4" source="ativo" label="Ativo" />
                </RowField>
            </Create>
        )
    }
}



export class ModuloList extends Component {
    render() {
        return (
            <TableList
                match={this.props.match}
                history={this.props.history}
                title="Modulos"
                resource="modulos"
                urlData="modulos"
                headerField="nome"
                labelAdd="Novo modulo"
                ths={["Módulo", "Situação"]}
                checkForAction={true}>
                <RowField>
                    <TextField className="col-sm-12" source="sigla" />
                    <TextField className="col-sm-12 text-muted small" source="nome" />
                </RowField>
                <BooleanField source="ativo" label="Ativo?" />
            </TableList>
        );
    }
}