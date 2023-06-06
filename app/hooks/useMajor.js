import { useState, useEffect } from "react";
import listMajors from '../screens/MajorSelection/json/list_majors';
import { containsAny } from '../utils/math';

export default useMajor = (quiz) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const types = quiz.topPersonalityTypes;

  const getData = (quiz) => {
    setLoading(true);

    const majors = listMajors.filter(major => containsAny(major.personality_type + '', types)).map(x => ({ name: x.name, value: x.code }))

    setData(majors);
    setLoading(false);
  };

  useEffect(() => {
    getData(quiz);
  }, []);

  return { data, loading };
};
