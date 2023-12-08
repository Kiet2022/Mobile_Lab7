import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';
import Loading from './LoadingScreen';
import styles from './Style';

import customer from './testdata/cusDetail';

const CustomerDetail_Page = ({navigation}) => {
    const [data, setData] = useState([])
    //const data =  customer;
    const [isLoading, setIsLoading] = useState(false)
    const [price, setPrice] = useState(0);
    const [price_After_Discount, setPriceAfterDiscount] = useState(0);

    const route = useRoute();
    const { _id } = route.params;

    console.log(_id);
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        await fetch(`https://kami-backend-5rs0.onrender.com/transactions/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer:${value}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network was not ok ~~')
            }
            return response.json();
        }).then(async data => {
            setData(data);
            setIsLoading(false);
            setPrice(data.price);
            setPriceAfterDiscount(data.priceBeforePromotion);
            console.log(data);
        }).catch((error) => {
            console.error("Fetching error", error)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        fetchData();
    }, []) 

    const TransactionDetailBox = (transaction, index) => {
        return (
            <View style={styles.itembox} key={index}>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>{transaction.id}</Text>
                    <Text style={styles.itemTitle} > - {transaction.createdAt}</Text>
                </View>
                {
                            transaction.services ? 
                            transaction.services.map((service, i) => <serviceBox service={service} index={i}/>)
                            : null
                }
                <Text style={styles.itemPrice}>{transaction.price}</Text>  
            </View>
        );
    }

    const serviceBox = (service, index) =>{
        return(
            <View key={index}>
            <Text > - {service.name}</Text>
        </View>
        );
    }
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={' <   '} onPress={() => navigation.goBack()} />
                <Appbar.Content style={styles.itemValue} title={'...'} onPress={() => navigation.navigate('AppbarScreen', {screen: 'AppbarOption', params: {_id: _id, nameCus: data.name, phoneCus: data.phone}})} />
            </Appbar.Header>

            <View style={styles.itembox}>
                <View>
                    <Text style={styles.subtitle}>General information</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Name     :</Text>
                    <Text style={styles.itemValue}>{data.name}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Phone        :</Text>
                    <Text style={styles.itemValue}>{data.phone}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Total spend      :</Text>
                    <Text style={styles.itemValue}>{data.totalSpent}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Time     :</Text>
                    <Text style={styles.itemValue}>{data.updatedBy}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Last updated     :</Text>
                    <Text style={styles.itemValue}>{data.updatedBy}</Text>
                </View>
            </View>


            <View style={styles.itembox}>
                <View>
                    <Text style={styles.subtitle}>Transaction History:</Text>
                </View>
                <View>
                    <View>
                        {isLoading ?
                            <Loading/> :
                            data.transactions ? data.transactions.map((transaction, index) =>
                                <TransactionDetailBox
                                    transaction={transaction}
                                    index={index}
                                />
                            ) : null}
                    </View>
                </View>
            </View>
        </View>
    )
}
export default CustomerDetail_Page;
