import React from 'react';
import { Row, Col } from 'reactstrap';
import { LabelField, SpanField } from "../../containers";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { get, isEmpty, isArray, isObject, isString } from 'lodash';
import Moment from 'react-moment';

export const RowField = ({ children, record, title, onChange, displayIf = true }) => {
    /**
     * @todo Precisa refatorar esse style da row e esse displayIf
     */
    return displayIf ? (
        <Row style={{ marginBottom: "1em" }}>

            {title ? (
                <Col sm={12}>
                    <h6 className="mb-3">{title}</h6>
                </Col>
            ) : null}

            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    record,
                    onChange
                })
            })}
        </Row>
    ) : null;
}

export const ListField = ({
    children,
    source,
    record,
    label,
    title,
    className,
    ifEmpty = null,
    row = false }) => {
    /**
     * @todo Precisa refatorar esse comportamento de row
     */
    const values = get(record, source);
    return (
        <div className={row ? "row" : (className || "")} style={{ marginBottom: "1em" }}>

            {!isEmpty(label) && !row ? (
                <LabelField>{label}</LabelField>
            ) : null}

            {title && row ? (
                <Col sm={12}>
                    <b>{title}</b>
                </Col>
            ) : null}

            {values && values.length > 0 ? (
                values.map(value => {
                    return React.Children.map(children, child => {
                        return React.cloneElement(child, {
                            record: value
                        })
                    })
                })
            ) : (
                    ifEmpty ? <Col sm={12}><small>{ifEmpty}</small></Col> : null
                )}


        </div>
    );
}

function BaseField(props) {
    return (
        <div className={!isEmpty(props.className) ? `${props.className} baseField  mb-3` : ""}>
            {!isEmpty(props.label) ? (
                <LabelField>{props.label}</LabelField>
            ) : null}
            <SpanField>{props.value ? props.value : "-"}</SpanField>
        </div>
    );
}

function cutString(strBase, rightCut = 0, leftCut = 0) {
    return strBase.substring(leftCut, strBase.length - rightCut);
}

export const InlineListField = ({ className, label, source, record = {}, displayField = "nome" }) => {
    let value = get(record, source);
    if (isArray(value)) {
        let nValue = '';
        value.forEach(v => {
            if (isObject(v) && !isString(v)) {
                nValue += get(v, displayField) + ", ";
            } else nValue += v + ", ";
        });
        value = cutString(nValue, 2);
    }
    value = value.length > 80 ? value.substring(0, 80) + "..." : value;
    return < BaseField
        className={className}
        label={label}
        value={value} />
}

export const TextField = ({ className, label, source, record = {} }) => {
    const value = get(record, source);
    return (
        <BaseField
            className={className}
            label={label}
            value={value} />
    );
}

export const DateField = ({ className, label, source, record = {} }) => {
    const value = get(record, source);
    return (
        <BaseField
            className={className}
            label={label}
            value={value ? <Moment format="DD/MM/YYYY" date={value} /> : null}
        />
    );
}

export const BooleanField = ({ className, label, source, record = {} }) => {
    const value = get(record, source);
    return (
        <BaseField
            className={className}
            label={label}
            value={value ? <FaCheck /> : <FaTimes />}
        />
    );
}