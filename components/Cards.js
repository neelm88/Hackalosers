import React from 'react';
import { StyleSheet, Text, View,Image, ScrollView, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import Images from "../constants/Images";

export default class CardRender extends React.Component {
    
    render(){
        return (
            <Card style={styles.card}>
                <Image style={styles.club_pic} source={Images.empty}/>
                <Text style={styles.clubName} id='club-name'>Club</Text>
                <Text style={styles.mission} id='mission'>Our Mission</Text>
                    <Text p>Our mission is...</Text>
                <Text style={styles.associations} id='affiliation'>Affiliation</Text>
                < Text p> list of affiliations go here </Text>
            </Card>
        )
    }

}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'left',
        justifyContent: 'center',
    },
    club_pic: {
        margin: '10%'
    },
    clubName: {
        textAlign: 'left',
        fontSize: '35%',
        textDecorationLine: "underline",
        fontWeight: 'bold'
    },
    mission: {
        textAlign: 'center',
        fontSize: '25%',
        fontStyle: 'italic',
        paddingTop: '10%'
    },
    associations: {
        textAlign: 'center',
        fontSize: '25%',
        fontStyle: 'italic',
        paddingTop: '10%'
    }
});