import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Login_Page from './LoginPage';
import AddSer_Page from './SerAdd';
import DetailSer_Page from './SerDetail';
import EditSer_Page from './SerEdit';
import Home_Page from './HomePage';
import AppbarOption_Page from './AppbarOptionsPage';

import Transactions_Page from './Transactions';
import DetailTrans_Page from './TransDetail';
import Customers_Page from './Customers';
import AddCus_Page from './CustomerAdd';
import Logout_Page from './LogoutPage';
import { NavigationContainer } from '@react-navigation/native';
import EditCus_Page from './CustomerEdit';
import CustomerDetail_Page from './CustomerDetail';
import TransactionAdd_Page from './TransAdd';

const Stack = createStackNavigator();

function HomeScreens() {
    return (
        <Stack.Navigator
            initialRouteName='HomeScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Home"
                component={MyTabs}
            />
            <Stack.Screen
                name='AddService'
                component={AddSer_Page}
            />
            <Stack.Screen
                name='DetailService'
                component={DetailScreen}
            />
        </Stack.Navigator>
    )
}

function AppbarOptionScreen() {
    return (
        <Stack.Navigator
            initialRouteName='AppbarOptionScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='AppbarOption'
                component={AppbarOption_Page}
            />
            <Stack.Screen
                name="UpdateService"
                component={EditSer_Page}
            />

        </Stack.Navigator>
    )
}
function DetailScreen() {
    return (
        <Stack.Navigator
            initialRouteName='DetailScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Detail'
                component={DetailSer_Page}
            />
            <Stack.Screen
                name="AppbarScreen"
                component={AppbarOptionScreen}
            />
        </Stack.Navigator>
    )
}

const TransactionsScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName='TransactionsScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
            
        >
            <Stack.Screen
                name='TransactionList'
                component={Transactions_Page}
            />
            <Stack.Screen
                name="TransactionDetail"
                component={DetailTrans_Page}
            />
            <Stack.Screen
                name='TransactionAdd'
                component={TransactionAdd_Page}
            />

        </Stack.Navigator>
    );
}

const CustomersScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName='CustomersScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='CustomerList'
                component={Customers_Page}
            />
            <Stack.Screen
                name="AddCustomer"
                component={AddCus_Page}
            />
            <Stack.Screen 
                name='EditCustomer'
                component={EditCus_Page}
            />

            <Stack.Screen
                name='DetailCustomer'
                component={CustomerDetail_Page}
            />
        </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='HomeScreen_Run'
            barStyle={{ backgroundColor: "blue" }}
        >
            <Tab.Screen name="HomeTab"
                component={Home_Page}
                options={{
                    tabBarIcon: 'account',
                }}
            />
            <Tab.Screen
                name="TransactionTab"
                component={TransactionsScreen}
                options={{
                    tabBarIcon: 'account',
                }}
            />
            <Tab.Screen
                name="CustomerTab"
                component={CustomersScreen}
                options={{
                    tabBarIcon: 'account',
                }}
            />
            <Tab.Screen
                name="SettingTab"
                component={Logout_Page}
                options={{
                    tabBarIcon: 'account',
                }}
            />
        </Tab.Navigator>
    )
}

function App_Run() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="AppScreen"
                activeColor="#e91e63"
                labelStyle={{ fontSize: 12 }}
                style={{ backgroundColor: 'tomato' }}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='LoginScreen'
                    component={Login_Page}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreens}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App_Run;