export default ({ userInformation }) => {
    const labelInform = document.getElementById('userInformation');
    const stateInform = userInformation.slice(-6);
    labelInform.textContent = userInformation;
    labelInform.classList.remove('text-danger');
    labelInform.classList.add('text-success');
    if (stateInform === 'danger') {
      labelInform.textContent = userInformation.slice(0, -6);
      labelInform.classList.remove('text-success');
      labelInform.classList.add('text-danger');
    }
};