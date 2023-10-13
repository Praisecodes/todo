import { Text, View, TextInput, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import tw from "twrnc";
import { useTodoStore } from "../../zustand/AppStore";
import React from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const TodoListModal = ({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheetMethods> }): React.ReactNode => {
  const todos = useTodoStore((state: any) => state.todos);
  const updateTodoStatus = useTodoStore((state: any) => state.updateTodoStatus);

  const handlePress = (todo: any, index: number) => {
    let status = todo.done ? false : true;
    updateTodoStatus(status, index);
  }

  return (
    <>
      <Text style={[tw`text-white text-2xl`, { fontFamily: "Raleway-Bold" }]}>
        All To-Do's
      </Text>

      <BottomSheetScrollView>
        <View style={[tw`gap-6`]}>
          {todos.map((todo: any, index: number) => (
            <TouchableWithoutFeedback key={index} onPress={() => { handlePress(todo, index) }}>
              <View style={[tw`bg-[#414045] py-3 px-4 gap-5 rounded-xl flex flex-row items-center w-[100%]`]}>
                {todo?.done ?
                  <Image
                    source={require('../../assets/icons/checked.png')}
                    style={[tw`w-[24px] h-[24px]`]}
                  />
                  :
                  <View style={[tw`bg-[#2C2B2B] w-[24px] h-[24px] rounded-sm`]}></View>
                }

                <View style={[tw`gap-2 w-[100%]`]}>
                  <Text style={[tw`text-white pr-3 text-base`, { fontFamily: "Raleway-Bold" }]}>
                    {todo.title}
                  </Text>

                  <Text style={[tw`text-[#FFFFFFC2] text-sm`, { fontFamily: "Raleway-Bold" }]}>
                    {new Date(todo.dateDue).toDateString().split(" ").join(", ")}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}

          <TouchableWithoutFeedback onPress={() => { bottomSheetRef.current?.close() }}>
            <Text style={[tw`text-center w-[100%] bg-[#0760B2] text-lg text-white py-3 rounded-md`, { fontFamily: "Raleway-Bold" }]}>
              Close
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </BottomSheetScrollView>
    </>
  )
}

export default TodoListModal;
