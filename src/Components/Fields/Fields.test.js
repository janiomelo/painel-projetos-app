import React from 'react';
import createComponent from 'react-unit';
import { TextField, DateField } from './index';

describe('TextField', () => {
    it('consigo ver o valor', () => {
        var component = createComponent(
            <TextField className={null} label="label" source="nome" record={{ nome: "Jose" }} />
        );
        var span = component.findByQuery("span")[0];
        expect(span.text).toBe("Jose");
        var label = component.findByQuery("label")[0];
        expect(label.text).toBe("label");
    });
    it('consigo construir sem registro', () => {
        var component = createComponent(
            <TextField className={null} label={null} source="nome" />
        );
        var span = component.findByQuery("span")[0];
        expect(span.text).toBe("-");
    });
    it('consigo construir sem label', () => {
        var component = createComponent(
            <TextField className={null} label={null} source="nome" />
        );
        var label = component.findByQuery("label")[0];
        expect(label).toBeUndefined();
    });
});