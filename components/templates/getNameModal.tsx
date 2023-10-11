import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Text, TextInput } from "react-native";
import tw from "twrnc";
import { userStore } from "../../zustand/AppStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetNameModal = ({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheetMethods>; }): React.ReactNode => {
  const changeName = userStore((state: any) => state.changeFullName);
  const [text, setText] = useState<string>("");

  const saveName = async () => {
    if(text == "") return;
    
    try {
      await AsyncStorage.setItem("name", text);
    } catch (error) {
      console.error(error);
    }

    changeName(text);
    bottomSheetRef.current?.close();
  }

  return (
    <>
      <Text style={[tw`text-white text-2xl`, { fontFamily: "Raleway-Bold" }]}>
        Welcome! Let's Personalize Your Experience!
      </Text>

      <View style={[tw`gap-6`]}>
        <TextInput
          placeholder="What's Your Name?"
          value={text}
          onChangeText={(e: string) => {
            setText(e);
          }}
          style={[tw`w-[100%] border border-[#ffffff] rounded-md py-3 px-4 text-base text-white`, { fontFamily: "Nunito_Regular" }]}
        />

        {/* <TouchableWithoutFeedback onPress={() => { setOpen(!open) }}>
          <Text style={[tw`border border-white rounded-md py-4 text-base px-4 w-[100%] text-white`]}>
            {todoInfo?.dateDue == "" ? "Choose Date For Todo" : todoInfo?.dateDue.toDateString()}
          </Text>
        </TouchableWithoutFeedback> */}

        <TouchableWithoutFeedback onPress={() => { saveName() }}>
          <Text style={[tw`text-center w-[100%] bg-[#0760B2] text-lg text-white py-3 rounded-md`, { fontFamily: "Raleway-Bold" }]}>
            Confirm
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

export default GetNameModal;
