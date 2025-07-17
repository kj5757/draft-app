import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signInAnonymously } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleLogin = async () => {
    const res = await signInAnonymously(auth);
    await setDoc(doc(db, 'users', res.user.uid), { name });
    navigation.replace('Home');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter display name:</Text>
      <TextInput
        placeholder="e.g. KJ"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Continue" onPress={handleLogin}/>
    </View>
  );
}
