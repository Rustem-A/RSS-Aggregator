import validator from 'validator';
import { watch } from 'melanke-watchjs';
import $ from 'jquery';

import * as renders from './renders/index.js';
import scrollUp from './scrollUp.js';
import axiosGet from './axiosGet.js';

export default (ajaxFoo = axiosGet) => {
    const state = {
        userInformation: '',
        inputProcess: {
            inputDisabled: false,
            submitDisabled: true,
            valid: '',
        },
        channels: [],
        articleLinks: new Set(),
        modal: {
            title: '',
            description: '',
        },
        updateChannel: false,
        exampelButtons: 'active',
    };

    const validate = () => {
        if (!validator.isURL(inputForLink.value)) {
            state.inputProcess.submitDisabled = true;
            state.userInformation = 'invalid URL format danger';
            state.inputProcess.valid = 'invalid';
        } else if (state.articleLinks.has(inputForLink.value)) {
            state.userInformation = 'A channel with such URL has already been added danger';
            state.inputProcess.valid = 'invalid';
            state.inputProcess.submitDisabled = true;
        } else {
            state.inputProcess.submitDisabled = false;
            state.userInformation = '';
            state.inputProcess.valid = 'valid';
        }
    };

    scrollUp();

    const inputForLink = document.body.querySelector('#inputForLink');
    inputForLink.addEventListener('input', (e) => {
        e.preventDefault();
        validate();
    });

    const btnLink1 = document.getElementById('Examle#1');
    const btnLink2 = document.getElementById('Examle#2');
    const handlerForBtnLink = (url) => {
        inputForLink.focus();
        inputForLink.value = url;
        validate();
    };
    btnLink1.addEventListener('click', () => {
        handlerForBtnLink('https://lenta.ru/rss/news');
    });
    btnLink2.addEventListener('click', () => {
        handlerForBtnLink('https://www.mk.ru/rss/news/index.xml');
    });

    const form = document.body.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.inputProcess.submitDisabled = true;
        state.inputProcess.inputDisabled = true;
        state.userInformation = 'please, standby';
        state.exampelButtons = 'disabled';

        ajaxFoo(inputForLink.value)
            .then((dataDocument) => {
                state.channels = [dataDocument, ...state.channels];
                state.articleLinks.add(inputForLink.value);
                inputForLink.value = '';
                state.inputProcess.inputDisabled = false;
                state.inputProcess.submitDisabled = false;
                state.userInformation = 'Loaded';
                state.updateChannel = true;
                state.exampelButtons = 'active';
            })
            .catch((err) => {
                state.userInformation = 'Oops, something went wrong danger';
                state.inputProcess.inputDisabled = false;
                state.inputProcess.submitDisabled = true;
                state.exampelButtons = 'active';
                console.log(err);
            });
    });
    document.querySelector('#submit').click();
    $('#modal')
        .on('show.bs.modal', (event) => {
            const button = $(event.relatedTarget);
            state.modal.title = button.data('title');
            state.modal.description = button.data('description');
        });

    const updateChannel = () => {
        state.channels.forEach(({ linkChannel, linksNews, news, }) => {
            ajaxFoo(linkChannel)
                .then((data) => {
                    const linksNewsData = data.linksNews;
                    const newsData = data.news;
                    linksNewsData.forEach((link) => {
                        if (!linksNews.has(link)) {
                            linksNews.add(link);
                            newsData.forEach((n) => {
                                if (n.linkText === link) {
                                    news.unshift(n);
                                }
                            });
                        }
                    });
                }).then(() => {
                    setTimeout(updateChannel, 5000);
                })
                .catch((err) => {
                    console.log(err);
                    setTimeout(updateChannel, 5000);
                })
        });
    };

    watch(state, 'inputProcess', () => renders.submitDisabled(state));
    watch(state, () => renders.userInformation(state));
    watch(state, 'inputProcess', () => renders.inputEvent(state));
    watch(state, 'channels', () => renders.channel(state));
    watch(state, 'modal', () => renders.modalContent(state));
    watch(state, 'updateChannel', () => setTimeout(updateChannel, 5000));
    watch(state, 'exampelButtons', () => renders.exampelButtons(state));
};
