import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import { Card } from 'react-native-elements';
import TestData from '../data_ingest/data';
import Images from "../constants/Images";

export default class Swipe extends React.Component {

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