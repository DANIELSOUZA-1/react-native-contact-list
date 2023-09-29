import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

// Firebase
import { getAuth, signInWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export default function LoginScreen({ navigation }) {
  let user = {
    email: '',
    password: ''
  }

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const provider = new GoogleAuthProvider();
  
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

  function loginFirebase(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        showMessage({
          message: "Logado",
          type: "info",
        });
        navigation.navigate('Contacts')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: "Email ou senha incorretos",
          type: "danger",
        });
      });
  }

  function loginGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        showMessage({
          message: "Logado",
          type: "info",
        });
        navigation.navigate('Contacts')

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        showMessage({
          message: "Email ou senha incorretos",
          type: "danger",
        });

      });
  }

  async function login(user) {
    await axios.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`).then(response => {
      let user = response.data[0]
      if (user) {
        showMessage({
          message: "Logado",
          type: "info",
        });
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
          <TextInput defaultValue={user.email} onChangeText={inputValue => { onChangeValueText("email", inputValue) }} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite seu nome..."></TextInput>
        </View>
        <View className="w-full">
          <Text className="mb-0.5 text-slate-600 font-bold ">Senha</Text>
          <TextInput defaultValue={user.password} onChangeText={inputValue => { onChangeValueText("password", inputValue) }} secureTextEntry={true} className="mb-4 w-full border border-slate-400 p-2 rounded-md" placeholder="Digite sua senha..."></TextInput>
        </View>
        <TouchableOpacity className="mt-4 bg-slate-800 px-4 py-3 w-full rounded-full ring-2 ring-pink-500 ring-inset" onPress={async () => loginFirebase(user.email, user.password)}>
          <Text className="text-white font-semibold text-xl mx-auto">Entrar</Text>
        </TouchableOpacity >
        <TouchableOpacity className="mt-4 bg-white px-4 py-3 w-full rounded-full ring-2 ring-pink-500 ring-inset" onPress={async () => loginGoogle()}>
          <Text className="text-red-600 font-semibold text-xl mx-auto">Entrar com Google</Text>
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
