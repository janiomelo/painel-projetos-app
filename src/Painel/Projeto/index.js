import React, { Component } from 'react';
import { TextField, RowField, BooleanField, DateField, ListField, InlineListField } from '../../Components/Fields';
import { TextInput, BooleanInput, DateInput, SelectInput } from '../../Components/Input';
import { Show, Edit, Create } from '../../Components/Detail';
import { List } from '../../Components/List';

/**
 * 
 * Marcos: []
 * Modulos: [,…]
 * Pessoas: [,…]
 * cliente: "AER"
 * fatura: "FAT2019-4152"
 * id: 1
 * previsaoNaVenda: "2019-12-10T00:00:00.000Z"
 * situacao: "Em andamento"
 */
export class ProjetoShow extends Component {
    render() {
        return (
            <Show
                match={this.props.match}
                history={this.props.history}
                title="Projeto"
                resource="projetos"
                urlData="projetos"
                headerField="fatura"
                rotaMeio={{ url: "/projetos", rotulo: "Projetos" }}
            >
                <RowField title="Dados Gerais">
                    <TextField className="col-sm-5" source="fatura" label="Fatura" />
                    <TextField className="col-sm-5" source="cliente" label="Cliente" />
                    <DateField className="col-sm-5" source="previsaoNaVenda" label="Previsão" />
                    <BooleanField className="col-sm-5" source="ativo" label="Ativo" />
                </RowField>
                <RowField title="Pessoas alocadas">
                    <ListField className="col-sm-12" source="Pessoas" ifEmpty="Projeto não possui pessoas alocadas.">
                        <RowField>
                            <TextField className="col-sm-2" source="id" label="Código" />
                            <TextField className="col-sm-10" source="nome" label="Nome" />
                        </RowField>
                    </ListField>
                </RowField>
                <RowField title="Módulos contratados">
                    <ListField className="col-sm-12" source="Modulos" ifEmpty="Projeto não possui módulos contratados.">
                        <RowField>
                            <TextField className="col-sm-2" source="sigla" label="Sigla" />
                            <TextField className="col-sm-10" source="nome" label="Nome" />
                        </RowField>
                    </ListField>
                </RowField>
                <RowField title="Marcos">
                    <ListField className="col-sm-12" source="Marcos" ifEmpty="Nenhum marco definido.">
                        <RowField>
                            <TextField className="col-sm-2" source="cliente" label="Cliente" />
                            <TextField className="col-sm-5" source="fatura" label="Fatura" />
                            <TextField className="col-sm-3" source="previsaoNaVenda" label="Previsão" />
                            <TextField className="col-sm-2" source="situacao" label="Situação" />
                        </RowField>
                    </ListField>
                </RowField>
            </Show>
        )
    }
}

export class ProjetoEdit extends Component {
    render() {
        return (
            <Edit
                match={this.props.match}
                history={this.props.history}
                title="Projeto"
                resource="projetos"
                urlData="projetos"
                rotaMeio={{ url: "/projetos", rotulo: "Projetos" }}
            >
                <RowField title="Dados Gerais">
                    <TextInput className="col-sm-5" source="fatura" label="Fatura" />
                    <TextInput className="col-sm-5" source="cliente" label="Cliente" />
                    <DateInput className="col-sm-5" source="previsaoNaVenda" label="Previsão" />
                    <BooleanInput className="col-sm-5" source="ativo" label="Ativo" />
                </RowField>
                <RowField title="Módulos contratados">
                    <SelectInput
                        resource="modulos" className="col-sm-12"
                        source="Modulos" isMultiple={true} />
                </RowField>
                <RowField title="Pessoas alocadas">
                    <SelectInput
                        resource="pessoas" className="col-sm-12"
                        source="Pessoas" isMultiple={true} />
                </RowField>
            </Edit>
        )
    }
}


export class ProjetoNovo extends Component {
    render() {
        return (
            <Create
                match={this.props.match}
                history={this.props.history}
                title="Novo Projeto"
                resource="projetos"
                urlData="projetos"
                rotaMeio={{ url: "/projetos", rotulo: "Projetos" }}
            >
                <RowField title="Dados Gerais">
                    <TextInput className="col-sm-5" source="fatura" label="Fatura" />
                    <TextInput className="col-sm-5" source="cliente" label="Cliente" />
                    <DateInput className="col-sm-5" source="previsaoNaVenda" label="Previsão" />
                    <BooleanInput className="col-sm-5" source="ativo" label="Ativo" />
                </RowField>
            </Create>
        )
    }
}



export class ProjetoList extends Component {
    render() {
        return (
            <List
                match={this.props.match}
                history={this.props.history}
                title="Projetos"
                resource="projetos"
                urlData="projetos"
                headerField="fatura"
                labelAdd="Novo projeto"
                checkForAction={true}>
                <RowField>
                    <TextField className="col-sm-4" source="cliente" label="Cliente" />
                    <DateField className="col-sm-6" source="previsaoNaVenda" label="Previsão" />
                    <BooleanField className="col-sm-2" source="ativo" label="Ativo" />
                </RowField>
                <RowField>
                    <InlineListField className="col-sm-6" source="Pessoas" label="Pessoas" />
                    <InlineListField className="col-sm-6" source="Modulos" label="Módulos" displayField="sigla" />
                </RowField>
            </List>
        );
    }
}