export default ({ inputProcess }) => {
    const inputForLink = document.getElementById('inputForLink');
    inputForLink.disabled = inputProcess.disabledInput;

    switch(inputProcess.valid) {
        case '':
            inputForLink.classList.remove('is-valid');
            inputForLink.classList.remove('is-invalid');
            break;
      
        case 'valid':
            inputForLink.classList.remove('is-invalid');
            inputForLink.classList.add('is-valid');
            break;
        
        case 'invalid':
            inputForLink.classList.remove('is-valid');
            inputForLink.classList.add('is-invalid');
            break;
      }
};