import './scss/index.scss';
import xsmb from './assets/xsmb.jpg';
console.log('test bundle splitting!');
const cardImgs = global.document.getElementsByClassName('card-img-top');
console.log(cardImgs);
cardImgs.forEach(imgEle => {
  console.log(imgEle);
  imgEle.src = xsmb;
});

