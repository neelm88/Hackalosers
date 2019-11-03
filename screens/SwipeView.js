import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import Images from "../constants/Images";
import Swipe from '../components/Swipe';
import TestData from '../data_ingest/data';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class SwipeView extends React.Component {
    state = {
        yes:0,
        no:0
    }

    handleLikedClubs = () => {
        this.setState(({ likedClubs }) => ({
            likedClubs: likedClubs + 1
        }));
      };
    
      handlePassedClubs = () => {
        this.setState(({ passedClubs }) => ({
            passedClubs: passedClubs + 1
        }));
      };

    renderCards(club){
        return(
            <Card style={styles.card}>
                <Image style={styles.club_pic} source={Images.empty}/>
                <Text style={styles.clubName} id='club-name'>Club</Text>
                <Text style={styles.mission} id='mission'>{club.name}</Text>
                    <Text>Our mission is...</Text>
            </Card>
        );
    };

    renderNoMoreCards = () => {
    return (
      <Card title="Match Limit Hit"/>
        );
    };

    render(){
        return (
        <SafeAreaView>
            <Swipe 
            onSwipeRight = {this.handleLikedClubs}
            onSwipeLeft = {this.handlePassedClubs}
            keyProp="name"
            data={TestData}
            renderCard = {this.renderCards}
            renderNoMoreCards = {this.renderNoMoreCards}/>
        </SafeAreaView>
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