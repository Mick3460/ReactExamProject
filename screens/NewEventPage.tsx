import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';
import { createEventFirebase } from '../store/actions/event.actions';
import {EventBlogItem} from '../entities/EventBlogItem'
import { Picker } from "@react-native-picker/picker";


// export default function NewEventPage() {

//     type ScreenNavigationType = NativeStackNavigationProp<
//     StackParamList,"LandingPage" >

//     const [title, setTitle] = useState('')
//     const [startDate, setStartDate] = useState('')
    // const [startMonth, setStartMonth] = useState('')
//     const [endDate, setEndDate] = useState('')
//     const [location, setLocation] = useState('')
//     const [detail, setDetail] = useState('')
//     const [img, setImg] = useState('')
//     const dispatch = useDispatch() //useDispatch er en hook :)
//     const navigation = useNavigation<ScreenNavigationType>()
    
//     function handleAddEvent () {
//         const event: EventBlogItem = {
//             title,
//             startDate,
//             endDate,
//             location,
//             detail,
//             img
//         }
//         createEventFirebase(event)
//         //dispatch(signUp(email,pw));
//         navigation.navigate("LandingPage")
//     }
//     return (
//         <View style={styles.container}>
            
//             <View style={styles.rightOuterBox}>
//                 <View style={styles.allOfSignup}>
//                     <View>
//                     <Text style={styles.bigText}> New member? Sign up! </Text>
//                     </View>
//                 <View style={styles.signupBox}>
//                     <TextInput value={title} onChangeText={setTitle} style={styles.textInput} placeholder="Email" />
//                     <TextInput value={startDate} secureTextEntry={true} onChangeText={setStartDate} style={styles.textInput} placeholder="Password" />
//                     <Picker
//                         selectedValue={startMonth}
//                         onValueChange={(value, index) => setStartMonth(value)} // we don't need to use index here.
//                         mode="dropdown" // Android only
//                         style={styles.picker}
//                     >   <Picker.Item label="Month" value={0} />
//                         <Picker.Item label="January" value={1} />
//                         <Picker.Item label="February" value={2} />
//                         <Picker.Item label="March" value={3} />
//                         <Picker.Item label="April" value={4} />
//                         <Picker.Item label="May" value={5} />
//                         <Picker.Item label="June" value={6} />
//                         <Picker.Item label="July" value={7} />
//                         <Picker.Item label="August" value={8} />
//                         <Picker.Item label="September" value={9} />
//                         <Picker.Item label="October" value={10} />
//                         <Picker.Item label="November" value={11} />
//                         <Picker.Item label="December" value={12} />
//                     </Picker>
//                 </View>
                
//                 <TouchableOpacity onPress={handleAddEvent} style={styles.appButtonContainerRight}>
//                 <Text style={styles.appButtonTextRight}> SIGN UP </Text>
//                 </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// }

export default function NewEventPage() {
    const [startMonth, setStartMonth] = useState('')
    return (
        <View style={styles.container}>
            
            <View style={styles.rightOuterBox}>
                <View style={styles.allOfSignup}>
                    <View>
                        <Text style={styles.bigText}> New member? Sign up! </Text>
                    </View>
                    <View style={styles.signupBox}>
                        {/* <Picker
                            selectedValue={startMonth}
                            onValueChange={(value, index) => setStartMonth(value)} // we don't need to use index here.
                            mode="dropdown" // Android only
                            style={styles.picker}
                        >   <Picker.Item label="Month" value={0} />
                            <Picker.Item label="January" value={1} />
                            <Picker.Item label="February" value={2} />
                            <Picker.Item label="March" value={3} />
                            <Picker.Item label="April" value={4} />
                            <Picker.Item label="May" value={5} />
                            <Picker.Item label="June" value={6} />
                            <Picker.Item label="July" value={7} />
                            <Picker.Item label="August" value={8} />
                            <Picker.Item label="September" value={9} />
                            <Picker.Item label="October" value={10} />
                            <Picker.Item label="November" value={11} />
                            <Picker.Item label="December" value={12} />
                        </Picker> */}
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