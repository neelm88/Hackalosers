import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import Images from "../constants/Images";
import Swipe from '../components/Swipe';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IP from '../constants/ip.js'

export default class SwipeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yes: 0,
            no: 0,
            isLoading: false,
            dataSource: []
        }
    }

    componentDidMount(){
        return fetch(IP.ip + 'club_data.json')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson.results,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
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
                <Text style={styles.clubName} id='club-name'>{club.name}</Text>
                    <Text style={styles.mission}> Our mission is...</Text>
                    <Text style={styles.mission} id='mission'>{'\t'}{club.mission}{'\n'}</Text>
            </Card>
        );
    };

    renderNoMoreCards = () => {
    return (
      <Card top = "300%" title="Match Limit Hit"/>
        );
    };

    render(){
        return (
        <SafeAreaView style = {styles.container}>
            <Swipe 
            onSwipeRight = {this.handleLikedClubs}
            onSwipeLeft = {this.handlePassedClubs}
            keyProp="name"
            data={this.state.dataSource}
            renderCard = {this.renderCards}
            renderNoMoreCards = {this.renderNoMoreCards}/>
            
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        textAlign: 'left',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#a9dbc0',
        height:'100%'
    },
    club_pic: {
       margin: "7%",
    },
    clubName: {
        textAlign: 'left',
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: 'bold'
    },
    mission: {
        textAlign: 'left',
        paddingTop: 20,
    }
});