import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { auth, db } from '../App'
import { useSelector } from 'react-redux'
import { updateEmail, updateProfile, User as AuthUser } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { User } from '../entities/User'


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
        description,
    }, {merge: true})
    .then(() => {
        //TODO: add dispatch so the user store get updated with new values locally
    })
}


export const ProfileEditPage: React.FC = () => {
    const user: User = useSelector((state: any) => state.user.loggedInUser)

    const [displayname, setDisplayname] = useState(user.displayname)
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
                onChangeText={setDisplayname}
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
            onPress={() => handleUpdateUserInfo(displayname, first, last, email, description)}
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
