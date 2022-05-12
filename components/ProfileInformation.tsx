import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native'
import React from 'react'


export type UserInfo = {
    userAvatarUrl: string,
    userFullName: string,
    userEmail: string,
    userEducationalCredentials: string,
}

interface Props {
    userInfo: UserInfo
}


export const ProfileInformation: React.FC<Props> = ({userInfo}) => {
    return (
        <View style={{ marginTop: 40, height: Dimensions.get('window').height / 4 }}>
            <View
                style={styles.userInformation}
            >
                <View
                    style={styles.userInformationImageSection}
                >
                    <Image
                        style={styles.profilePicture}
                        source={{ uri: userInfo.userAvatarUrl }}
                    />
                </View>
                <View
                    style={styles.userInformationSection}
                >
                    <Text style={styles.userFullName}>{userInfo.userFullName}</Text>
                    <View>
                        <Text style={styles.userInfoText}>{userInfo.userEmail}</Text>
                        <Text style={styles.userInfoText}>{userInfo.userEducationalCredentials}</Text>
                    </View>
                </View>
            </View>
            <View
                style={styles.editProfileSection}
            >
                <Button
                    onPress={() => console.log("navigate to edit profile page")}
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
        borderRadius: 100 / 2
    },
})