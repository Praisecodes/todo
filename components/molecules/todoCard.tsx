import { Text, View } from "react-native"
import tw from "twrnc";
import { userStore } from "../../zustand/AppStore";

const TodoCard = ({ todo }: { todo: any; }): React.ReactNode => {
  const firstName = userStore((state) => state.firstName);
  const lastName = userStore((state) => state.lastName);

  return (
    <View style={[tw`w-[100%] bg-[#2C2B2B] p-4 rounded-2xl gap-6`]}>
      <View>
        <Text style={[tw`text-white text-xl`, {fontFamily: "Raleway-Bold"}]}>
          {todo?.title}
        </Text>
        <Text style={[tw`text-lg text-[#A9A8A8]`, {fontFamily: "Raleway_Regular"}]}>
          Due Date: <Text style={{fontFamily: "Raleway-Bold"}}>{new Date(todo?.dateDue).toLocaleString()}</Text>
        </Text>
      </View>

      <Text style={[tw`text-base text-[#CABEBE]`, {fontFamily: "Raleway_Regular"}]}>
        For: <Text style={[tw`text-white`, {fontFamily: "Raleway-Bold"}]}>{`${firstName} ${lastName}`}</Text>
      </Text>
    </View>
  )
}

export default TodoCard;
