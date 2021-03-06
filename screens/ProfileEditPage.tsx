import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { auth, db } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmail, updateProfile, User as AuthUser } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { User } from '../entities/User'
import { updateUser } from '../store/actions/user.actions'


export const ProfileEditPage: React.FC = () => {
    const user: User = useSelector((state: any) => state.user.loggedInUser)
    const dispatch = useDispatch()

    const handleUpdateUserInfo = (displayName: string, first:string, last: string, email: string, description: string) => {
        const docRef = doc(db, "users/" + auth.currentUser?.uid)
    
        //new email
        if (auth.currentUser?.email !== email) {
            updateEmail(auth.currentUser as AuthUser, email)
        }
        //new displayName
        if (auth.currentUser?.displayName !== displayName) {
            updateProfile(auth.currentUser as AuthUser, {displayName: displayName})
        }
    
    
        //update userinformation in db
        setDoc(docRef, {
            displayName,
            first,
            last,
            email,
            description
        }, {merge: true})
        .then(() => {
    
            dispatch(updateUser({
                displayName,
                first,
                last,
                email,
                description
            } as User))
            
        })
    }

    const [displayName, setDisplayName] = useState(user.displayName)
    const [first, setFirst] = useState(user.first)
    const [last, setLast] = useState(user.last)
    const [email, setEmail] = useState(user.email)
    const [description, setDescription] = useState(user.description)


    return (
        <View>
            <Text>Display Name</Text>
            <TextInput
                defaultValue={auth.currentUser?.displayName as string}
                autoCorrect={false}
                onChangeText={setDisplayName}
                style={styles.inputFields}
            />
            <Text>First Name</Text>
            <TextInput
                defaultValue={user.first as string}
                autoCorrect={false}
                onChangeText={setFirst}
                style={styles.inputFields}
            />
            <Text>Last Name</Text>
            <TextInput
                defaultValue={user.last as string}
                autoCorrect={false}
                onChangeText={setLast}
                style={styles.inputFields}
            />

            <Text>Email</Text>
            <TextInput
                defaultValue={auth.currentUser?.email as string}
                autoCorrect={false}
                onChangeText={setEmail}
                style={styles.inputFields}
            />

            <Text>Description</Text>
            <TextInput
                defaultValue={user.description as string}
                autoCorrect={false}
                onChangeText={setDescription}
                style={styles.inputFields}
            />

            <Button
            title='Save Changes'
            onPress={() => handleUpdateUserInfo(displayName!, first!, last!, email!, description!)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputFields: {
        margin: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "black"
    }
})
