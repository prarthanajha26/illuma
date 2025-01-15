/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Rootnavigation from './src/navigator';
import {Provider} from 'react-redux';
import store from './src/redux/store/configureStore';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Rootnavigation />
    </Provider>
  );
}

export default App;
