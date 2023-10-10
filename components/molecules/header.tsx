import { useState } from "react";
import { Text, View } from "react-native";
import tw from 'twrnc';

const Header = (): React.ReactNode => {
  const [firstName, setFirstName] = useState<string>("Joseph");

  return (
    <View style={tw`py-3 flex flex-row items-center`}>
      <View style={tw`bg-[#D9D9D9] w-[5rem] h-[5rem] rounded-full`}></View>
      <Text style={[tw`text-white text-xl mx-4`, { fontFamily: "Raleway-Bold" }]}>
        Hello, {firstName}!
      </Text>
    </View>
  )
}

export default Header;
