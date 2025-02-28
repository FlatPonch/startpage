const { setCookie, getCookie, deleteCookie } = require('../cookieUtils');

test('set and retrieve cookie', () => {
    setCookie('testCookie', 'testValue', 1);
    expect(getCookie('testCookie')).toBe('testValue');
});

test('delete cookie', () => {
    setCookie('testCookie', 'testValue', 1);
    deleteCookie('testCookie');
    expect(getCookie('testCookie')).toBeUndefined();
});