import withQuery from 'with-query';

const HOST = 'http://202.55.180.200:8881';
// const HOST = 'http://10.0.10.30:8881';

const request = ({ url, method, body }) => {
  // console.log(body);
  let bearerHeader = 'Bearer ';
  const localData = JSON.parse(localStorage.getItem('persist:root'));
  // console.log(localData.auth);
  if (JSON.parse(localData.auth).data.value !== undefined) {
    bearerHeader += JSON.parse(localData.auth).data.value.access_token;
  }
  if (method === 'GET') {
    return fetch(withQuery(HOST + url, body), {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: bearerHeader,
      },
    }).then((response) => {
      // console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
  // console.log(JSON.stringify(body));
  return fetch(HOST + url, {
    credentials: 'include',
    method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: bearerHeader,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    // console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

const asyncFn = ({
  body, url, method = 'GET', model, name,
}) => async (dispatch) => {
  // console.log(body);
  const payload = {};
  dispatch({
    type: model.request,
    payload,
    name,
  });
  try {
    // console.log(model.request);
    if (model.request === 'REQUEST_LOGOUT') {
      dispatch({
        type: model.response,
        name,
      });
    } else {
      // console.log(body);
      const data = await request({ url, method, body });
      // console.log(data);
      if (!data) {
        throw new Error('no data provided');
      }

      dispatch({
        type: model.response,
        payload: data,
        name,
      });
    }
  } catch (error) {
    dispatch({
      type: model.error,
      message: error.message,
      name,
    });
  }
};

export { request, asyncFn };
