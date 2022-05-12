import { View, Button } from 'react-native'
import React from 'react'
import { ProfileInformation, UserInfo} from '../components/ProfileInformation'
import Seperator from '../components/Seperator'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/actions/user.actions'

const userInfo: UserInfo = {
    userAvatarUrl: 'https://reactnative.dev/img/tiny_logo.png',
    userFullName: "Joe mama",
    userEmail: "joe@mama.com",
    userEducationalCredentials: "PhD in Deez ",
}

export default function ProfilePage() {
    const dispatch = useDispatch()
    return (
        <View>
            <ProfileInformation userInfo={userInfo} />
            <Seperator />
            <Button
                title='LOGOUT'
                onPress={() => dispatch(logOut())}
                color='#B10024'
            />
        </View>
    )
}

