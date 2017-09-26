// https://stackoverflow.com/questions/40195371/how-to-organize-react-native-with-realm-project-files
// https://github.com/realm/realm-js/blob/master/examples/ReactExample/components/todo-app.js

'use strict';

import Realm from 'realm';
import User from './data/models/user';

export default new Realm({schema: [User]});
