import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { FAB } from "react-native-paper";
import styles from './Style';
import Loading from './LoadingScreen';


const Transactions_Page = ({ navigation }) => {
    const [data, SetData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        const value = await AsyncStorage.getItem('Token');
        console.log(value);
        await fetch('https://kami-backend-5rs0.onrender.com/transactions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer:${value}`,
                'ConTent-Type': 'application/json'
            },
        }).then(res => res.json())
            .then((d) => {
                SetData(d)
                console.log(d)
                setIsLoading(false);
            }).catch((error) => { console.error("Fetching error:", error) })
    }
    useEffect(  () => {
        fetchData();
    }, [] )

    const Item = ({ item }) => {
        return (

            <TouchableOpacity style={styles.itembox}
                onPress={() => navigation.navigate('TransactionDetail', { _id: item._id })}
            >
                <View style={{ padding: 5 }}>
                    <Text style={styles.itemTitle}>{item.id}- {item.createdAt}</Text>

                    {item.services.map((service, index) => (
                        <Text key={index}>- {service.name}</Text>
                    ))}
                    <Text style={styles.itemTitle}>Customer: {item.customer.name}</Text>
                    <View style={styles.itemrow}>
                        <Text style={styles.itemTitle}>Total:</Text>
                        <Text style={styles.itemPrice}>{item.price} VND</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    return (
        <SafeAreaView style={styles.container_main}>

            <View style={styles.container_head}><Text style={styles.title}>Kami</Text></View>
            <View style={styles.container_body}>

                <View style={styles.container_body}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.subtitle} >TRANSACTIONS</Text>
                    <FAB
                        style={styles.fab}
                        label={'ADD'}
                        onPress={() => navigation.navigate('AddService')}
                    />
                    </View>
                    {isLoading? <Loading/>: 
                    <FlatList
                        data={data}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                     }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Transactions_Page;
