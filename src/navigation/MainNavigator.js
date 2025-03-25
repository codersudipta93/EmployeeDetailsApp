import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../screens/Dashboard';
import AddDetails from '../screens/AddDetails';
import SeeDetails from '../screens/SeeDetails';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
                <Stack.Screen name="AddDetails" component={AddDetails} options={{headerShown:false}}/>
                <Stack.Screen name="SeeDetails" component={SeeDetails} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator