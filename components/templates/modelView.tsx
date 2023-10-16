import { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import tw from "twrnc";
import { useTodoStore, userStore } from "../../zustand/AppStore";
import DatePicker from "react-native-date-picker";
import PushNotification from "react-native-push-notification";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const ModelView = ({ bottomSheetRef }: { bottomSheetRef: any; }): React.ReactNode => {
  const [todoInfo, setTodoInfo] = useState<any>({
    "title": "",
    "dateDue": "",
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const addTodo = useTodoStore((state: any) => state.addTodo);
  const todos = useTodoStore((state: any) => state.todos);
  const fullName = userStore((state: any) => state.fullName);
  const [open, setOpen] = useState(false);

  const sendNotification = (smallText: string, bigText: string | any) => {
    PushNotification.localNotificationSchedule({
      channelId: "channel-id",
      id: `${todos.length}`,
      title: `Hi there ${fullName}!`,
      message: `You've Got A To-Do "${todoInfo.title}" Now!`,
      date: new Date(todoInfo.dateDue),
      allowWhileIdle: true,
    });

    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    })
  }

  const handleAddTodo = async () => {
    if (todoInfo.title == "" || todoInfo.dateDue == "") {
      return;
    }

    addTodo?.(todoInfo);
    setTodoInfo({
      "title": "",
      "dateDue": "",
    });
    sendNotification("Success On Adding To-Do", `You've successfully added ${todoInfo.title} to your To-Do list!`);
    bottomSheetRef.current.close();
  }

  const chooseDate = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      onChange: (event, selectedDate) => {
        if (event.type == "dismissed") {
          return;
        }
        setDate(selectedDate);

        DateTimePickerAndroid.open({
          value: selectedDate,
          onChange: (event, selectedTime) => {
            if (event.type == "dismissed") {
              return;
            }
            console.log(selectedTime);
            setTodoInfo((todoInfo: any) => ({ ...todoInfo, dateDue: selectedTime }));
          },
          mode: "time",
          is24Hour: true,
        })
        console.log(selectedDate, " Event=", event);
      },
      is24Hour: true,
    })
  }

  return (
    <>
      <Text style={[tw`text-white text-2xl`, { fontFamily: "Raleway-Bold" }]}>
        Add Todo
      </Text>

      <View style={[tw`gap-6`]}>
        <TextInput
          placeholder="Enter Todo Title"
          value={todoInfo?.title}
          onChangeText={(e: string) => {
            setTodoInfo((todoInfo: any) => ({ ...todoInfo, title: e }))
          }}
          style={[tw`w-[100%] border border-[#ffffff] rounded-md py-3 px-4 text-base text-white`, { fontFamily: "Nunito_Regular" }]}
        />

        <TouchableWithoutFeedback onPress={() => { chooseDate() }}>
          <Text style={[tw`border border-white rounded-md py-4 text-base px-4 w-[100%] text-white`]}>
            {todoInfo?.dateDue == "" ? "Choose Time For Todo" : todoInfo?.dateDue.toLocaleString()}
          </Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => { handleAddTodo(); }}>
          <Text style={[tw`text-center w-[100%] bg-[#0760B2] text-lg text-white py-3 rounded-md`, { fontFamily: "Raleway-Bold" }]}>
            Add Todo
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <DatePicker
        modal
        open={open}
        date={new Date()}
        onConfirm={(date) => {
          setOpen(false)
          setTodoInfo((todoInfo: any) => ({ ...todoInfo, dateDue: date }))
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default ModelView;
