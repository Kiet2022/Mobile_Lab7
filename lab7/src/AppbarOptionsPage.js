import 'react-native-gesture-handler';
import React from "react";

import { useRoute } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import styles from './Style';
import { Appbar } from 'react-native-paper';

const AppbarOption_Page = ({ navigation }) => {
    const route = useRoute();
    const { _id, nameSer, priceSer } = route.params;

    const handleDelete = async () => {
        await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                Alert.alert("Delete Succesfull!!!");
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            }).finally(() => navigation.navigate('Home'));
    }
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={' <   '} onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateService', { _id: _id, nameSer: nameSer, priceSer: priceSer })}>
                <Text style={styles.subtitle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.subtitle}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};
export default AppbarOption_Page;

