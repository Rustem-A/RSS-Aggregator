import validator from 'validator';
import axios from 'axios';
import { watch } from 'melanke-watchjs';
// import $ from 'jquery';

import * as renders from './renders/index.js';
import parseRss from './parsers/parseRss';

export default () => {
    const state = {
        userInformation: '',
        inputProcess: {
            inputDisabled: false,
            submitDisabled: true,
            valid: '',
        },
        channels: [],
        articleLinks: new Set(),
    };

    const inputForLink = document.body.querySelector('#inputForLink');
    inputForLink.addEventListener('input', (e) => {
        e.preventDefault();
        if(!validator.isURL(e.target.value)) {
            state.inputProcess.submitDisabled = true;
            state.userInformation = 'invalid url format danger';
            state.inputProcess.valid = 'invalid';
        } else {
            state.inputProcess.submitDisabled = false;
            state.userInformation = '';
            state.inputProcess.valid = 'valid';
        }
    });

    const form = document.body.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.inputProcess.submitDisabled = true;
        state.inputProcess.inputDisabled = true;
        state.userInformation = 'please, standby';
        const proxyLink = 'https://cors-anywhere.herokuapp.com/';
        axios.get(`${proxyLink}${inputForLink.value}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(({ data }) => {
            const dataDocument = parseRss(data, inputForLink.value);
            console.log(data);
            state.channels = [dataDocument, ...state.channels];
        })
        .then(() => {
            state.articleLinks.add(inputForLink.value);
            state.inputProcess.inputDisabled = false;
            state.inputProcess.submitDisabled = false;
            state.userInformation = 'Loaded';
          })
        .catch((err) => {
            state.userInformation = 'Oops, something went wrong danger';
            state.inputProcess.disabledInput = false;
            state.inputProcess.disabledSubmit = true;
            console.log(err);
          });
    });

    watch(state, 'inputProcess', () => renders.submitDisabled(state));
    watch(state, () => renders.userInformation(state));
    watch(state, 'inputProcess', () => renders.inputEvent(state));
};
