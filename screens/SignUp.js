import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";

export default function SignUpScreen({ navigation }) {
  
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
          <TextInput className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu nome..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">CPF</Text>
          <TextInput className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu cpf..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Email</Text>
          <TextInput className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu email..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Senha</Text>
          <TextInput className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite sua senha..."></TextInput>
        </View>
        <Pressable className="mt-4 bg-slate-800 px-4 py-3 w-full rounded-full" onPress={() => navigation.navigate('Login')}>
          <Text className="text-white font-semibold text-xl mx-auto">Salvar</Text>
        </Pressable>
        
      </View>
    </View>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
