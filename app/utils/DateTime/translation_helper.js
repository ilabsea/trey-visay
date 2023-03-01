export const numbers = {
  0: {km: '០', en: '0'},
  1: {km: '១', en: '1'},
  2: {km: '២', en: '2'},
  3: {km: '៣', en: '3'},
  4: {km: '៤', en: '4'},
  5: {km: '៥', en: '5'},
  6: {km: '៦', en: '6'},
  7: {km: '៧', en: '7'},
  8: {km: '៨', en: '8'},
  9: {km: '៩', en: '9'},
};

const translationHelper = (() => {
  return {
    translateNumber
  }

  function translateNumber(value, language) {
    const string = value.toString();
    let result = '';

    for (let i = 0; i < string.length; i++) {
      const text = string[i];
      result += isNaN(parseInt(text)) ? text : numbers[text][language];
    }

    return result;
  }
})();

export default translationHelper;
