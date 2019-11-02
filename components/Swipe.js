import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import { Card } from 'react-native-elements';
import TestData from '../data_ingest/data';
import Images from "../constants/Images";

export default class Swipe extends React.Component {
    constructor(props) {
            super(props);
            this._panResponder = PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onPanResponderMove: (evt, gestureState) => {
                    this.position.setValue({ x: gesture.dx, y: gesture.dy });
                    // The most recent move distance is gestureState.move{X,Y}
                    // The accumulated gesture distance since becoming responder is
                    // gestureState.d{x,y}
                },
                onPanResponderRelease: (evt, gestureState) => {
                    // The user has released all touches while this view is the
                    // responder. This typically means a gesture has succeeded
                },
            });
        };

    renderCardItem = (item) => {
        console.log(this.props.data.length)
        if (!this.props.data.length) {
            return this.props.renderNoMoreCards();
        } 
        return (this.props.renderCards(item));
    };

    renderCards = () => {
        return (this.props.data.map(this.renderCardItem));
    };

    render() {
        return <View>{this.renderCards()}</View>;
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