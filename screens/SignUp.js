import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import axios from 'axios';

export default function SignUpScreen({ navigation }) {

  let user = {
    name: '',
    cpf: '',
    email: '',
    password: ''
  }

  function signUp(user) {
    axios.post(`http://localhost:3000/users`, user).then(() => {
      return true
    }).catch(error => {
      console.log(error)
      return false
    })
  }

  function onChangeValueText(inputForm, value) {
    user[inputForm] = value
  }

  return (
    <View className="flex-1 bg-slate-800">
      <View className="px-8 py-24">
        <Text className="text-white text-2xl font-semibold">Bem vindo</Text>
        <Text className="text-slate-300 text-xl font-medium">Cadastre-se</Text>
        <StatusBar style="light" />
      </View>
      <View className="flex items-center bg-slate-200 h-full rounded-t-3xl px-8 py-6 ">
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Usuário</Text>
          <TextInput defaultValue={user.name} onChangeText={inputValue => { onChangeValueText("name", inputValue) }} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu nome..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">CPF</Text>
          <TextInput defaultValue={user.cpf} onChangeText={inputValue => { onChangeValueText("cpf", inputValue) }} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu cpf..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Email</Text>
          <TextInput defaultValue={user.email} onChangeText={inputValue => { onChangeValueText("email", inputValue) }} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu email..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Senha</Text>
          <TextInput defaultValue={user.password} onChangeText={inputValue => { onChangeValueText("password", inputValue) }} secureTextEntry={true} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite sua senha..."></TextInput>
        </View>
        <Pressable className="mt-4 bg-slate-800 px-4 py-3 w-full rounded-full" onPress={() => {
          signUp(user)
          navigation.navigate('Login')
        }}>
          <Text className="text-white font-semibold text-xl mx-auto">Salvar</Text>
        </Pressable>

      </View>
    </View>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
