import React, { Component } from 'react';
import { TextField, RowField, BooleanField, DateField } from '../../Components/Fields';
import { TextInput, BooleanInput, SelectInput, DateInput } from '../../Components/Input';
import { Show, Edit, Create } from '../../Components/Detail';
import { TableList } from '../../Components/TableList';

export class MarcoShow extends Component {
    render() {
        return (
            <Show
                match={this.props.match}
                history={this.props.history}
                title="Marco"
                resource="marcos"
                urlData="marcos"
                headerField="nome"
                rotaMeio={{ url: "/marcos", rotulo: "Marcos" }}
            >
                <RowField title="Dados Gerais">
                    <TextField className="col-sm-6" source="Projeto.fatura" label="Projeto" />
                    <TextField className="col-sm-6" source="titulo" label="Título" />
                    <DateField className="col-sm-6" source="previstoPara" label="Previsão" />
                    <DateField className="col-sm-6" source="concluidoEm" label="Conclusão" />
                </RowField>
            </Show>
        )
    }
}

export class MarcoEdit extends Component {
    render() {
        return (
            <Edit
                match={this.props.match}
                history={this.props.history}
                title="Módulo"
                resource="marcos"
                urlData="marcos"
                rotaMeio={{ url: "/marcos", rotulo: "Módulos" }}
            >
                <RowField title="Dados Gerais">
                    <SelectInput className="col-sm-2" source="ProjetoId" label="Projeto" resource="projetos" />
                    <TextInput className="col-sm-6" source="titulo" label="Título" />
                    <DateInput className="col-sm-4" source="previstoPara" label="Previsão" />
                    <DateInput className="col-sm-4" source="concluidoEm" label="Conclusão" />
                </RowField>
            </Edit>
        )
    }
}


export class MarcoNovo extends Component {
    render() {
        return (
            <Create
                match={this.props.match}
                history={this.props.history}
                title="Novo Marco"
                resource="marcos"
                urlData="marcos"
                rotaMeio={{ url: "/marcos", rotulo: "Marcos" }}
            >
                <RowField title="Dados Gerais">
                    <SelectInput className="col-sm-6" source="ProjetoId"
                        label="Projeto" resource="projetos" displayField="fatura" />
                    <TextInput className="col-sm-6" source="titulo" label="Título" />
                    <DateInput className="col-sm-6" source="previstoPara" label="Previsão" />
                    <DateInput className="col-sm-6" source="concluidoEm" label="Conclusão" />
                </RowField>
            </Create>
        )
    }
}



export class MarcoList extends Component {
    render() {
        return (
            <TableList
                match={this.props.match}
                history={this.props.history}
                title="Marcos"
                resource="marcos"
                urlData="marcos"
                headerField="nome"
                labelAdd="Novo marco"
                ths={["Marco", "Cliente", "Previsão", "Conclusão"]}
                checkForAction={true}>
                <RowField>
                    <TextField className="col-sm-12" source="titulo" />
                    <TextField className="col-sm-12 small text-muted" source="Projeto.fatura" />
                </RowField>
                <TextField source="Projeto.cliente" />
                <DateField source="previstoPara" />
                <DateField source="concluidoEm" />
            </TableList>
        );
    }
}