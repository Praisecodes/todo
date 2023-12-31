/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView, ScrollView, StatusBar, View, TouchableWithoutFeedback, Text, Alert, PermissionsAndroid } from 'react-native';
import tw from 'twrnc';
import { Header } from './components/molecules';
import { FilterButton } from './components/atoms';
import { GetNameModal, ModelView, ReminderSection, TodoListModal, UpcomingSection } from './components/templates';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCategoryStore, useTodoStore, userStore } from './zustand/AppStore';
import PushNotification, { Importance } from 'react-native-push-notification';

function App(): JSX.Element {
  const category = useCategoryStore((state: any) => state.category);
  const toggleCategory = useCategoryStore((state: any) => state.toggleCategory);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const allTodoSheetRef = useRef<BottomSheet>(null);
  const getNameSheetRef = useRef<BottomSheet>(null);
  const updateTodo = useTodoStore((state: any) => state.updateTodo);
  const todos = useTodoStore((state: any) => state.todos);
  const changeName = userStore((state: any) => state.changeFullName);
  const [name, setName] = useState<any>();

  const snapPoints = useMemo(() => [2, "45%"], []);
  const getnameSnapPoints = useMemo(() => [2, "95%"], []);

  const configureChannel = () => {
    PushNotification.createChannel(
      {
        channelId: "channel-id",
        channelName: "My channel",
        importance: Importance.HIGH,
        vibrate: true,
      }, (created: boolean) => null
    )
  }

  const getNotificationsPermission = async () => {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)) {
      console.log("Can send push notifications");
      return;
    }

    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,{
        title: "To-Do App Notification Permission",
        message: "To-Do App needs to be able to send you notifications to remind you of tasks you have.",
        buttonPositive: "Grant Permission",
        buttonNegative: "Deny Permission",
      })

      if(granted !== PermissionsAndroid.RESULTS.GRANTED){
        console.log("Permission Denied");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateTodos = async () => {
    if (todos.length > 0) return;

    try {
      const val = await AsyncStorage.getItem('todos');

      if (val !== null) {
        // console.log(val);
        updateTodo(JSON.parse(val))
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getName = async () => {
    try {
      let value = await AsyncStorage.getItem("name");

      if (value !== null) {
        changeName(value);
        setName(value);
        return;
      }

      setName(null);
    } catch (error) {
      console.error(error);
    }
  }

  const updateStorage = async () => {
    if (todos.length < 1) return;

    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
      // console.log(todos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    updateStorage();
  }, [todos])

  useEffect(() => {
    SplashScreen.hide();
    getNotificationsPermission();
    getName();
    updateTodos();
    configureChannel();
  }, [])

  return (
    <GestureHandlerRootView style={[tw`relative`]}>
      <SafeAreaView style={tw`bg-[#414045] px-[4%] h-[100%]`}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={"#414045"}
        />
        <Header />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[tw`py-2 w-[100%]`]}>
          <View>
            <View style={[tw`flex gap-3 flex-row w-[100%] py-2`]}>
              <FilterButton focus={category == "upcoming"} onPress={() => { toggleCategory("upcoming") }}>
                Upcoming To-Do's
              </FilterButton>

              <FilterButton focus={category == "done"} onPress={() => { toggleCategory("done") }}>
                Done To-Do's
              </FilterButton>
            </View>

            <ReminderSection allTodoSheetRef={allTodoSheetRef} />

            <UpcomingSection bottomSheetRef={bottomSheetRef} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <TouchableWithoutFeedback onPress={() => { bottomSheetRef.current?.snapToIndex(1) }}>
        <View style={[tw`flex flex-row absolute bottom-5 right-3 items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full bg-[#0760B2]`]}>
          <Text style={[tw`text-white text-3xl`, { fontFamily: "Nunito-Bold" }]}>
            +
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <BottomSheet keyboardBehavior='extend' backgroundStyle={[tw`bg-[#2C2B2B] rounded-t-3xl`]} ref={bottomSheetRef} enablePanDownToClose snapPoints={snapPoints} index={-1}>
        <View style={[tw`flex-1 px-5 py-3 gap-10`]}>
          <ModelView bottomSheetRef={bottomSheetRef} />
        </View>
      </BottomSheet>

      <BottomSheet backgroundStyle={[tw`bg-[#2C2B2B] rounded-t-3xl`]} ref={allTodoSheetRef} snapPoints={[2, "65%"]} index={-1}>
        <View style={[tw`flex-1 px-5 py-3 gap-8`]}>
          <TodoListModal bottomSheetRef={allTodoSheetRef} />
        </View>
      </BottomSheet>

      <BottomSheet backgroundStyle={[tw`bg-[#2C2B2B] rounded-t-3xl`]} ref={getNameSheetRef} snapPoints={getnameSnapPoints} index={name == null ? 1 : -1}>
        <View style={[tw`flex-1 px-5 py-10 gap-10`]}>
          <GetNameModal bottomSheetRef={getNameSheetRef} />
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default App;
