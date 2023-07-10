import { processColor } from 'react-native';
import intelligenceTypes from './intelligence_types.json';

const colors = [processColor('#6ED490'), processColor('#9D4072'), processColor('#8B8000'), processColor('#C6B8D9'), processColor('#F2D3B5'), processColor('#BFDAED'), processColor('#1076DA')];
const COLOR =  {};
intelligenceTypes.map((type, index) => {
  console.log('type = ',type.code)

  COLOR[type.code] = colors[index]
});

export default COLOR;