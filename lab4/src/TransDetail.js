import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';
import styles from './Style';

import { Button, Dialog, Portal, Text } from 'react-native-paper';

const DetailTrans_Page = ({ navigation }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [price, setPrice] = useState(0);
    const [price_After_Discount, setPriceAfterDiscount] = useState(0);
    const [visibleDialog, setVisibleDialog] = useState(false);      
    const showDialog = () => setVisibleDialog(true);      
    const hideDialog = () => setVisibleDialog(false);

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


    const DeleteDialog = () => {

      
        return (
      
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Alert</Dialog.Title>
                  <Dialog.Content>
                    <Text variant="bodyMedium">Are you sure want to cancel this transaction?</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={handleDeleteTransaction}>YES</Button>
                  </Dialog.Actions>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
        );
      };
      

    const handleDeleteTransaction = async () => {
        await fetch(`https://kami-backend-5rs0.onrender.com/transactions/${_id}`, {
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
    };


    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={' <   '} onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <View style={styles.itembox}>
                <View>
                    <Text style={styles.subtitle}>General information</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Transaction code:</Text>
                    <Text style={styles.itemValue}>{data.id}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Customer     :</Text>
                    <Text style={styles.itemValue}>{data._id}</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Created         :</Text>
                    <Text style={styles.itemValue}>{data.createdAt}</Text>
                </View>
            </View>


            <View style={styles.itembox}>
                <View>
                    <Text style={styles.subtitle}>Services list</Text>
                </View>

                <View>

                    <View>
                        {isLoading ?
                            <Text>Waiting for loading data...</Text> :
                            data.services ? data.services.map((service, index) => (
                                <View style={styles.itemrow}>
                                    <Text key={index}>- {service.name} </Text>
                                    <Text> x{service.quantity}  </Text>
                                    <Text style={styles.itemPrice}>{service.price} VND</Text>
                                </View>
                            )) : null}
                    </View>

                    <View style={styles.itemrow}>
                        <Text style={styles.itemTitle}>Customer        :</Text>
                        {isLoading ? <Text>Waiting for loading data...</Text> : data.customer.name ? <Text style={styles.itemValue}>{data.customer.name}</Text> : null}
                    </View>

                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Total money    :</Text>
                    <Text style={styles.itemValue}>{data.priceBeforePromotion}VND </Text>
                </View>
            </View>


            <View style={styles.itembox}>
                <View >
                    <Text style={styles.subtitle}>Cost</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Total      :</Text>
                    <Text style={styles.itemValue}>{data.priceBeforePromotion}VND</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Discount   :</Text>
                    <Text style={styles.itemPrice}>-{price - price_After_Discount}VND</Text>
                </View>
                <View style={styles.itemrow}>
                    <Text style={styles.itemTitle}>Total Payment    :</Text>
                    <Text style={styles.itemValue}>{data.createdAt}</Text>
                </View>
            </View>
            {visibleDialog? <DeleteDialog/> :null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={showDialog}>
                <Text style={styles.buttonTextStyle}>CANCEL</Text>
            </TouchableOpacity>

        </View>

    )
}
export default DetailTrans_Page;
