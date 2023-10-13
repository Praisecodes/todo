import { Text, TouchableWithoutFeedback, View, Image } from "react-native";
import tw from "twrnc";
import { useCategoryStore, useTodoStore } from "../../zustand/AppStore";
import { TodoCard } from "../molecules";
import { useEffect, useState } from "react";

const UpcomingSection = ({ bottomSheetRef }: { bottomSheetRef: any; }): React.ReactNode => {
  const [todos, setTodos] = useState<any[]>([]);
  const todoList = useTodoStore((state: any) => state.todos);
  const category = useCategoryStore((state: any) => state.category);

  useEffect(() => {
    if (category == "done") {
      setTodos([...todoList.filter((todo: any) => (todo.done))])
      return;
    }

    setTodos([...todoList.filter((todo: any) => (!todo.done))])
  }, [category, todoList]);

  return (
    <View style={[tw`w-[100%] mt-9 gap-9`]}>
      <View style={[tw`flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-white capitalize text-3xl`, { fontFamily: "Raleway-Bold" }]}>
          {category}
        </Text>

        {/* <TouchableWithoutFeedback onPress={() => {  }}>
          <Image 
            source={require("../../assets/icons/filter.png")}
            style={[tw`w-[13px] h-[17px]`]}
          />
        </TouchableWithoutFeedback> */}
      </View>

      <View style={[tw`gap-5`]}>
        {todos.map((todo: any, index: any) => (
          <TodoCard todo={todo} index={index} key={index} />
        ))}
      </View>
    </View>
  )
}

export default UpcomingSection;
