import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';

import AppWithNavigationState from './src/auth';
import store from './src/store';
const App = () => {
    return (
      <StoreProvider store={store}>
        <SafeAreaView style={{flex:1}}>
          <PaperProvider>
             <AppWithNavigationState/>
           </PaperProvider>
        </SafeAreaView>
      </StoreProvider>
    );
 }

export default App;
