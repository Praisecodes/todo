import { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import tw from "twrnc";
import { useTodoStore } from "../../zustand/AppStore";

const ModelView = ({ bottomSheetRef }: { bottomSheetRef: any; }): React.ReactNode => {
  const [todoInfo, setTodoInfo] = useState<any>({
    "title": "",
    "dateDue": new Date(),
  });
  const addTodo = useTodoStore((state: any) => state.addTodo);

  const handleAddTodo = () => {
    addTodo?.(todoInfo);
    bottomSheetRef.current.close();
  }

  return (
    <>
      <Text style={[tw`text-white text-2xl`, { fontFamily: "Raleway-Bold" }]}>
        Add Todo
      </Text>

      <View style={[tw`gap-6`]}>
        <TextInput
          placeholder="Enter Todo Title"
          value={todoInfo?.title}
          onChangeText={(e: string) => {
            setTodoInfo((todoInfo: any) => ({ ...todoInfo, title: e }))
          }}
          style={[tw`w-[100%] border border-[#ffffff] rounded-md py-3 px-4 text-base text-white`, { fontFamily: "Nunito_Regular" }]}
        />

        <TextInput
          placeholder="Enter Todo Date"
          value={todoInfo?.dateDue}
          onChangeText={(e: any) => {
            setTodoInfo((todoInfo: any) => ({ ...todoInfo, dateDue: e }))
          }}
          style={[tw`w-[100%] border border-[#ffffff] rounded-md py-3 px-4 text-base text-white`, { fontFamily: "Nunito_Regular" }]}
        />

        <TouchableWithoutFeedback onPress={() => { handleAddTodo(); }}>
          <Text style={[tw`text-center w-[100%] bg-[#7089EE] text-lg text-white py-3 rounded-md`, { fontFamily: "Raleway-Bold" }]}>
            Add Todo
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

export default ModelView;
