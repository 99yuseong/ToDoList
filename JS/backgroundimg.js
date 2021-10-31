// background img database
const bgimg = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

const body = document.querySelector("body");

console.log(`url(./src/background-img/${bgimg[Math.floor(Math.random() * bgimg.length)]})`);
body.style.backgroundImage = `url(./src/background-img/${bgimg[Math.floor(Math.random() * bgimg.length)]})`;
