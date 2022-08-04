const parseCookies = () => {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {});
};

// const getCookie = (name) => {
//   const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
//   return cookieValue ? cookieValue[2] : null;
// }

// export default getCookie;

export default parseCookies;