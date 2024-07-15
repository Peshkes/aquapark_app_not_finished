/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {ReduxApp} from './source/redux/ReduxApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ReduxApp);
