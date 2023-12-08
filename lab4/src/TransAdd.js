import React, { useState, useEffect } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dialog, Divider, RadioButton } from 'react-native-paper';
import styles from './Style';
import Loading from './LoadingScreen';


const TransactionAdd_Page = ({ navigation }) => {
    const [customerSelected, setCustomerSelected] = useState('None')
    const [customers, setCustomers] = useState([])
    const [customerID, setCustomerID] = useState('');
    const [numService, setNumService] = useState(0);

    const [services, setServices] = useState([])
    const [serviceQuantity, SetServiceQuantity] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const filePath = 'https://kami-backend-5rs0.onrender.com/'
    const [visibleDialog, setVisibleDialog] = useState(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    const fetchData = async () => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                return response.json();
            })
            .then((d) => {
                console.log(d);
                setCustomers(d);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                return response.json();
            })
            .then((d) => {
                console.log(d);
                setServices(d);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


    }

    useEffect(() => {
        fetchData();
    }, [])
    const CustomerListItem = ({ item }) => (
        <View>
            <Divider />
            <TouchableOpacity style={styles.itembox} onPress={() => {
                setCustomerID(item._id);
                setCustomerSelected(item.name);
                hideDialog;
            }}>
                <View style={styles.itemrow}>
                    <RadioButton
                        status={'unchecked'}
                    />
                    <Text style={styles.itemTitle}>{item.name}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
    const selectCustomerDialog = () => {
        return (
            <View style={{ flex: 1 }}>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <View>
                                <TouchableOpacity style={styles.itembox} onPress={() => {
                                    setCustomerID('');
                                    setCustomerSelected('None');
                                    hideDialog;
                                }}>
                                    <View style={styles.itemrow}>
                                        <RadioButton
                                            status={'checked'}
                                        />
                                        <Text style={styles.itemTitle}>Default</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <FlatList
                                data={customers}
                                renderItem={({ item }) => <CustomerListItem item={item} />}
                                keyExtractor={item => item._id}
                            />
                        </Dialog.Content>

                    </Dialog>
                </Portal>
            </View>
        );
    }

    const serviceListItem = (item) => {
        const [checked, setChecked] = useState(false);
        const [quantity, setQuantity] = useState(0);
        const [servicePrice, setServicePrice] = useState(0);
        const [newService, setNewService] = useState([]);
        const [index,setIndex] = useState(-1);
        const [isCreated,setIsCreated] = useState(false)

   

        return (
            <View>
                <RadioButton
                    value={item.name}
                    status={checked? 'checked' : 'unchecked'}
                    onPress={checked?
                        () =>{
                            setChecked(false)
                        }:()=>{
                            setChecked(true)
                        }
                    }
                />
                {checked? 
                <View>
                <View style={styles.itemrow}>
                    <TouchableOpacity style={styles.itembox} onPress={() =>{
                         setQuantity(quantity-1);
                         setServicePrice(quantity*item.price);
                         }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}> - </Text>
                    </TouchableOpacity>
                    
                    <Text>{quantity}</Text>

                    <TouchableOpacity style={styles.itembox} onPress={() => {
                         setQuantity(quantity+1);
                         setServicePrice(quantity*item.price);
                         }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}> + </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Price: <Text style={styles.itemPrice}>{servicePrice}</Text></Text>
                </View>
                </View>
                : null}
            </View>
        );
    }

    return (
        <View>
            {isLoading ? <Loading /> :
                <View>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Customer*</Text>
                        {visibleDialog ? <selectCustomerDialog /> : null}
                        <TouchableOpacity onPress={showDialog}>
                            <View style={styles.inputStyle}>
                                <Text style={styles.itemTitle}>{customerSelected}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            data={services}
                            renderItem={({ item, index }) => <serviceListItem item={item} />}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </View>
            }
        </View>
    )
}
export default TransactionAdd_Page;