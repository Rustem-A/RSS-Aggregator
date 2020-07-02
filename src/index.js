export default (text) => {
    let res = '';
    for(let i = text.length - 1; i >= 0; i--) {
        res += text[i];
    }
    return res;
  };