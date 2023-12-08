import React, { useState } from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { useRoute } from "@react-navigation/native";
import styles from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditSer_Page = ({navigation}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errortext, setErrortext] = useState('');


    const route = useRoute();
    const { _id, nameSer, priceSer } = route.params;


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
            await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
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
    }

    return (

        <View>
            <View style={{flex:2}}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={name =>
                                setName(name)
                            }
                            value={nameSer}
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
                            value={priceSer}
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
                        <Text style={styles.buttonTextStyle}>UPDATE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('DetailService', {screen: 'Detail', params:{ _id: _id }})}>
                        <Text style={styles.buttonTextStyle}>CANCEL</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};
export default EditSer_Page;

