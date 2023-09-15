import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { TouchableOpacity } from "react-native";
import {  } from "react-native-web";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";

export default function ContactListScreen({route, navigation}) {
  
  const [contacts, setContacts] = useState([])

  const isFocused = useIsFocused();

  useEffect( () => {
    if(isFocused){ 
      consultarDados();
    }
  }, [isFocused])
  
  function consultarDados() {
    axios.get('http://localhost:3000/contatos')
      .then(response => {
        setContacts(response.data)
        //console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
  

  
  return (
    <ScrollView className="flex-1 bg-slate-800 px-6 py-16">
      <View className="flex flex-row items-center justify-between mb-10">
        <Text className=" text-white w-52 text-2xl font-semibold">
          Lista de Contatos
        </Text>
        <TouchableOpacity
          className="ml-auto bg-white px-3 py-3 w-28 rounded-full"
          onPress={() => navigation.navigate("ContactsEdit")}>
          <Text className="text-slate-900 font-semibold text-xl mx-auto">
            Adicionar 
          </Text>
        </TouchableOpacity>
      </View>
      
      {contacts.map((contact, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("ContactsEdit", { contact })} >
            <View className="flex flex-row items-center mt-2 bg-white p-2 rounded-md space-x-3.5">
              <View className="bg-slate-900 border-2 border-slate-400 w-16 h-16 rounded-full"></View>
              <View>
                <Text className="mr-auto font-semibold text-lg">
                  { contact.name }
                </Text>
                <Text className="font-semibold text-slate-700">{ contact.phoneNumber }</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

    </ScrollView>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
