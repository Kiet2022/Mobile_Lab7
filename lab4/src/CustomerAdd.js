import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from './Style';

const AddCus_Page = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errortext, setErrortext] = useState('');


    async function handleAddCustomer() {
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
        await fetch('https://kami-backend-5rs0.onrender.com/customers', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: phone,
                name: name,
            }),
        })
            .then(res => res.json())
            .then(async data => {
                console.log(data)
            })
            .catch(error => { console.log(error) });
        Alert.alert('Add successfully');

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
                    onPress={handleAddCustomer}>
                    <Text style={styles.buttonTextStyle}>ADD</Text>
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
export default AddCus_Page;
