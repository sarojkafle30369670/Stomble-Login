import { db, auth } from '../firebase';
import React, { useLayoutEffect }from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Avatar,Button, ListItem, Icon, Badge, ListItemProps, Switch, colors } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';



const WelcomeScreen = ({navigation}) => {
  
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 30
                }}
                    onPress={signOut}
                >
                    <Entypo name="log-out" size={24} color="black" />
                </TouchableOpacity>
            )
        })

    }, [])

    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
        }).catch((error) => {
            // An error happened.
        });
    }
    const getDoc = () => {
        db.collection(auth.currentUser.uid).get().then((querySnapshot) => {
            var contactList = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                contactList.push(Object.values(doc.data()));
                const data = Object.values(doc.data());
            });
            console.log(querySnapshot);
            console.log(contactList);
            for( var i = 0; i < contactList.length; i ++){
                contactList[i].forEach(element =>{
                    console.log(element);
                    
                    
                    
                })
            }
            
            
        });
    
    }
    


    return (
        <>
            <View>
                <Text>Welcome {auth?.currentUser?.displayName}</Text>
                <Button title="Add New Contact"  onPress={()=>navigation.navigate('Contact')} style={styles.button} />
                <Button title="List Contact" onPress={getDoc} style={styles.button} />

            </View>
            <View style = {{flex:5, justifyContent:'fill', alignItems: 'left', marginTop:'5%'}}>
                <View style = {{flexDirection:"row"}}>
                    <View style ={{width:125, border:'Thin line', backgroundColor:'red'}}>
                        <Text style={{color:'white'}}>Name</Text>
                    </View>
                    <View style ={{width:125, border:'Thin line', backgroundColor:'red'}}>
                        <Text style={{color:'white'}}>Email</Text>
                    </View>
                    <View style ={{width:125, border:'Thin line', backgroundColor:'red'}}>
                        <Text style={{color:'white'}}>Phone</Text>
                    </View>
                    <View style ={{width:125, border:'Thin solid', backgroundColor:'red'}}>
                        <Text style={{color:'white'}}>Avatar</Text>
                    </View>

                </View>
            </View>
            {/* <DataTable>
                <DataTable.Header>
                <DataTable.Title>Dessert</DataTable.Title>
                <DataTable.Title numeric>Calories</DataTable.Title>
                <DataTable.Title numeric>Fat</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
                <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
                />
            </DataTable> */}

        </>
    )
}

export default WelcomeScreen
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        padding: 10
    }
})

