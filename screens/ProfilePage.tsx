import { View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { ProfileInformation} from '../components/ProfileInformation'
import Seperator from '../components/Seperator'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/actions/user.actions'


interface Props {
    navigation: any
}


export const ProfilePage: React.FC<Props> = ({navigation}) => {
    const user = useSelector( (state:any) => state.user.loggedInUser )
    
    useEffect(() => { }, [user])

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

