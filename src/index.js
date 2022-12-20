import './scss/index.scss';
import xsmb from './assets/xsmb.jpg';
console.log('test bundle splitting!');
// global.document.getElementsByClassName('card-img-top').src = xsmb;
const cardImgs = global.document.getElementsByClassName('card-img-top');
console.log(cardImgs);
cardImgs.forEach(img => img.src = xsmb);
