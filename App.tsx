/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import tw from 'twrnc';
import { Header } from './components/molecules';
import { FilterButton } from './components/atoms';
import { ReminderSection, UpcomingSection } from './components/templates';

function App(): JSX.Element {
  const [selected, setSelected] = useState<string>("done");
  const [done, setDone] = useState<boolean>(true);
  const [unDone, setUnDone] = useState<boolean>(false);

  const changeSelected = (value: string) => {
    setSelected(value);
  }

  useEffect(()=>{
    if(selected=="done"){
      setDone(true);
      setUnDone(false);
      return;
    }

    setDone(false);
    setUnDone(true);
  },[selected]);

  return (
    <SafeAreaView style={tw`bg-[#414045] px-4 min-h-[100%]`}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#414045"}
      />
      <Header />

      <ScrollView contentContainerStyle={[tw`py-2 w-[100%]`]}>
        <View style={[tw`flex gap-3 flex-row w-[100%] py-2`]}>
          <FilterButton focus={done} onPress={() => { changeSelected("done") }}>
            Done To-Do's
          </FilterButton>

          <FilterButton focus={unDone} onPress={() => { changeSelected("undone") }}>
            Undone To-Do's
          </FilterButton>
        </View>

        <ReminderSection />

        <UpcomingSection />
      </ScrollView>

    </SafeAreaView>
  );
}

export default App;
