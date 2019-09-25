import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { LabelField } from "../../containers";
import { get, isArray, isObject, isString } from 'lodash';
import Checkbox from 'rc-checkbox';
import simpleRestProvider from '../../dataProvider';
import "./Input.css";

function BaseInput({ className, value, onChange, label = undefined, type = "text", ...othres }) {
    return (
        <div className={className}>
            {label ? (
                <LabelField>{label}</LabelField>
            ) : null}
            {type === "checkbox" ? (
                <Checkbox value={value} onChange={onChange} {...othres} />
            ) : (
                    <Input bsSize="sm" value={value} type={type} onChange={onChange} {...othres} />
                )}
        </div>
    );
}

export class SelectInput extends Component {
    state = {
        options: [],
    }
    componentDidMount() {
        simpleRestProvider().get(this.props.resource).then(v => {
            this.setState({ options: v.data })
        })
    }
    render() {
        const {
            className, label, record, source, defaultId, onChange,
            idFiled = "id", displayField = "nome", isMultiple = false
        } = this.props;
        let value = get(record, source);
        if (isArray(value)) {
            let nValue = [];
            value.forEach(v => {
                if (isObject(v) && !isString(v)) {
                    nValue.push(get(v, idFiled));
                } else nValue.push(v);
            });
            value = nValue;
        }
        return (
            <div className={className}>
                {label ? (
                    <LabelField>{label}</LabelField>
                ) : null}
                <Input multiple={isMultiple} bsSize="sm" value={value ? value : defaultId} type="select" onChange={onChange} name={source}>
                    {isMultiple ? null : <option>{"-- Escolha uma opção --"}</option>}
                    {this.state.options.length > 0 ? (
                        this.state.options.map((val, i) => {
                            return (
                                <option key={i} value={get(val, idFiled)}>
                                    {get(val, displayField)}
                                </option>
                            )
                        })
                    ) : (
                            <option>Nenhuma opção disponível</option>
                        )}
                </Input>
            </div>
        );
    }
}

export class TextInput extends Component {
    onChange = (e) => {
        this.props.onChange(e);
    }
    render() {
        const { className, label, source, record = {} } = this.props;
        const value = get(record, source);
        return (
            <BaseInput
                className={className}
                value={value}
                label={label}
                onChange={this.onChange}
                type="text"
                name={source} />
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    record: PropTypes.object,
};

export const EmailInput = ({ className, label, source, onChange, record = {} }) => {
    const value = get(record, source);
    return (
        <BaseInput
            className={className}
            label={label}
            value={value}
            onChange={onChange}
            type="email"
            name={source} />
    );
}

EmailInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    record: PropTypes.object,
};

export const PasswordInput = ({ className, label, source, onChange, record = {} }) => {
    const value = get(record, source);
    return (
        <BaseInput
            className={className}
            label={label}
            value={value}
            onChange={onChange}
            type="password"
            name={source} />
    );
}

PasswordInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    record: PropTypes.object,
};

export const DateInput = ({ className, label, source, onChange, record = {} }) => {
    let value = get(record, source);
    if (value) value = value.substr(0, 10);
    return (
        <BaseInput
            className={className}
            label={label}
            value={value}
            onChange={onChange}
            type="date"
            name={source} />
    );
}

DateInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    record: PropTypes.object,
};

export const BooleanInput = ({ className, label, source, onChange, record = {} }) => {
    const value = get(record, source);
    return (
        <BaseInput
            className={className}
            label={label}
            value={value}
            onChange={onChange}
            type="checkbox"
            name={source}
            defaultChecked={value} />
    );
}