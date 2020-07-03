export default (data, linkChannel) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');

    const channel = doc.querySelector('channel');
    const items = doc.querySelectorAll('item');
    const channelTitle = channel.querySelector('title').textContent;
    const channelDesc = doc.querySelector('description').textContent;
    
    return {
        channelTitle,
        channelDesc,
        linkChannel,
        linksNews: new Set([...items].map(item => item.querySelector('link').textContent)),
        news: [...items].map(item => ({
          titleText: item.querySelector('title').textContent,
          descriptionText: item.querySelector('description').textContent,
          linkText: item.querySelector('link').textContent,
        })),
    };
};