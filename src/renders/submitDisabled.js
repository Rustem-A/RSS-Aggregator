export default ({ inputProcess }) => {
    const submit = document.querySelector('button');
    submit.disabled = inputProcess.submitDisabled;
  };