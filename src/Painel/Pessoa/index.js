import React, { Component } from 'react';
import { TextField, RowField, BooleanField } from '../../Components/Fields';
import { TextInput, BooleanInput } from '../../Components/Input';
import { Show, Edit, Create } from '../../Components/Detail';
import { TableList } from '../../Components/TableList';

export class PessoaShow extends Component {
    render() {
        return (
            <Show
                match={this.props.match}
                history={this.props.history}
                title="Pessoa"
                resource="pessoas"
                urlData="pessoas"
                headerField="nome"
                rotaMeio={{ url: "/pessoas", rotulo: "Pessoas" }}
            >
                <RowField title="Dados Gerais">
                    <TextField className="col-sm-5" source="nome" label="Nome" />
                    <BooleanField className="col-sm-5" source="ativo" label="Ativo" />
                </RowField>
            </Show>
        )
    }
}

export class PessoaEdit extends Component {
    render() {
        return (
            <Edit
                match={this.props.match}
                history={this.props.history}
                title="Pessoa"
                resource="pessoas"
                urlData="pessoas"
                rotaMeio={{ url: "/pessoas", rotulo: "Pessoas" }}
            >
                <RowField title="Dados Gerais">
                    <TextInput className="col-sm-5" source="nome" label="Nome" />
                    <BooleanInput className="col-sm-5" source="ativo" label="Ativo" />
                </RowField>
            </Edit>
        )
    }
}


export class PessoaNovo extends Component {
    render() {
        return (
            <Create
                match={this.props.match}
                history={this.props.history}
                title="Nova Pessoa"
                resource="pessoas"
                urlData="pessoas"
                rotaMeio={{ url: "/pessoas", rotulo: "Pessoas" }}
            >
                <RowField title="Dados Gerais">
                    <TextInput className="col-sm-5" source="nome" label="Nome" />
                    <BooleanInput className="col-sm-2" source="ativo" label="Ativo" />
                </RowField>
            </Create>
        )
    }
}



export class PessoaList extends Component {
    render() {
        return (
            <TableList
                match={this.props.match}
                history={this.props.history}
                title="Pessoas"
                resource="pessoas"
                urlData="pessoas"
                headerField="nome"
                labelAdd="Listar pessoa"
                ths={["Módulo", "Situação"]}
                checkForAction={true}>
                <RowField>
                    <TextField className="col-sm-12" source="nome" />
                </RowField>
                <BooleanField source="ativo" label="Ativo?" />
            </TableList>
        );
    }
}