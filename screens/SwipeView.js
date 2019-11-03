import React from 'react';
import { StyleSheet, SafeAreaView, Text, Dimensions, Image, View, TouchableOpacity} from 'react-native';
import { Card, Icon } from 'react-native-elements';
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

            <View style={styles.fullContainer}>
            <View style={styles.yesButtonOuter}>
                <TouchableOpacity
                    style={styles.button}>
                    <Icon name="close"  size={30} color="#ff0000" />
                </TouchableOpacity>
            </View>

            <View style={styles.messageButtonOuter}>
                <TouchableOpacity
                    style={styles.button}>
                    <Icon name="message"  size={30} color="#01a699" />
                </TouchableOpacity>
            </View>

            <View style={styles.noButtonOuter}>
                <TouchableOpacity
                    style={styles.button}>
                    <Icon name="check"  size={30} color="#01a699" />
                </TouchableOpacity>
            </View>
            </View>
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
    }/* ,yesButtonOuter: {
        position: 'relative',
        marginRight: 50,
    }, noButtonOuter: {
        position: 'relative',
        marginLeft: 50,
    }, messageButtonOuter: {
        position: 'relative',
        paddingLeft: '56%'
    } */, button: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        margin: '5%',
        justifyContent: 'center',
        width: 75,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 50
    }, fullContainer :{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }, 
    
});