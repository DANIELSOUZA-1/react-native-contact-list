import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import axios from 'axios';
import { hideMessage, showMessage } from 'react-native-flash-message';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen({ navigation }) {

  var success = false

  let user = {
    name: '',
    cpf: '',
    email: '',
    password: ''
  }

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD4z9evoXL37mLO-QIiFUIrT6miELZRjb0",
    authDomain: "aula-app-bfebd.firebaseapp.com",
    projectId: "aula-app-bfebd",
    storageBucket: "aula-app-bfebd.appspot.com",
    messagingSenderId: "1038660596676",
    appId: "1:1038660596676:web:f27a2e1386ed9fd27bea91",
    measurementId: "G-DR9947NGM1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app)

  function signUpFirebase(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        successMessage()
        navigation.navigate('Login')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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

  function successMessage() {
    showMessage({
      message: "Cadastro Realizado",
      type: "success",
    });
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
          signUpFirebase(user.email, user.password)
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
