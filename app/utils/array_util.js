const arrayUtil = (() => {
  return {
    filterDuplicate
  }

  function filterDuplicate(items, fieldName) {
    const result = items.reduce((prevArr, current) => {
      if (prevArr.filter(item => item[fieldName] === current[fieldName]).length == 0)
        prevArr.push(current);

      return prevArr;
    }, []);
    return result
  }
})()

export default arrayUtil