import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {store, persistor} from './src/app/redux/store';
import RootNavigator from './src/app/navigation/RootNavigator';
import Splash from './src/app/global/splash';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Splash />}
        persistor={persistor}
        onBeforeLift={() => new Promise(resolve => setTimeout(resolve, 400))}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
