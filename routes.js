// routes.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/index';
import Perfil from './pages/Perfil'; // corrigido aqui ✅


const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
