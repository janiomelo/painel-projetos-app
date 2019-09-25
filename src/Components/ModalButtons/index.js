import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';


export class DeleteModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onClick = () => {
        this.toggle();
        this.props.onClick();
    }

    render() {
        let Icon = this.props.icon;
        return (
            <div>
                <Button
                    onClick={this.toggle}
                    className={this.props.className}
                    size={this.props.size}
                    color={this.props.color}
                    disabled={this.props.idDisabled}>
                    <Icon />
                    {this.props.buttonLabel}
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Atenção!</ModalHeader>
                    <ModalBody>
                        Tem certeza que deseja excluir este registro?
                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onClick}>Confirmar</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}