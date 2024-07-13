// App.js
import React from 'react';
import { View} from 'react-native';
import MainStack from './src/navigation/MainStack';

const App = () => {
  
  return (
    <View style={{flex:1}}>
      <MainStack/>
    </View>
  );
};

export default App;
