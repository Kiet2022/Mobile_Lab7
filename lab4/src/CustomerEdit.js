import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { Appbar } from 'react-native-paper';
import styles from './Style';

const EditCus_Page = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errortext, setErrortext] = useState('');

    const route = useRoute();
    const { _id, nameSer, priceSer } = route.params;


    async function handleUpdateCustomer() {
        setErrortext('');

        if (!name) {
            Alert.alert('Please fill name');
        } else if (!price) {
            Alert.alert('Please fill phone');
        }
        if (errortext !== '') {
            return;
        }

        const value = await AsyncStorage.getItem('token')
        console.log(value);
        await fetch(`https://kami-backend-5rs0.onrender.com/customers/${_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: _id,
                name: name,
                price: price,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                Alert.alert('Update Successfully!!!')
            })
            .then((d) => {
                setData(d)
                console.log("c: ", d)
      
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            }).finally(() =>
                navigation.navigate('DetailService', {screen: 'Detail', params:{ _id: _id }})
            );

    }
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={' <   '} onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <KeyboardAvoidingView enabled>

                <Text style={{ paddingLeft: 40, paddingTop: 15, fontWeight: 'bold', fontSize: 20 }}>Customer name*</Text>
                <View style={styles.SectionStyle} >
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={name =>
                            setName(name)
                        }
                        placeholder="Enter service name"
                        onSubmitEditing={() =>
                            passwordInputRef.current &&
                            passwordInputRef.current.focus()
                        }
                    />
                </View>

                <Text style={{ paddingLeft: 40, paddingTop: 15, fontWeight: 'bold', fontSize: 20 }}>Customer phone*</Text>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(phone) =>
                            setPhone(phone)
                        }
                        placeholder="Enter price"
                    />
                </View>
                {errortext != '' ? (
                    <Text style={styles.errorTextStyle}>
                        {errortext}
                    </Text>
                ) : null}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleUpdateCustomer}>
                    <Text style={styles.buttonTextStyle}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonTextStyle}>CANCEL</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );

}
export default EditCus_Page;
