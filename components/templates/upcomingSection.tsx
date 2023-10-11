import { Text, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";
import { useTodoStore } from "../../zustand/AppStore";
import { TodoCard } from "../molecules";

const UpcomingSection = ({ bottomSheetRef }: { bottomSheetRef: any; }): React.ReactNode => {
  const todoList = useTodoStore((state: any) => state.todos);

  return (
    <View style={[tw`w-[100%] mt-9 gap-9`]}>
      <View style={[tw`flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-white text-3xl`, { fontFamily: "Raleway-Bold" }]}>
          Upcoming
        </Text>

        <TouchableWithoutFeedback onPress={() => { bottomSheetRef.current.snapToIndex(1) }}>
          <View style={[tw`flex flex-col items-center justify-center w-[3rem] h-[3rem] rounded-full bg-[#4F4F4F]`]}>
            <Text style={[tw`text-white p-0 text-4xl`, { fontFamily: "Nunito-Bold" }]}>
              +
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={[tw`gap-5`]}>
        {todoList.map((todo: any, index: any) => (
          <TodoCard todo={todo} key={index} />
        ))}
      </View>
    </View>
  )
}

export default UpcomingSection;
