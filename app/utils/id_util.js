export default function randomId() {
  return 'xxxxxxxx'.replace(/x/g, function (c) {
    var r = Math.random() * 16 | 0;
    return r.toString(16);
  });
}