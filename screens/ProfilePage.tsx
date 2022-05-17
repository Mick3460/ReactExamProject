import { View, Button } from 'react-native'
import React from 'react'
import { ProfileInformation} from '../components/ProfileInformation'
import Seperator from '../components/Seperator'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/actions/user.actions'
import { UserInfo } from '../entities/UserInfo'
import { collection, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../App'


const userInfo: UserInfo = {
    userAvatarUrl: 'https://reactnative.dev/img/tiny_logo.png',
    userFullName: "Joe mama",
    userEmail: "joe@mama.com",
    userEducationalCredentials: "PhD in Deez ",
}

interface Props {
    navigation: any
}




export const ProfilePage: React.FC<Props> = ({navigation}) => {
    const user = useSelector( (state:any) => state.user.loggedInUser )
    const dispatch = useDispatch()

    return (
        <View>
            <ProfileInformation user={user} navigation={navigation}/>
            <Seperator />
            <Button
                title='LOGOUT'
                onPress={() => dispatch(logOut())}
                color='#B10024'
            />
        </View>
    )
}

