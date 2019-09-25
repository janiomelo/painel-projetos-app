import React, { Component } from 'react';
import {
	Card, Button, Table
} from 'reactstrap';
import { BaseContainer } from "../../containers";
import simpleRestProvider from '../../dataProvider';
import { FaPlus, FaTrash, FaAtlas } from 'react-icons/fa';
import { DeleteModalButton } from '../ModalButtons';
import Checkbox from 'rc-checkbox';
import { isEmpty } from 'lodash';
import { AlertDefault } from '../Alert';
import SearchButton from '../SearchButton';

export class TableList extends Component {
	constructor(props) {
		super(props);
		this.handleShowClick = this.handleShowClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleNewlick = this.handleNewlick.bind(this);
		this.state = {
			list: [],
			selected: [],
			loading: true,
			deletando: false,
		}
	}

	componentDidMount() {
		simpleRestProvider().get(this.props.urlData)
			.then(res => {
				const list = res.data;
				this.setState(state => {
					state.list = list;
					state.loading = false;
					return state;
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

	handleDeleteClick = async () => {
		this.setState(state => { state.deletando = true; return state; });
		const { selected } = this.state;
		await selected.forEach(id => {
			simpleRestProvider().delete(this.getUrl(id)).then(() => {
				console.log(id);
			}).catch(err => {
				this.setState(state => { state.deletando = false; return state; });
			})
		});
		this.setState(state => { state.deletando = false; return state; });
		this.componentDidMount();

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

	check = (e) => {
		if (e.target.checked) {
			this.addSelected(e);
		} else {
			this.removeSelected(e);
		}
	}

	addSelected = (e) => {
		let newState = this.state;
		let selected = newState['selected'];
		selected.push(e.target.value);
		newState['selected'] = selected;
		this.setState(newState);
	}

	removeSelected = (e) => {
		let selected = this.state.selected;
		let value = e.target.value;
		let newSelected = []
		selected.forEach(s => {
			if (value !== s) newSelected.push(s);
		})
		this.setState(state => { state.selected = newSelected; return state; })
	}

	inSelected = (id) => {
		return this.state.selected.includes(id);
	}

	render() {
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
						<DeleteModalButton
							className="float-left  mr-2"
							size="sm"
							onClick={this.handleDeleteClick}
							color="danger"
							icon={FaTrash}
							idDisabled={isEmpty(this.state.selected)}
						/>
						<Button
							className="float-left"
							size="sm"
							color="primary"
							onClick={this.handleEditClick}
							disabled={isEmpty(this.state.selected)}
						>
							<FaAtlas />
						</Button>
					</div>
				) : null}

				{this.state.deletando ? (
					<AlertDefault color="info" mensagem={`Deletando registro 1 de ${this.state.selected.length}`} />
				) : null}
				{!this.state.loading ? (
					<Card body className="p-0">
						<Table responsive hover className="table-outline mb-0">
							<thead className="thead-light">
								<tr>
									{this.props.checkForAction ? (
										<th className="text-center">#</th>
									) : null}
									{!isEmpty(this.props.ths) ? (
										this.props.ths.map((th, i) => {
											return <th key={i}>{th}</th>;
										})
									) : null}
								</tr>
							</thead>
							<tbody>
								{!isEmpty(this.state.list) ? (
									this.state.list.map((record, i) => {
										return (
											<tr key={i} className={this.inSelected(record.id) ? 'table-active' : null}>
												{this.props.checkForAction ? (
													<td style={{ width: "25px" }}>
														<Checkbox value={record.id} onChange={this.check} />
													</td>
												) : null}
												{React.Children.map(this.props.children, child => {
													return (
														<td onClick={() => this.handleShowClick(record.id)} role="button">
															{React.cloneElement(child, {
																record
															})}
														</td>
													)
												})}
											</tr>
										)
									})
								) : (
										<tr>
											<td colSpan={this.props.ths.length + (this.props.checkForAction ? 1 : 0)}>
												<AlertDefault color="warning" mensagem="Nenhum registro encontrado." />
											</td>
										</tr>
									)}
							</tbody>
						</Table>
					</Card>
				) : null}
			</BaseContainer>
		);
	}
}