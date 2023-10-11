import { Image, Text, TouchableWithoutFeedback, View } from "react-native"
import tw from "twrnc";
import { useTodoStore, userStore } from "../../zustand/AppStore";

const TodoCard = ({ todo, index }: { todo: any; index: number; }): React.ReactNode => {
  const fullName = userStore((state: any) => state.fullName);
  const removeTodo = useTodoStore((state: any) => state.removeTodo);

  return (
    <View style={[tw`w-[100%] relative bg-[#2C2B2B] p-4 rounded-2xl gap-7`]}>
      <TouchableWithoutFeedback onPress={() => { console.log("remove task" + index); removeTodo(index); }}>
        <Image
          source={require('../../assets/icons/trash.png')}
          style={[tw`absolute top-[10px] right-[17px] w-[18px] h-[20px]`]}
        />
      </TouchableWithoutFeedback>

      <View>
        <Text style={[tw`text-white text-xl`, { fontFamily: "Raleway-Bold" }]}>
          {todo?.title}
        </Text>
        <Text style={[tw`text-base text-[#A9A8A8]`, { fontFamily: "Raleway_Regular" }]}>
          Due Date: <Text style={{ fontFamily: "Raleway-Bold" }}>{new Date(todo?.dateDue).toDateString().split(" ")[1] + " " + new Date(todo?.dateDue).toDateString().split(" ")[2]}</Text>
        </Text>
      </View>

      <Text style={[tw`text-base text-[#CABEBE]`, { fontFamily: "Raleway_Regular" }]}>
        For: <Text style={[tw`text-white`, { fontFamily: "Raleway-Bold" }]}>{`${fullName}`}</Text>
      </Text>
    </View>
  )
}

export default TodoCard;
