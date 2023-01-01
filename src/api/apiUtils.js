function createFetchConfig(method, params) {
  let body = null;
  if (params) {
    body = JSON.stringify(params);
  }

  let config = {
    method: method,
    headers: {
      'Content-Type': "application/json;charset=UTF-8"
    },
    cache: 'no-cache',
    mode: 'cors',
    credentials: 'include', //include, same-origin, omit
    body: body
  };
  return config;
}

function createUrl(baseUrl, path, params) {
  if (params) {
    path = path + '?' + Object.keys(params).map((key) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[key]);
    }).join('&')
  }

  if (path.startsWith('/')) return baseUrl + path;
  return baseUrl + '/' + path;
}

export class Rest {
  serverURL;
  restBaseUrl;

  constructor(serverUrl, restBaseURL) {
    this.serverURL = serverUrl;
    this.restBaseUrl = restBaseURL;
  }

  getServerUrl() { return this.serverURL };

  getBaseUrl() { return this.getBaseUrl };

  createRestUrl(path, params) {
    return createUrl(this.serverURL, path, params);
  }

  get(path, params, successCb, failCb) {
    let config = createFetchConfig('GET', null);
    let url = this.createRestUrl(path);
    if (params) {
      url = url + '?' + Object.keys(params).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
      }).join('&')
    }
    this.doFetch(url, config, successCb, failCb);
  }

  post(path, params, successCb, failCb) {
    let config = createFetchConfig('POST', params);
    let url = this.createRestUrl(path);
    this.doFetch(url, config, successCb, failCb);
  }

  put(path, params, successCb, failCb) {
    let config = createFetchConfig('PUT', params);
    let url = this.createRestUrl(path);
    this.doFetch(url, config, successCb, failCb);
  }

  delete(path, params, successCb, failCb) {
    let config = createFetchConfig('DELETE', params);
    let url = this.createRestUrl(path);
    this.doFetch(url, config, successCb, failCb);
  }

  formSubmit(path, formData, successCb) {
    let config = {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      body: formData
    };
    let url = this.createRestUrl(path);
    this.doFetch(url, config, successCb);
  }

  doFetch(url, config, successCallback, failCb) {
    fetch(url, config)
      .then((response) => {
        return response.json();
      }).then(response => {
        if (!response || response.error) {
          if (failCb) {
            failCb(response.error)
          } else {
            alert(`Error ${response.error}`);
          }
        } else {
          // response.data = JSON.parse(response.data);
          successCallback(response);
        }
      })
  }
}

export const rest = new Rest(process.env.API_URL, process.env.API_URL);
export const restTest = new Rest("https://glorious-terrific-leotard.glitch.me/", "https://glorious-terrific-leotard.glitch.me/");
