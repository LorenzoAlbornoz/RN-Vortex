import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import {api} from '../service/api';
import {FILE_URL} from '../service/path';

const PDFViewer = ({route}) => {
  const [localPath, setLocalPath] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadPDF = async () => {
      const path = `${RNFS.DocumentDirectoryPath}/PDF200MB.pdf`;

      try {
        const response = await api.get(FILE_URL, {responseType: 'arraybuffer'});
        await RNFS.writeFile(path, response.data, 'base64');
        setLocalPath(path);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    downloadPDF();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const source = {uri: localPath};

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PDFViewer;
