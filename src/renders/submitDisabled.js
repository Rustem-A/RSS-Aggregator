export default ({ inputProcess, userInformation }) => {
    const submit = document.querySelector('#submit');
    submit.disabled = inputProcess.submitDisabled;
    if(userInformation === 'please, standby') {
      submit.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
    } else {
      submit.textContent = 'Add Link';
    }
  };