import * as utils from './textUtils.js';


describe('textUtils#isChinese', () => {
  it('is chinese', () => {
    expect(utils.isChinese('中文')).toBe(true);
  })

  it('is not chinese character', () => {
    expect(utils.isChinese('，')).toBe(false);
  })

  it('is not chinese', () => {
    expect(utils.isChinese('abc')).toBe(false);
  })

  it('is not chinese', () => {
    expect(utils.isChinese(';,.')).toBe(false);
  })  
})

describe('textUtils#truncate', () => {
  it('truncate correctly with chinese', () => {
    expect(
      utils.truncate(10, '...')('I\'m the best 我是大帥哥，ＹＯＹＯＹＯ')
    ).toBe('I\'m the best 我是大帥...')
  })

  it('omitter is ... if not specify', () => {
    expect(
      utils.truncate(10)('I\'m the best 我是大帥哥，ＹＯＹＯＹＯ')
    ).toBe('I\'m the best 我是大帥...')
  })

  it('omitter can be given as a parameter', () => {
    expect(
      utils.truncate(20, 'to be continue...')('I\'m the best 我是大帥哥，ＹＯＹＯＹＯ')
    ).toBe("I'm the best 我是大帥哥，ＹＯＹＯＹＯto be continue...")
  })
});


describe('textUtils#encode', () => {
  it('should encode correctly', () => {
    const params = {
      a: 1,
      b: 2,
      c: 'string',
      d: '中文'
    };

    expect(utils.encode(params)).toBe('a=1&b=2&c=string&d=%E4%B8%AD%E6%96%87');
  });

  it('should add space correctly', () => {
    const params = {
      a: 1,
      b: 2,
      c: ' string ',
      d: ' 中文 '
    };

    expect(utils.encode(params)).toBe('a=1&b=2&c=%20string%20&d=%20%E4%B8%AD%E6%96%87%20');
  });


  it('return empty string if params is {}', () => {
    const params = {}
    expect(utils.encode(params)).toBe('');
  })

  it('can seperate with custom parameter', () => {
    const params = {
      a: 1,
      b: 2,
      c: ' string ',
      d: ' 中文 '
    };

    expect(utils.encode(params, '$')).toBe('a=1$b=2$c=%20string%20$d=%20%E4%B8%AD%E6%96%87%20');
  })

})

describe('textUtils#decode', () => {
  it('should decode correctly', () => {
    const qs = 'a=1&b=2&c=%20string%20&d=%20%E4%B8%AD%E6%96%87%20';

    const expected = {
      a: "1",
      b: "2",
      c:' string ',
      d: ' 中文 '
    };

    expect(utils.decode(qs)).toEqual(expected);  
  });  
});

describe('textUtils#formatNumber', () => {
  it('format number correctly.', () => {
    expect(utils.formatNumber(12345)).toBe('12,345');
  })

  it('format number correctly.', () => {
    expect(utils.formatNumber(12345.05)).toBe('12,345.05');
  })

  it('format number correctly.', () => {
    expect(utils.formatNumber(12456456345.05)).toBe('12,456,456,345.05');
  })
});


describe('textUtils#numToCurrency', () => {
  it('to $ currency', () => {
    expect(utils.numToCurrency(10000, {
      locale: 'TWD'
    })).toBe('$10,000')

    expect(utils.numToCurrency(10000, {
      locale: 'USD'
    })).toBe('$10,000')

    expect(utils.numToCurrency(10000, {
      locale: 'CAD'
    })).toBe('$10,000')
  })

  it('to ¥ currency', () => {
    expect(utils.numToCurrency(10000, { locale: 'JPY' }))
  })
});

describe('textUtils#numToHuman', () => {
  it('should to human size if needed', () => {
    expect(utils.numToHuman(100000.00001)).toBe('100K');
  })

  it('should to human size if needed', () => {
    expect(utils.numToHuman(10000000.00001)).toBe('10M');
  })
});

describe('textUtils#numToPercentage', () => {
  it('convert number to precentage', () => {
    expect(utils.numToPercentage(100)).toBe('100%');
  })

  it('convert number to precentage', () => {
    expect(utils.numToPercentage(0.01)).toBe('1%');
  })

  it('convert number to precentage', () => {
    expect(utils.numToPercentage(0.001)).toBe('0.1%');
  })
});

describe('textUtils#simpleFormat', () => {
  it('is format \\n to <br>', () => {
    expect(utils.simpleFormat('我是大帥哥\n\n')).toBe('我是大帥哥<br/><br/><br/>')
  });
});

describe('textUtils#isValidURL', () => {
  it('is valid URL', () => {
    expect(utils.isValidURL('https://staging.tripmoment.com/')).toBe(true)
  });

  it('files:// is not valid URL', () => {
    expect(utils.isValidURL('files://staging.tripmoment.com/')).toBe(false)
  });

  it('ftp:// is valid URL', () => {
    expect(utils.isValidURL('ftp://staging.tripmoment.com/')).toBe(true)
  });

  it('postgresql:// is not valid URL', () => {
    expect(utils.isValidURL('postgresql://staging.tripmoment.com/')).toBe(false)
  });

  it('websocket:// is not valid URL', () => {
    expect(utils.isValidURL('websocket://abc.def.com')).toBe(false)
  });

  it('localhost is not valid URL', () => {
    expect(utils.isValidURL('http://localhost:3000')).toBe(false)
  })
});