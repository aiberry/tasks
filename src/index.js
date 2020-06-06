import './test-takers-list.css';
import './modal.css';
import './modal';

class TestTakersList extends HTMLElement {
  constructor() {
    super();
    this.users = [];
    this.sotrItems = this.sotrItems.bind(this);
    this.fillUsersList = this.fillUsersList.bind(this);
    this.clearUsersList = this.clearUsersList.bind(this);
    this.sortingOrder = 'unsorted';
  }
  sotrItems() {
    switch (this.sortingOrder) {
      case 'up':
        this.users = this.users.sort((a, b) =>
          `${a.firstName}${a.lastName}` < `${b.firstName}${b.lastName}` ? 1 : -1
        );
        this.sortingOrder = 'down';
        break;
      case 'down':
        this.users = this.users.sort((a, b) =>
          `${a.firstName}${a.lastName}` > `${b.firstName}${b.lastName}` ? 1 : -1
        );
        this.sortingOrder = 'up';
        break;
      default:
        this.users = this.users.sort((a, b) =>
          `${a.firstName}${a.lastName}` > `${b.firstName}${b.lastName}` ? 1 : -1
        );
        this.sortingOrder = 'up';
        break;
    }
    this.clearUsersList();
    this.fillUsersList();
  }

  clearUsersList() {
    const list = document.querySelector('test-takers-list');
    while (list.querySelector('.userFullName')) {
      list.removeChild(document.querySelector('.userFullName'));
    }
  }

  fillUsersList() {
    this.innerHTML += this.users

      .map(
        (user) =>
          `<p class="userFullName" onclick="showModalForId(${
            user.userId
          })">${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(
            1
          )} ${user.lastName.charAt(0).toUpperCase()}${user.lastName.slice(1)}</p>`
      )
      .join('');
  }

  connectedCallback() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id == 'sortBtn') {
        this.sotrItems();
      }
    });
    fetch('https://hr.oat.taocloud.org/v1/users?limit=30&offset=0')
      .then((response) => response.json())
      .then((users) => {
        this.users = users;
        this.fillUsersList();
      });
  }
}
window.customElements.define('test-takers-list', TestTakersList);
