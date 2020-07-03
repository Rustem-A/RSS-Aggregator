import parseRss from '../src/parsers/parseRss.js';
import fs from 'fs';

test('parseRss', () => {
  const fakeData = fs.readFileSync('./__tests__/__fixtures__/fakeXML.xml');
  const parsed = parseRss(fakeData ,'mk.ru/rss/news/index.xml');
  expect(parsed.news.length).toBe(75);
  expect(parsed.channelTitle).toEqual('Новостная лента - Московский Комсомолец');
});