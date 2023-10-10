/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import tw from 'twrnc';
import { Header } from './components/molecules';

function App(): JSX.Element {
  return (
    <SafeAreaView style={tw`bg-[#414045] px-4 min-h-[100%]`}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#414045"}
      />
      <Header />

    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
