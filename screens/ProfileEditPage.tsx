import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { auth } from '../App'
import { useSelector } from 'react-redux'
import { updateEmail, updateProfile, User } from 'firebase/auth'





export const ProfileEditPage: React.FC = () => {
    const user = useSelector((state: any) => state.user.loggedInUser)
    return (
        <View>
            <Text>Display Name</Text>
            <TextInput
                defaultValue={auth.currentUser?.displayName as string}
                autoCorrect={false}
                onSubmitEditing={({nativeEvent}) => updateProfile(auth.currentUser as User, {displayName: nativeEvent.text})}

            />

            <Text>Email</Text>
            <TextInput
                defaultValue={auth.currentUser?.email as string}
                autoCorrect={false}
                onSubmitEditing={({nativeEvent}) => updateEmail(auth.currentUser as User, nativeEvent.text)}

            />

            <Text>Description</Text>
            <TextInput
                defaultValue={user.description as string}
                autoCorrect={false}
            />
        </View>
    )
}
