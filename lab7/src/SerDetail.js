import React, { useState, useEffect } from 'react';
import {
    View
} from 'react-native';
import { Text, Appbar} from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style';

const DetailSer_Page = ({ navigation }) => {
    const route = useRoute();
    const [data, setData] = useState([]);
    const { _id } = route.params;


    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value)
        await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d)
                console.log("d: ", d)              
            })
            .catch((error) => {
                console.error('Error fetching data:', error);              
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View >
            <Appbar.Header>
                <Appbar.Content title={' <   '} onPress={() => navigation.goBack()} />
                <Appbar.Content style={styles.itemValue} title={'...'} onPress={() => navigation.navigate('AppbarScreen', {screen: 'AppbarOption', params: {_id: _id, nameSer: data.name, priceSer: data.price}})} />
            </Appbar.Header>
            <View >
                <View style={{ flexDirection: 'row', height: 50 , paddingTop:16}}>
                    <Text style={styles.itemTitle}>Service name:</Text>
                    <Text style={styles.itemValue}>{data.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', height: 50 , paddingTop:16}}>
                    <Text style={styles.itemTitle}>Price: </Text>
                    <Text style={styles.itemPrice}>{data.price} VND</Text>
                </View>
                {/*
                <View style={{flexDirection: 'row'}}> <Text variant="bodyLarge">Creator: </Text><Text variant="labelSmall">{data.map}</Text></View>
                      */}
                <View style={{ flexDirection: 'row', height: 50 , paddingTop:16}}>
                    <Text style={styles.itemTitle}>Created: </Text>
                    <Text style={styles.itemValue}>{data.createdAt}</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 50 , paddingTop:16}}>
                    <Text style={styles.itemTitle}>Updated:</Text>
                    <Text style={styles.itemValue}>{data.updatedAt}</Text>
                </View>

            </View>
        </View>
    );
};
export default DetailSer_Page;

