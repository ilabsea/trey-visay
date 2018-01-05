export default class MathUtil {
  static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  static findMaxObjBy(arr, property) {
    return arr.reduce(function(prev, current) {
      return (prev[property] > current[property]) ? prev : current;
    })
  }

}
