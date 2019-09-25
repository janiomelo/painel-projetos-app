import React from 'react';
import createComponent from 'react-unit';
import { TextInput } from './index';

describe('TextInput', () => {
    it('consigo ver o valor', () => {
        var component = createComponent(
            <TextInput className={null} label="label" source="nome" record={{ nome: "Jose" }} />
        );
        var input = component.findByQuery("input")[0];
        expect(input.props.value).toBe("Jose");
        var label = component.findByQuery("label")[0];
        expect(label.text).toBe("label");
    });
    it('consigo construir sem registro', () => {
        var component = createComponent(
            <TextInput className={null} label={null} source="nome" />
        );
        var input = component.findByQuery("input")[0];
        expect(input.props.value).toBeUndefined();
    });
    it('consigo construir sem label', () => {
        var component = createComponent(
            <TextInput className={null} label={null} source="nome" />
        );
        var label = component.findByQuery("label")[0];
        expect(label).toBeUndefined();
    });
});