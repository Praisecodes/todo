import { Text, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";
import { useTodoStore } from "../../zustand/AppStore";

const UpcomingSection = (): React.ReactNode => {
  const todoList = useTodoStore((state: any) => state.todos);

  return (
    <View style={[tw`w-[100%] mt-9 gap-6`]}>
      <View style={[tw`flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-white text-2xl`, { fontFamily: "Raleway-Bold" }]}>
          Upcoming
        </Text>

        <TouchableWithoutFeedback>
          <Text style={[tw`text-white text-3xl px-[1.1rem] py-[0.5rem] text-center rounded-full bg-[#4F4F4F] text-white`]}>+</Text>
        </TouchableWithoutFeedback>
      </View>

      <View>

      </View>
    </View>
  )
}

export default UpcomingSection;
