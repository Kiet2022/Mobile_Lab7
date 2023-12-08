import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import styles from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';


const AddSer_Page = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errortext, setErrortext] = useState('');

    const handleSubmitPress = async () => {
        setErrortext('');
        if (!name) {
            alert('Please fill name');
            return;
        } else if (!price) {
            alert('Please fill price');
            return;
        } else {
            const value = await AsyncStorage.getItem('token');
            console.log(value);
            await fetch('https://kami-backend-5rs0.onrender.com/services', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${value}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                }),
            })
                .then(res => res.json())
                .then(async data => {
                    console.log(data)
                    await navigation.goBack();
                })
                .catch(error => { console.log(error) });
            Alert.alert('Add successfully');
        }
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={' <   '} onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <KeyboardAvoidingView enabled>
                <View style={styles.SectionStyle}>
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
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(price) =>
                            setPrice(price)
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
                    onPress={handleSubmitPress}>
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
};
export default AddSer_Page;
