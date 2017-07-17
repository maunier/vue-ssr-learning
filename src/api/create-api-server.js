'use strict';

import rp from 'request-promise';

export default (uri, options) => {
  const _options = Object.assign({}, options, {uri});

  return rp(_options);
}