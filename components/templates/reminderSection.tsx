import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";

const ReminderSection = (): React.ReactNode => {
  const monthToAbbr = (month: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[month];
  }

  return (
    <View style={[tw`mt-4 w-[100%]`]}>
      <View style={[tw`flex w-[100%] flex-row items-start justify-between`]}>
        <Text style={[tw`text-[3.4rem] text-white flex-1`, { fontFamily: "Raleway-Bold" }]}>
          Track your <Text style={[tw`text-[3.2rem] text-[#FFFFFFC2]`, { fontFamily: "Raleway-Bold" }]}>tasks</Text>
        </Text>

        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={[tw`flex flex-row items-center gap-1 mt-5`]}>
            <Text style={[tw`text-sm text-white`, { fontFamily: "Raleway-Bold" }]}>
              {`${monthToAbbr(new Date().getMonth())}, ${new Date().getFullYear()}`}
            </Text>
            <Image
              source={require('../../assets/icons/angle-down.png')}
              alt="Angle Down"
              style={[tw`w-[7px] h-[4px]`]}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default ReminderSection;
