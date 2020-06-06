const modal = document.getElementById('additionalInfo');
const btnCloseModal = document.getElementsByClassName('close')[0];
btnCloseModal.onclick = function () {
  modal.style.display = 'none';
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

const upperCaseFirstLetter = (word) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

window.showModalForId = (userId) => {
  const modalText = document.querySelector('#additionalInfo .modal-body');
  modalText.innerHTML = 'Data loading ...';
  modal.style.display = 'block';
  fetch(`https://hr.oat.taocloud.org/v1/user/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      modalText.innerHTML = `
      <h2>${upperCaseFirstLetter(user.title)}. ${upperCaseFirstLetter(
        user.firstName
      )} ${upperCaseFirstLetter(user.lastName)}
      </h2>
      <img src="${user.picture}">
      <p>Gender: ${user.gender}</p>
      <p>User ID: ${user.userId}</p>
      <p>Login: ${user.login}</p><p>Login: ${user.login}</p><p>Password: ${
        user.password
      }</p>
      <p>Address: ${user.address}</p>`;
      modal.style.display = 'block';
    })
    .catch(console.log);
};
