import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {api} from '../service/api';
import {REGISTER_URL} from '../service/path';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await api.post(REGISTER_URL, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Registro exitoso', 'Te has registrado exitosamente');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Hubo un problema con tu registro');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el registro');
    }
  };

  return (
    <View style={styles.padre}>
      <View>
        <Image
          source={require('../../assets/sanatorio.jpg')}
          style={styles.profile}
        />
      </View>
      <View style={styles.tarjeta}>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Nombre"
            style={{paddingHorizontal: 15}}
            value={name}
            onChangeText={text => {
              console.log('Name changed:', text);
              setName(text);
            }}
          />
        </View>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Email@gmail.com"
            style={{paddingHorizontal: 15}}
            value={email}
            onChangeText={text => {
              console.log('Email changed:', text);
              setEmail(text);
            }}
          />
        </View>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Contraseña"
            style={{paddingHorizontal: 15}}
            secureTextEntry
            value={password}
            onChangeText={text => {
              console.log('Password changed:', text);
              setPassword(text);
            }}
          />
        </View>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Repetir Contraseña"
            style={{paddingHorizontal: 15}}
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => {
              console.log('Confirm Password changed:', text);
              setConfirmPassword(text);
            }}
          />
        </View>
        <View style={styles.padreBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={handleRegister}>
            <Text style={styles.TextoBoton}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.linkText}>
            ¿Ya estas Registrado? Inicia Sesión aquí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    borderColor: 'black',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cajaTexto: {
    paddingVertical: 15,
    backgroundColor: '#cccccc40',
    borderRadius: 30,
    marginVertical: 10,
  },
  padreBoton: {
    alignItems: 'center',
  },
  cajaBoton: {
    backgroundColor: '#2CB494',
    borderRadius: 30,
    paddingVertical: 10,
    width: 280,
    marginTop: 20,
  },
  TextoBoton: {
    textAlign: 'center',
    color: 'white',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#2CB494',
  },
});
