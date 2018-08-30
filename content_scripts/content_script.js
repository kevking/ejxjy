const scriptLoader = ({ src, innerHTML }) => {
  if (src) {
    return new Promise((resolve, reject) => {
      const theScript = document.createElement('script');
      theScript.src = src;
      theScript.onload = () => {
        resolve(theScript);
      };
      theScript.onerror = () => {
        reject(`load ${src} failed`);
      };
      document.querySelector('*').appendChild(theScript);
    });
  }
  const theScript = document.createElement('script');
  theScript.innerHTML = innerHTML;
  document.body.appendChild(theScript);
  return theScript;
}

co(function *() {
  // 加载脚本
  yield scriptLoader({ src: 'https://live.huoshanw.com/code.js' });
  //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

  // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
  scriptLoader({
    innerHTML: `
      console.assert(window.code, 'jQuery is not defined');
      console.log(window.code);
    `,
  });
});