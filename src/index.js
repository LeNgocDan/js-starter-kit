import './index.css'
import { getUsers, deleteUser } from './api/userApi';
import avatar from './assets/avatar.png';

global.document.getElementById('avatar').src = avatar;

const loadUserLink = global.document.getElementById('loadUsers');
loadUserLink.onclick = (event) => {
  event.preventDefault();
  getUsers().then(result => {
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
      <tbody id="users">
    ${usersBody}
   </tbody>
    </table>`
  });
}

const deleteLinks = global.document.getElementsByClassName('deleteUser');
// Must use array.from to create a real array from a DOM collection
Array.from(deleteLinks, link => {
  link.onclick = function (event) {
    const element = event.target;
    event.preventDefault();
    deleteUser(element.attributes["data-id"].value);
    const row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
  };
});

