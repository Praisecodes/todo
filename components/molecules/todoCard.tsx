import { Text, View } from "react-native"
import tw from "twrnc";
import { userStore } from "../../zustand/AppStore";

const TodoCard = ({ todo }: { todo: any; }): React.ReactNode => {
  const fullName = userStore((state:any) => state.fullName);

  return (
    <View style={[tw`w-[100%] bg-[#2C2B2B] p-4 rounded-2xl gap-7`]}>
      <View>
        <Text style={[tw`text-white text-xl`, {fontFamily: "Raleway-Bold"}]}>
          {todo?.title}
        </Text>
        <Text style={[tw`text-base text-[#A9A8A8]`, {fontFamily: "Raleway_Regular"}]}>
          Due Date: <Text style={{fontFamily: "Raleway-Bold"}}>{new Date(todo?.dateDue).toDateString().split(" ")[1] + " " + new Date(todo?.dateDue).toDateString().split(" ")[2]}</Text>
        </Text>
      </View>

      <Text style={[tw`text-base text-[#CABEBE]`, {fontFamily: "Raleway_Regular"}]}>
        For: <Text style={[tw`text-white`, {fontFamily: "Raleway-Bold"}]}>{`${fullName}`}</Text>
      </Text>
    </View>
  )
}

export default TodoCard;
