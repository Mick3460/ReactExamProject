import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'



export default function NewEventPage() {
    const [startMonth, setStartMonth] = useState(0)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"]
    return (
        <View style={styles.container}>
            
            <View style={styles.rightOuterBox}>
                <View style={styles.allOfSignup}>
                    <View>
                        <Text style={styles.bigText}> New event? </Text>
                    </View>
                    <View style={styles.signupBox}>
                        <SelectDropdown
	                        data={months}
	                        onSelect={(selectedItem, index) => {
	                        	console.log(selectedItem, index)
	                        }}
	                        buttonTextAfterSelection={(selectedItem, index) => {
	                        	// text represented after item is selected
	                        	// if data array is an array of objects then return selectedItem.property to render after item is selected
	                        	return selectedItem
	                        }}
	                        rowTextForSelection={(item, index) => {
	                        	// text represented for each item in dropdown
	                        	// if data array is an array of objects then return item.property to represent item in dropdown
	                        	return item
	                        }}
                        />
                    </View>
                </View>
            </View>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rightOuterBox: {
        backgroundColor: '#009688',
        
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },
    allOfSignup: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        

    },

    signupBox: {
        height: '30%',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 20,
        
    },

    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 2,
        margin: 1,
        marginBottom: 3,
        width: 220,
    },

    bigText: {
        fontSize: 20,
        
    },
    hugeText: {
        fontSize: 40,
    },
    appButtonContainerRight: {
        elevation: 8,
        backgroundColor: "#FDE7E2",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },

      appButtonTextRight: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
      },

})  