import React from 'react';
import createComponent from 'react-unit';
import axios from 'axios';
import { Show } from './index';

jest.mock('axios');

describe('Show', () => {
    it('consigo construir componente', () => {
        const getSpy = jest.spyOn(axios, 'create');
        var component = createComponent(
            <Show
                match={{ params: '' }}
                history={{}}
                title="Title"
                resource="resource"
                urlData="url-data"
                headerField="field" />
        );
        var label = component.findByQuery("h2")[0];
        expect(label.text).toBe("Title");
    });
});