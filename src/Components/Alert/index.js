import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

/**
 * @visibleName Alerta padrão para feedback
 */
export class AlertDefault extends Component {
    render() {
        const { mensagem, color } = this.props;
        return (
            <Alert color={color || 'info'}>{mensagem}</Alert>
        )
    }
}

AlertDefault.propTypes = {
    mensagem: PropTypes.string.isRequired,
    color: PropTypes.string,
};