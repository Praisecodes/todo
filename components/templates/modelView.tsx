import { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import tw from "twrnc";
import { useTodoStore } from "../../zustand/AppStore";
import DatePicker from "react-native-date-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModelView = ({ bottomSheetRef }: { bottomSheetRef: any; }): React.ReactNode => {
  const [todoInfo, setTodoInfo] = useState<any>({
    "title": "",
    "dateDue": new Date(),
  });
  const addTodo = useTodoStore((state: any) => state.addTodo);
  const todos = useTodoStore((state: any) => state.todos);

  const [open, setOpen] = useState(false);

  const handleAddTodo = async () => {
    addTodo?.(todoInfo);
    
    bottomSheetRef.current.close();
  }

  const updateStorage = async() => {
    if(todos.length < 1) return;
    
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
      // console.log(todos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    console.log("this ran");
    updateStorage();
  },[todos]);

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

        <TouchableWithoutFeedback onPress={() => { setOpen(!open) }}>
          <Text style={[tw`border border-white rounded-md py-4 text-base px-4 w-[100%] text-white`]}>
            {(todoInfo?.dateDue.toISOString().split("T")[0] == new Date().toISOString().split("T")[0]) ? "Choose Date For Todo" : todoInfo?.dateDue.toDateString()}
          </Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => { handleAddTodo(); }}>
          <Text style={[tw`text-center w-[100%] bg-[#7089EE] text-lg text-white py-3 rounded-md`, { fontFamily: "Raleway-Bold" }]}>
            Add Todo
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <DatePicker
        modal
        open={open}
        date={todoInfo?.dateDue}
        onConfirm={(date) => {
          setOpen(false)
          setTodoInfo((todoInfo: any) => ({ ...todoInfo, dateDue: date }))
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default ModelView;
