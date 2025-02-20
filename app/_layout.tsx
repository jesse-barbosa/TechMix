import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from '../store';
/* Pages */
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import SearchScreen from './Search';
import FavsScreen from './Favs';
import UserScreen from './Settings';
import ViewProductScreen from './ViewProduct';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Favs" component={FavsScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="ViewProduct" component={ViewProductScreen} options={{ headerShown: false, animation: 'none' }} />
      </Stack.Navigator>
    </Provider>
  );
}

export default App;
