import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  let user = {
    email: '',
    password: ''
  }

  async function login(user) {
    await axios.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`).then(response => {
      debugger
      let user = response.data[0]
      if (user) {
        navigation.navigate('Contacts')
        return user
      }
    }).catch(error => console.log(error))
  }

  function onChangeValueText(inputForm, value) {
    user[inputForm] = value
  }
  
  return (
    <View className="flex-1 bg-slate-800">
      <View className="px-8 py-24">
        <Text className="text-white text-2xl font-semibold">Bem vindo de volta</Text>
        <Text className="text-slate-300 text-xl font-medium">Faça seu login</Text>
        <StatusBar style="light" />
      </View>
      <View className="flex items-center bg-slate-200 h-full rounded-t-3xl px-8 py-6 ">
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Email</Text>
          <TextInput defaultValue={user.email} onChangeText={inputValue => {onChangeValueText("email", inputValue)}} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu nome..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Senha</Text>
          <TextInput defaultValue={user.password} onChangeText={inputValue => {onChangeValueText("password", inputValue)}} secureTextEntry={true} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite sua senha..."></TextInput>
        </View>
        <TouchableOpacity  className="mt-4 bg-slate-800 px-4 py-3 w-full rounded-full ring-2 ring-pink-500 ring-inset" onPress={async () => login(user)}>
          <Text className="text-white font-semibold text-xl mx-auto">Entrar</Text>
        </TouchableOpacity >
        <TouchableOpacity className="mt-4 px-4 py-1 w-full rounded-full" onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-slate-800 font-semibold text-xl mx-auto">Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
