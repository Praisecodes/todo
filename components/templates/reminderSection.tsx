import { useState } from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";
import { userStore } from "../../zustand/AppStore";

const ReminderSection = (): React.ReactNode => {
  const [todo, setTodo] = useState<string>("To Go To The Bank");
  const firstName = userStore((state) => state.firstName);

  const monthToAbbr = (month: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[month];
  }

  return (
    <View style={[tw`mt-4 gap-8 w-[100%]`]}>
      {/**Write up view */}
      <View style={[tw`flex w-[100%] flex-row items-start justify-between`]}>
        <Text style={[tw`text-[3.4rem] text-white flex-1`, { fontFamily: "Raleway-Bold" }]}>
          Track your <Text style={[tw`text-[3.2rem] text-[#FFFFFFC2]`, { fontFamily: "Raleway-Bold" }]}>tasks</Text>
        </Text>

        {/**Small drop down on the top */}
        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={[tw`flex flex-row items-center gap-1 mt-5`]}>
            <Text style={[tw`text-sm text-white`, { fontFamily: "Raleway-Bold" }]}>
              {`${monthToAbbr(new Date().getMonth())}, ${new Date().getFullYear()}`}
            </Text>
            <Image
              source={require('../../assets/icons/angle-down.png')}
              alt="Angle Down"
              style={[tw`w-[6px] h-[4px]`]}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/**Main Reminder Section */}
      <View style={[tw`flex flex-row gap-6 items-start`]}>
        <View style={[tw`gap-6`]}>
          <Text style={[tw`text-[#FFFFFFBA] text-base`, { fontFamily: "Raleway-Bold" }]}>
            Reminder
          </Text>

          <Text style={[tw`text-[5rem] text-white`, { fontFamily: "Poppins-Bold" }]}>
            {new Date().getDate()}
          </Text>
        </View>

        <View style={[tw`flex-1 px-4 gap-8`]}>
          <Text style={[tw`text-[#C3BCBC] text-lg`, { fontFamily: "Raleway-Bold" }]}>
            Today {firstName}, you have "<Text style={[tw`text-white`]}>{todo}</Text>"
          </Text>

          <Text style={[tw`text-base text-white`, { fontFamily: "Raleway-Bold" }]}>
            {`${new Date().toDateString().split(" ")[0]}, ${monthToAbbr(new Date().getMonth())}, ${new Date().getFullYear()}`}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ReminderSection;
