export default ({ modal }) => {
    document.getElementById('descriptionModal').textContent = modal.description;
    document.getElementById('titleModal').textContent = modal.title;
};