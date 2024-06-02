import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {api, setAuthentication} from '../service/api';
import {DISEASE_URL} from '../service/path';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [accessToken, setAccessToken] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        setAuthentication(token);
      }
    };

    getAccessToken();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.get(`${DISEASE_URL}/${searchText}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar enfermedad ..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {searchResult.map((disease, index) => (
        <Text key={index} style={styles.resultItem}>
          {disease.enfermedad}
        </Text>
      ))}

      <View style={styles.separator}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PDFViewer')}>
        <Text style={styles.buttonText}>Descargar y Ver PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#2CB494',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2CB494',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  separator: {
    height: 30,
  },
  resultItem: {
    marginBottom: 10,
    color: 'red',
    fontSize: 20,
  },
});
