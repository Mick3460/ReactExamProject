import { View, Button } from 'react-native'
import React, { useState } from 'react'
import { ProfileInformation} from '../components/ProfileInformation'
import Seperator from '../components/Seperator'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/actions/user.actions'
import { UserInfo } from '../entities/UserInfo'
import { collection, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../App'


interface Props {
    navigation: any
}


export const ProfilePage: React.FC<Props> = ({navigation}) => {
    const user = useSelector( (state:any) => state.user.loggedInUser )
    const dispatch = useDispatch()

    console.log(user)

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

