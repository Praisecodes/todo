import React, { useState, useEffect } from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import tw from "twrnc";
import { useTodoStore, userStore } from "../../zustand/AppStore";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const ReminderSection = ({ allTodoSheetRef }: { allTodoSheetRef: React.RefObject<BottomSheetMethods> }): React.ReactNode => {
  const [todo, setTodo] = useState<string[]>([]);
  const firstName = userStore((state:any) => state.fullName.split(" ")[0]);

  const todos = useTodoStore((state: any) => state.todos);

  useEffect(() => {
    setTodo([]);
    let filteredTodos = [...todos.filter((todo: any) => (new Date(todo.dateDue).toISOString().split("T")[0] == new Date().toISOString().split("T")[0]))];

    for (let index = 0; index < filteredTodos.length; index++) {
      setTodo((todo) => ([...todo, filteredTodos[index].title]));
    }
  }, [todos]);

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
            <Text style={[tw`text-base text-white`, { fontFamily: "Raleway-Bold" }]}>
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
        <View style={[tw`gap-6`,]}>
          <Text style={[tw`text-[#FFFFFFBA] text-base`, { fontFamily: "Raleway-Bold" }]}>
            Reminder
          </Text>

          <Text style={[tw`text-[5rem] p-0 text-right text-white`, { fontFamily: "Poppins-Bold" }]}>
            {new Date().getDate()}
          </Text>
        </View>

        <View style={[tw`flex-1 px-4 gap-7`]}>
          <TouchableWithoutFeedback onPress={() => { allTodoSheetRef.current?.snapToIndex(1) }}>
            <View style={[tw`relative`]}>
              <Text style={[tw`text-[#C3BCBC] text-lg`, { fontFamily: "Raleway-Bold" }]}>
                Today {firstName}, you have <Text style={[tw`text-white`]}>{(todo.length < 1) ? "No Tasks" : `"${(todo.join(", ")).length > 29 ? (todo.join(", ")).substring(0, 29) + "..." : todo.join(", ")}"`}</Text>
              </Text>

              <Image
                source={require('../../assets/icons/link.png')}
                width={10}
                height={10}
                style={[tw`w-[15px] h-[15px] opacity-70 absolute top-0 right-0`]}
              />
            </View>
          </TouchableWithoutFeedback>

          <Text style={[tw`text-base text-white`, { fontFamily: "Raleway-Bold" }]}>
            {`${new Date().toDateString().split(" ")[0]}, ${monthToAbbr(new Date().getMonth())}, ${new Date().getFullYear()}`}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ReminderSection;
