import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Card } from 'react-native-elements';
import TestData from '../data_ingest/data';
import Images from "../constants/Images";

export default class Swipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myText: '',
            gestureName: 'none',
            backgroundColor: '#fff',
            yes: 0,
            no: 0
        };
    }

    onSwipeUp = (gestureState) => {
        this.setState({myText: 'You swiped up!'});
    }
    
    onSwipeDown = (gestureState) => {
        this.setState({myText: 'You swiped down!'});
    }
    
    onSwipeLeft = (gestureState) => {
        this.setState({myText: 'You swiped left!'});
    }
    
    onSwipeRight = (gestureState) => {
        this.setState({myText: 'You swiped right!'});
    }
    
    onSwipe = (gestureName, gestureState) => {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
        case SWIPE_UP:
            this.setState({backgroundColor: 'red'});
            break;
        case SWIPE_DOWN:
            this.setState({backgroundColor: 'green'});
            break;
        case SWIPE_LEFT:
            this.setState({backgroundColor: 'blue'});
            break;
        case SWIPE_RIGHT:
            this.setState({backgroundColor: 'yellow'});
            break;
        }
    }

    renderCardItem = (item) => {
        if (!this.props.data.length) {
            return this.props.renderNoMoreCards();
        } 
        return <View>{this.props.renderCards(item)}</View>;
    };

    

    // _swipeTriggered = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    // }

    renderCards = () => {
        return (this.props.data.map(this.renderCardItem));
    };

    render() {
        return(
        <View>
            <GestureRecognizer
                onSwipe={this.onSwipe}
                onSwipeUp={this.onSwipeUp}
                onSwipeDown={this.onSwipeDown}
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}>
                <Text style={{paddingTop:200,textAlign:'center'}}>onSwipe callback received gesture: {this.state.gestureName}</Text>
                {/*this.renderCards()*/}
            </GestureRecognizer>
        </View>);
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