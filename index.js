import './shim.js'
import { AppRegistry, YellowBox } from 'react-native';
import { setup } from "./src/setup";

YellowBox.ignoreWarnings( [ 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader' ] );
console.disableYellowBox = true;

AppRegistry.registerComponent( 'eoswallet', setup, false );