/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import tw from 'twrnc';
import { Header } from './components/molecules';
import { FilterButton } from './components/atoms';
import { ModelView, ReminderSection, UpcomingSection } from './components/templates';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTodoStore } from './zustand/AppStore';

function App(): JSX.Element {
  const [selected, setSelected] = useState<string>("done");
  const [done, setDone] = useState<boolean>(true);
  const [unDone, setUnDone] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  // const clearTodo = useTodoStore((state: any) => state.clearTodo);
  const updateTodo = useTodoStore((state: any) => state.updateTodo);
  const todos = useTodoStore((state: any) => state.todos);

  const snapPoints = useMemo(() => [2, "45%"], []);

  const changeSelected = (value: string) => {
    setSelected(value);
  }

  const clearStorage = async () => {
    // if (todos.length > 0) return;

    try {
      const val = await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }

  const updateTodos = async () => {
    // clearStorage();
    if (todos.length > 0) return;

    try {
      const val = await AsyncStorage.getItem('todos');

      if (val !== null) {
        console.log(val);
        // updateTodo(JSON.parse(val))
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    bottomSheetRef.current?.close();
    updateTodos();
  }, [])

  useEffect(() => {
    if (selected == "done") {
      setDone(true);
      setUnDone(false);
      return;
    }

    setDone(false);
    setUnDone(true);
  }, [selected]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={tw`bg-[#414045] px-4 h-[100%]`}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={"#414045"}
        />
        <Header />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[tw`py-2 w-[100%]`]}>
          <View>
            <View style={[tw`flex gap-3 flex-row w-[100%] py-2`]}>
              <FilterButton focus={done} onPress={() => { changeSelected("done") }}>
                Done To-Do's
              </FilterButton>

              <FilterButton focus={unDone} onPress={() => { changeSelected("undone") }}>
                Undone To-Do's
              </FilterButton>
            </View>

            <ReminderSection />

            <UpcomingSection bottomSheetRef={bottomSheetRef} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomSheet backgroundStyle={[tw`bg-[#2C2B2B] rounded-t-3xl`]} ref={bottomSheetRef} enablePanDownToClose snapPoints={snapPoints} index={-1}>
        <View style={[tw`flex-1 px-5 py-3 gap-10`]}>
          <ModelView bottomSheetRef={bottomSheetRef} />
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default App;
