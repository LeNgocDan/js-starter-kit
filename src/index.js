import './scss/index.scss';
import avatar from './assets/avatar.png';
import { rest } from './api/apiUtils';

global.document.getElementById('avatar').src = avatar;
const loadUserLink = global.document.getElementById('loadUsers');

loadUserLink.onclick = (event) => {
  event.preventDefault();
  const successCb = (result) => {
    let usersBody = "";

    result.forEach(user => {
      usersBody += `
        <tr>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        </tr> `
    });
    document.getElementById('content').innerHTML =
      `
  <h1>Users</h1>
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </thead>
    ${usersBody}
  </tbody>
  </table>
    `

    const deleteLinks = global.document.getElementsByClassName('deleteUser');
    // Must use array.from to create a real array from a DOM collection
    Array.from(deleteLinks, link => {
      link.onclick = function (event) {
        const element = event.target;
        event.preventDefault();
        rest.delete(`users/${element.attributes["data-id"].value}`, {}, (_result) => {
          console.log('delete succeeded');
        })
        const row = element.parentNode.parentNode;
        row.parentNode.removeChild(row);
      };
    });
  }
  rest.get("users", {}, successCb);
}



