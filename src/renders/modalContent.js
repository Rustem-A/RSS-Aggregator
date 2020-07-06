export default ({ modal }) => {
    const modalLabel = document.getElementById('descriptionModal');
    const modalTitle = document.getElementById('titleModal');
    modalLabel.textContent = modal.description;
    modalTitle.textContent = modal.title;
};