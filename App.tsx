import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import '@/global.css';
/* Pages */
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import FavsScreen from './screens/Favs';
import ChatsScreen from './screens/Chats';
import ViewChatScreen from './screens/ViewChat';
import SettingsScreen from './screens/Settings';
import ViewProfileScreen from './screens/ViewProfile';
import ViewProductScreen from './screens/ViewProduct';
import ViewStoreScreen from './screens/ViewStore';

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
        <Stack.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="ViewChat" component={ViewChatScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="ViewProfile" component={ViewProfileScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="ViewProduct" component={ViewProductScreen} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="ViewStore" component={ViewStoreScreen} options={{ headerShown: false, animation: 'none' }} />
      </Stack.Navigator>
    </Provider>
  );
}

export default App;
