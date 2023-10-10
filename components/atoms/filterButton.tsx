import { Text, TouchableWithoutFeedback } from "react-native";
import tw from "twrnc";

const FilterButton = ({ children, onPress, focus }: { children: string; onPress: () => any; focus: boolean; }): React.ReactNode => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={[tw`text-[#000000] ${focus ? "opacity-100" : "opacity-80"} bg-white px-5 py-2 rounded-full`, { fontFamily: "Raleway-Bold" }]}>
        {children}
      </Text>
    </TouchableWithoutFeedback>
  )
}

export default FilterButton;
