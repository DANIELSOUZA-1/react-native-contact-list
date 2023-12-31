import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, Button, Pressable, Text, TextInput, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { showMessage } from "react-native-flash-message";




export default function ContactEditScreen({ route, navigation }) {
  var contact = {
    name: '',
    email: '',
    phoneNumber: '',
  }

  var changeContact = false

  


  if (route.params) {
    contact = route.params.contact

    if (contact) {
      changeContact = true
    }
  }

  function save() {
    if (changeContact) {
      axios.put(`http://localhost:3000/contatos/${contact.id}`,
        contact
      ).then(response => {
        console.log(response)
        showMessage({
          message: "Contato Alterado",
          type: "success",
        });
        navigation.navigate('Contacts', { contact })
      }).catch(error => { console.log(error) })

    } else {
      axios.post('http://localhost:3000/contatos',
        contact
      ).then(response => {
        console.log(response)
        showMessage({
          message: "Contato Salvo",
          type: "success",
        });
        navigation.navigate('Contacts', { contact })
      }).catch(error => { console.log(error) })
    }
  }

  function deleteContact() {
    axios.delete(`http://localhost:3000/contatos/${contact.id}`,
      contact
    ).then(response => {
      console.log(response)
      showMessage({
        message: "Contato Excluido",
        type: "danger",
      });
      navigation.navigate('Contacts', { contact })
    }).catch(error => { console.log(error) })

  }


  function onChangeValueText(inputForm, value) {
    contact[inputForm] = value
  }

  return (
    <View className="flex-1 bg-slate-800 ">
      <View className="px-6 py-16">
        <View className="flex flex-row items-center justify-between mb-10">
          <Text className="text-white w-52 text-2xl font-semibold">
            Edição de Contato <Text className="text-slate-400">{contact.name}</Text>
          </Text>
          <TouchableOpacity
            className="ml-auto bg-white px-3 py-3 w-28 rounded-full"
            onPress={() => navigation.navigate("Contacts")}>
            <Text className="text-slate-900 font-semibold text-xl mx-auto">
              {'< '}Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex items-center bg-slate-200 h-full rounded-t-3xl px-8 py-6 ">
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Nome</Text>
          <TextInput defaultValue={contact.name} onChangeText={text => { onChangeValueText("name", text) }} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu nome..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Email</Text>
          <TextInput defaultValue={contact.email} onChangeText={text => { onChangeValueText("email", text) }} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu email..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Telefone</Text>
          <TextInput defaultValue={contact.phoneNumber} onChangeText={text => { onChangeValueText("phoneNumber", text) }} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu telefone..."></TextInput>
        </View>
        <Pressable className="mt-4 bg-slate-800 px-4 py-3 w-full rounded-full" onPress={() => save(contact)}>
          <Text className="text-white font-semibold text-xl mx-auto">Salvar</Text>
        </Pressable>

        <Pressable className="mt-4 bg-red-200 px-4 py-3 w-full rounded-full" onPress={() => deleteContact(contact)}>
          <Text className="text-red-700 font-semibold text-xl mx-auto">Deletar</Text>
        </Pressable>
      </View>


    </View>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
