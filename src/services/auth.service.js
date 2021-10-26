import axios from 'axios';
// import getOptions from 'utils/services.ultils';

const backendUrl = 'http://52.221.245.187:90';

export async function loginByPath(path, accessToken) {
  try {
    let endpoint = `${backendUrl}`;
    let body = {};
    if (path !== '') {
      endpoint = `${backendUrl}/${path}`;
    }
    if (accessToken !== '') {
      body = { access_token: `${accessToken}` };
    }
    const res = await axios.post(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}
