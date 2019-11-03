import React from 'react';
import { StyleSheet, SafeAreaView, Text, Dimensions, Image, View, TouchableOpacity} from 'react-native';
import { Card, Icon } from 'react-native-elements';
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