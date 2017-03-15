import { pipe, split, prop, compose } from 'ramda';

export const isChinese = (str) => {
  return  /[\u0800-\u9fa5]+/.test(str);
}

export const truncate = (length, omitter = '...') => (str) => {
  let truncated = '';
  while (length > 0) {
    truncated += str.slice(0, 1);
    
    if (isChinese(str.slice(0, 1))) {
      length--;
    } else {
      length -= 0.5;
    }
    str = str.slice(1, str.length);
  }

  return truncated + omitter;
}

export const decode = (str) => {
  return str.split('&')
    .map(pair => {
        const parts = pair.split('=', 2);
        if (parts[0] && parts[1]) {
          return {
            [parts[0]]: decodeURIComponent(parts[1])
          }
        }
        return {}
    })
    .reduce((acc, obj) => Object.assign({}, acc, obj))
}

export const encode = (params = {}, seperator = '&', encode) => {
  if (typeof params !== 'object') { throw Error('fuck')}
  encode = encode === false ? function(s) { return s; } : encodeURIComponent;
  return Object.keys(params)
    .map(key => `${key}=${encode(params[key])}`)
    .join(seperator)
}

export const formatNumber = (num) => {
  const numberString = num.toString()
  const numberParts = numberString.split('.')
  const n = numberParts[0] + (numberParts[1] ? '.' + numberParts[1].slice(0,2) : '')

  return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numToCurrency = (number, options = {
  locale: 'tw',
}) => {
  const locale = prop('locale')(options);
  const currency = {
    tw: '$'
  };
  const getCurrency = (num) => prop(locale.toLowerCase())(currency) + num;

  return compose(
    getCurrency,
    formatNumber,
  )(number);
}

/**
 * change raw number to human readable.
 * 
 * ex: numToHuman(10000) => 10K
 * @param  {String or Number} number
 * @return {String}
 *
 * [TODO]
 */
export const numToHuman = (number) => {
  // [FIXME]
  // 需要更完整的計算跟 test case
  if (Math.floor(number / 1000) > 1 && Math.floor(number / 1000) <= 100) {
    return Math.floor(number / 1000) + 'K';
  } 
  if (Math.floor(number/ 1000000) > 1 && Math.floor(number/ 1000000) < 100) {
    return Math.floor(number / 1000000) + 'M';
  }
}

// just return / 100 + '%'
export const numToPercentage = (number) => {
  number = parseFloat(number, 10);
  if (number > 1) {
    return number + '%';
  } else if (number < 1 && number > 0) {
    return number * 100 + '%';
  } else {

  }

  
}