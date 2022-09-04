'use strict';

import AnalogClock from './AnalogClock.js';



document.querySelectorAll('.analog-clock').forEach(AnalogClock);


/* 시계침 없는 화면이 보이지 않도록 추가된 부분입니다.*/
const $body = document.querySelector('body');

window.addEventListener('load', () => {
    $body.style.visibility = 'visible';
})

const checkLoading = async(ms) => {
  let timer;
  await new Promise(resolve => {
    timer = setTimeout(() => resolve(), ms)
  })
  .finally(() => clearTimeout(timer));

  if(document.readyState !== 'complete'){
      $body.classList.remove("preload")
      $body.style.visibility = 'visible'

      const error = new Error(`
        발생 시각 : ${new Date()},
        발생 컴포넌트 : AnalogClock.js
      `)

      error.name = '리소스 수신이 500ms이상 지연되거나 거부되었습니다.';
      throw error;
  }
}

checkLoading(500);

