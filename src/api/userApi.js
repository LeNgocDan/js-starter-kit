

export function getBaseUrl() {
  const inDevelopment = window.location.hostname === 'localhost'
  return inDevelopment ? 'http://localhost:3001/' : "/";
}


function getQueryStringParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const baseUrl = getBaseUrl();

/*
  function getBaseUrl() {
    return getQueryStringParameterByName("useMockApi")
      ? "http://localhost:3001/"
      : "/";
  }

  */

export function getUsers() {
  return get("users");
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  })

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}


