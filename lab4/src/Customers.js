
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native"
import { FAB, Appbar } from "react-native-paper";
import styles from "./Style";
import Loading from "./LoadingScreen";

const Customers_Page = ({ navigation }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const filePath = 'https://kami-backend-5rs0.onrender.com/customers';

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
        <View style={styles.itembox}>
            <View>
                <Text style={styles.subtitle}>{item.name}</Text>
            </View>
            <View style={styles.itemrow}>
                <Text style={styles.itemTitle}>Phone    :</Text>
                <Text style={styles.itemValue}>{item.phone}</Text>
            </View>
            <View style={styles.itemrow}>
                <Text style={styles.itemTitle}>Total spend   :</Text>
                <Text style={styles.itemPrice}>{item.totalSpent}</Text>
            </View>

        </View>
    );
    return (
        <SafeAreaView style={styles.container_main}>
            <View style={styles.container_head}><Text style={styles.title}>Kami</Text></View>
            <View style={styles.container_body}>
                <Text style={styles.subtitle} >CUSTOMERS</Text>

                {isLoading ? <Loading /> :
                    <View>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <Item item={item} />}
                            keyExtractor={item => item._id}
                        />
                        <FAB
                            label="ADD"
                            style={styles.fab}
                            onPress={() => navigation.navigate('CustomerTab', { screen: 'AddCustomer' })}
                        />
                    </View>
                }
            </View>
        </SafeAreaView>
    );
};
export default Customers_Page;
