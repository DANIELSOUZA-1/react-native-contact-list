import {StatusBar} from "expo-status-bar";
import React from "react";
import {Alert, Pressable, Text, TextInput, View} from "react-native";
import {NativeWindStyleSheet} from "nativewind";
import {TouchableOpacity} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Button } from "react-native";

export default function ContactListScreen({navigation}) {
  let contacts = [
    {
      name: "Marcos Andrade",
      email: 'marcos@gmail.com',
      phoneNumber: "81 988553424",
    },
    {
      name: "Patricia Tavares",
      email: 'patricia@gmail.com',

      phoneNumber: "81 998765332",
    },
    {
      name: "Rodrigo Antunes",
      email: 'rodrigo@gmail.com',
      phoneNumber: "81 987765525",
    },
  ];

  paramExists = navigation.getState().routes.find(obj => obj.name == "Contacts").params ? true : false
  console.log(paramExists)

  if (paramExists) {
    newContact = navigation.getState().routes.find(obj => obj.name == "Contacts").params.contact
    contactAlreadyExists = contacts.find(contact => contact.email == newContact.email) ? true : false
    
    if (contactAlreadyExists){
      oldContact = contacts.findIndex(contact => contact.email == newContact.email)
      contacts.splice(oldContact, 1, newContact)
    }
    else contacts.push(newContact) 

  }

  return (
    <View className="flex-1 bg-slate-800 px-6 py-16">
      <View className="flex flex-row items-center justify-between mb-10">
        <Text className=" text-white w-52 text-2xl font-semibold">
          Lista de Contatos
        </Text>
        <TouchableOpacity
          className="ml-auto bg-white px-3 py-3 w-28 rounded-full"
          onPress={() => navigation.navigate("ContactsEdit", )}>
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

    </View>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
