import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native'
import React from 'react'
import { User } from '../entities/User'


interface Props {
    user: User
    navigation: any
}


export const ProfileInformation: React.FC<Props> = ({user, navigation}) => {
    return (
        <View style={{ marginTop: 40, height: Dimensions.get('window').height / 4 }}>
            <View
                style={styles.userInformation}
            >
                <View style={styles.userInformationImageSection}>
                    <Image
                        style={styles.profilePicture}
                        source={{ uri: user.photoURL as string }}
                    />
                </View>
                <View style={styles.userInformationSection}>
                    <Text style={styles.userFullName}>{`${user.first} ${user.last}`}</Text>
                    <View>
                        <Text style={styles.userInfoText}>{user.email}</Text>
                        <Text style={styles.userInfoText}>{user.description}</Text>
                    </View>
                </View>
            </View>
            <View
                style={styles.editProfileSection}
            >
                <Button
                    onPress={() => navigation.navigate("ProfileEditPage")}
                    title='EDIT PROFILE'
                    color={'#5050A5'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInformation: {
        flexDirection: 'row',
        flex: 1
    },
    userInformationSection: {
        flex: 2
    },
    userFullName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#32305D',
    },
    userInfoText: {
        fontSize: 12,
        paddingTop: 5
    },
    userInformationImageSection: {
        flex: 1,
        padding: 10
    },
    editProfileSection: {
        flex: 0
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
})