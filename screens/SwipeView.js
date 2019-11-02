import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import Images from "../constants/Images";
import Swipe from '../components/Swipe';
import TestData from '../data_ingest/data';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class SwipeView extends React.Component {

    renderCards = (club) => {
        return(
            <Card style={[styles.card, {}]}>
                <Image style={styles.club_pic} source={Images.empty}/>
                <Text style={styles.clubName} id='club-name'>Club</Text>
                <Text style={styles.mission} id='mission'>Our Mission</Text>
                    <Text>Our mission is...</Text>
            </Card>
        );
    };

    _renderCards = (cards) => {
        return cards.map((card, i) => {
            return (
                <Card key={i} style={[styles.card, {zIndex: cards.length - 1}]}>
                    <Image style={styles.club_pic} source={Images.empty}/>
                    <Text style={styles.clubName} id='club-name'>Club</Text>
                    <Text style={styles.mission} id='mission'>Our Mission</Text>
                        <Text>Our mission is...</Text>
                </Card>
            );
        })
        
    }

    renderNoMoreCards = () => {
    return (
      <Card title="No More clubs"/>
        );
    };

    render(){
        return (
        <View>
            <Swipe data={TestData}
            renderCards = {this.renderCards}
            renderNoMoreCards = {this.renderNoMoreCards}/>
        </View>
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
        textDecorationLine: "underline",
        fontWeight: 'bold'
    },
    mission: {
        textAlign: 'center',
        fontStyle: 'italic',
        paddingTop: '10%'
    },
    associations: {
        textAlign: 'center',
        fontStyle: 'italic',
        paddingTop: '10%'
    }
});