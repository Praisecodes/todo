import { View } from "react-native";
import tw from "twrnc";

const AddTodoModal = (): React.ReactNode => {
  return (
    <View style={[tw`absolute h-[100%] w-[100%] flex flex-col items-baseline justify-end bg-[#00000055]`]}>
      <View style={[tw`bg-[#414045] w-[100%] py-8 rounded-t-3xl`,{zIndex: 1000}]}>

      </View>
    </View>
  )
}

export default AddTodoModal;
