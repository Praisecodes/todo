import { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import tw from "twrnc";
import { useTodoStore } from "../../zustand/AppStore";
import DatePicker from "react-native-date-picker";
import PushNotification from "react-native-push-notification";

const ModelView = ({ bottomSheetRef }: { bottomSheetRef: any; }): React.ReactNode => {
  const [todoInfo, setTodoInfo] = useState<any>({
    "title": "",
    "dateDue": "",
  });
  const addTodo = useTodoStore((state: any) => state.addTodo);
  const [open, setOpen] = useState(false);

  const sendNotification = (smallText: string, bigText:string | any) => {
    PushNotification.localNotification({
      channelId: "channel-id",
      subText: smallText,
      bigText: bigText,
      message: bigText,
      ignoreInForeground: false,
    });

    // PushNotification.getChannels((channel_ids)=>{
    //   console.log(channel_ids);
    // })
  }

  const handleAddTodo = async () => {
    if(todoInfo.title == "" || todoInfo.dateDue == ""){
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

        <TouchableWithoutFeedback onPress={() => { setOpen(!open) }}>
          <Text style={[tw`border border-white rounded-md py-4 text-base px-4 w-[100%] text-white`]}>
            {todoInfo?.dateDue == "" ? "Choose Date For Todo" : todoInfo?.dateDue.toDateString()}
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
