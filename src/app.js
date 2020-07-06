import validator from 'validator';
import axios from 'axios';
import { watch } from 'melanke-watchjs';
// import $ from 'jquery';

import * as renders from './renders/index.js';
import parseRss from './parsers/parseRss';

export default () => {
    const state = {
        inputProcess: {
            submitDisabled: true,
        }
    };

    const inputForLink = document.body.querySelector('#inputForLink');
    inputForLink.addEventListener('input', (e) => {
        e.preventDefault();
        if(!validator.isURL(e.target.value)) {
            state.inputProcess.submitDisabled = true;
        } else {
            state.inputProcess.submitDisabled = false;
        }
    });

    const proxyLink = 'https://cors-anywhere.herokuapp.com/';
    axios.get(`${proxyLink}lorem-rss.herokuapp.com/feed`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then(({ data }) => {
        const dataDocument = parseRss(data, 'mk.ru/rss/news/index.xml');
        console.log(dataDocument);
    });

    watch(state, 'inputProcess', () => renders.submitDisabled(state));
};
