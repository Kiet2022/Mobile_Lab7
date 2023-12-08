import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { FAB } from "react-native-paper";
import styles from './Style';
import Loading from './LoadingScreen';

const Home_Page = ({ navigation }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const filePath = 'https://kami-backend-5rs0.onrender.com/services'
    //0373007856-123
    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                return response.json();
            })
            .then((d) => {
                console.log(d);
                setData(d);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const Item = ({ item }) => (
        <View>
            <TouchableOpacity style={styles.itembox} onPress={() => navigation.navigate('DetailService', { screen: 'Detail', params: { _id: item._id } })}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} VND</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <SafeAreaView style={styles.container_main}>
            <View style={styles.container_head}><Text style={styles.title}>Kami</Text></View>

            <View style={styles.container_body}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.subtitle} >SERVICES</Text>
                    <FAB
                        style={styles.fab}
                        label={'ADD'}
                        onPress={() => navigation.navigate('AddService')}
                    />
                </View>

                <View style={{ flex: 6 }}>
                    {isLoading ? <Loading /> :
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <Item item={item} />}
                            keyExtractor={item => item._id}
                        />
                    }
                </View>

            </View>
        </SafeAreaView>
    );
};
export default Home_Page;
