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
