const store = 3.5;
const on = Math.floor(store);
const half = Math.ceil(store - on);
const off = Math.floor(5 - on);
const starClasses = [];
if (on > 0) {

  for (let i = 1; i < on; i++) {
    starClasses.push('on');
  }
}
if (half > 0) {
  starClasses.push('half');

}
if (off > 0) {
  for (let i = 1; i < on; i++) {
    starClasses.push('off');
  }
}
console.log(starClasses);
