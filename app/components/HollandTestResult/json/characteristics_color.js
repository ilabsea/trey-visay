import { processColor } from 'react-native';
import characteristics from './characteristics';

// const COLOR = {
//   R: processColor('#6ED490'),
//   I: processColor('#E5BED3'),
//   A: processColor('#FCFCB3'),
//   S: processColor('#C6B8D9'),
//   E: processColor('#F2D3B5'),
//   C: processColor('#BFDAED'),
// }
const COLOR = {}

for(let i=0; i<characteristics.length; i++) {
  COLOR[characteristics[i].shortcut] = processColor(characteristics[i].color)
}

export default COLOR;
