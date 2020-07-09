import axios from 'axios';
import parseRss from './parsers/parseRss';

const proxyLink = 'https://cors-anywhere.herokuapp.com/';

export default (url) => {
    return axios.get(`${proxyLink}${url}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(({ data }) => {
            return parseRss(data, url);
        })
};