import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { View, TouchableWithoutFeedback, Text, TextInput } from "react-native";
import tw from "twrnc";

const GetNameModal = ({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheetMethods>; }): React.ReactNode => {
  return (
    <>
      <Text style={[tw`text-white text-2xl`, { fontFamily: "Raleway-Bold" }]}>
        Welcome! Let's Personalize Your Experience!
      </Text>

      <View style={[tw`gap-6`]}>
        <TextInput
          placeholder="What's Your Name?"
          value={""}
          onChangeText={(e: string) => {
          }}
          style={[tw`w-[100%] border border-[#ffffff] rounded-md py-3 px-4 text-base text-white`, { fontFamily: "Nunito_Regular" }]}
        />

        {/* <TouchableWithoutFeedback onPress={() => { setOpen(!open) }}>
          <Text style={[tw`border border-white rounded-md py-4 text-base px-4 w-[100%] text-white`]}>
            {todoInfo?.dateDue == "" ? "Choose Date For Todo" : todoInfo?.dateDue.toDateString()}
          </Text>
        </TouchableWithoutFeedback> */}

        <TouchableWithoutFeedback onPress={() => { }}>
          <Text style={[tw`text-center w-[100%] bg-[#7089EE] text-lg text-white py-3 rounded-md`, { fontFamily: "Raleway-Bold" }]}>
            Confirm
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

export default GetNameModal;
