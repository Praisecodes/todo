import { Text, TouchableWithoutFeedback, View, Image } from "react-native";
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

        {/* <TouchableWithoutFeedback onPress={() => {  }}>
          <Image 
            source={require("../../assets/icons/filter.png")}
            style={[tw`w-[13px] h-[17px]`]}
          />
        </TouchableWithoutFeedback> */}
      </View>

      <View style={[tw`gap-5`]}>
        {todoList.map((todo: any, index: any) => (
          <TodoCard todo={todo} index={index} key={index} />
        ))}
      </View>
    </View>
  )
}

export default UpcomingSection;
