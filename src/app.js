// import validator from 'validator';
import axios from 'axios';
// import { watch } from 'melanke-watchjs';
// import $ from 'jquery';

import parseRss from './parsers/parseRss';


const proxyLink = 'https://cors-anywhere.herokuapp.com/';

export default () => {
    axios.get(`${proxyLink}mk.ru/rss/news/index.xml`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then(({ data }) => {
        const dataDocument = parseRss(data, 'mk.ru/rss/news/index.xml');
        console.log(dataDocument);
    });
}