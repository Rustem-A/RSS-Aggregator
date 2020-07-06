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
            submitDisabled: true,
        }
    };

    const inputForLink = document.body.querySelector('#inputForLink');
    inputForLink.addEventListener('input', (e) => {
        e.preventDefault();
        if(!validator.isURL(e.target.value)) {
            state.inputProcess.submitDisabled = true;
            state.userInformation = 'invalid url format danger';
        } else {
            state.inputProcess.submitDisabled = false;
            state.userInformation = '';
        }
    });

    const proxyLink = 'https://cors-anywhere.herokuapp.com/';
    axios.get(`${proxyLink}mk.ru/rss/news/index.xml`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then(({ data }) => {
        const dataDocument = parseRss(data, 'mk.ru/rss/news/index.xml');
    });

    watch(state, 'inputProcess', () => renders.submitDisabled(state));
    watch(state, () => renders.userInformation(state));
};
