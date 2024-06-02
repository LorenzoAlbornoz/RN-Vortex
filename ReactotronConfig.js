import Reactotron from 'reactotron-react-native';

Reactotron.setAsyncStorageHandler()
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
console.tron = Reactotron;
