import createApi from 'create-api';

export default function fetch (url, options) {
  return createApi(url, options);
}