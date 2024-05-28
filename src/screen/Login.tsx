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
import {LOGIN_URL} from '../service/path';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post(LOGIN_URL, {email, password});
      if (response.status === 201) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Hubo un problema con tu inicio de sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el inicio de sesión');
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
            placeholder="Email@gmail.com"
            style={{paddingHorizontal: 15}}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Contraseña"
            style={{paddingHorizontal: 15}}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.padreBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={handleLogin}>
            <Text style={styles.TextoBoton}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.linkText}>
            ¿No tienes una cuenta? Regístrate aquí
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
