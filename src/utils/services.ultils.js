export default function getOptions(accessToken) {
  let headers = {};

  if (accessToken && accessToken !== '') {
    headers = {
      accesstoken: ` ${accessToken}`,
    };
  }
  const options = { headers };
  return options;
}

export class ultilities {
  // constructor() { }

  isNullOrUndefined(value) {
    if (value === undefined || value === null) return true;
    return false;
  }
}
