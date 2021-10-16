import axios from 'axios';
// import getOptions from 'utils/services.ultils';

const backendUrl = 'http://52.221.245.187:90';

export async function getDataByPath(path) {
  try {
    let endpoint = `${backendUrl}`;
    if (path !== '') {
      endpoint = `${backendUrl}/${path}`;
    }
    const res = await axios.get(endpoint);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function updateDataAccount(path, data) {
  try {
    let endpoint = `${backendUrl}`;
    let body = {};
    if (path !== '') {
      endpoint = `${backendUrl}/${path}`;
    }
    if (data !== '') {
      body = data;
    }
    const res = await axios.put(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function deleteDataAccount(path) {
  try {
    let endpoint = `${backendUrl}`;
    if (path !== '') {
      endpoint = `${backendUrl}/${path}`;
    }
    const res = await axios.delete(endpoint);
    return res;
  } catch (error) {
    return error.response;
  }
}


