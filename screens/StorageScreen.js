import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Image, Linking } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Button } from "react-native-web";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";

import * as ImagePicker from 'expo-image-picker';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, list } from "firebase/storage";
import moment from "moment/moment";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export default function StorageScreen({ route, navigation }) {

  useEffect(() => {
    LinkImage();
  }, [])

  var Images;
  const [imageUri, setImageUri] = useState(null);
  const [images, setImages] = useState(null);
  const [uploading, setUploading] = useState(false);

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
  const analytics = getAnalytics(app);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

    });

    if (!result.cancelled) {

      setImageUri(result.uri);
      console.log(result.assets);

    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Selecione uma imagem antes de enviar.');
      return;
    }
    // Create a root reference
    const storage = getStorage();
    const fileName = generateRandomFilename()

    // Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, `${fileName}.jpg`);

    const response = await fetch(imageUri);
    const blob = await response.blob();

    uploadBytes(mountainsRef, blob).then((snapshot) => {

      console.log(snapshot);
      LinkImage()
    });
  };

  function generateRandomFilename() {
    const randomString = generateRandomString(6);
    const currentTimestamp = moment(new Date()).format(
      "MM_DD_YYYY_h_mm_ss_SSS"
    );
    const randomNumber = Math.floor(Math.random() * 1000000);
    const fileExtension = "";
    const generatedRandomFilename = randomString + "_" + currentTimestamp + "_" + randomNumber + fileExtension;
    return generatedRandomFilename
  }

  function generateRandomString(stringLength) {
    let result = "";
    const alphaNumericCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const alphabetsLength = alphaNumericCharacters.length;
    for (let i = 0; i < stringLength; i++) {
      result += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphabetsLength));
    }
    return result;
  }


  async function LinkImage() {
    // Create a reference under which you want to list
    const storage = getStorage();
    const listRef = ref(storage);

    // Fetch the first page of 100.
    const firstPage = await list(listRef, { maxResults: 100 });

    let newImages = (firstPage.items.map((item) => {
      return {
        link: ("https://firebasestorage.googleapis.com/v0/b/" + item.bucket + '/o/' + item.fullPath + '?alt=media'),
        fileName: item._location.path
      }
    }))
    setImages(newImages)
  }



  return (
    <ScrollView>
      <View className="flex items-center mt-24">
        <Button title="Escolher Imagem" onPress={pickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={{

          width: 200, height: 200, marginVertical: 20
        }} />}
        {uploading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (

          <Button title="Enviar Imagem" onPress={uploadImage}

            disabled={!imageUri} />
        )}

        <View className="mt-20 px-6 py-16">
          <Text className="text-3xl mx-auto">Imagens do Firebase</Text>
          {images ? images.map((image, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => Linking.openURL(image.link)} >
                <View className="flex flex-row items-center mt-2 bg-white p-2 rounded-md ">
                  <View className="border-2 border-slate-400 w-16 h-16 rounded-full">
                    <Image className="w-full h-full" style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                      source={{ uri: image.link }}></Image>
                  </View>
                  <View>
                    <Text className="mr-auto font-semibold text-xs">
                      {image.fileName}
                    </Text>
                  </View> 
                </View>
              </TouchableOpacity>
            );
          }) : false}
        </View>

      </View>
    </ScrollView>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
