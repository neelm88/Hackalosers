import React from 'react';
import { StyleSheet, Platform, UIManager, LayoutAnimation, PanResponder, Text, View , Dimensions, Image, Animated} from 'react-native';
import { Card } from 'react-native-elements';
import TestData from '../data_ingest/data';
import Images from "../constants/Images";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;


export default class Swipe extends React.Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
        keyProp: 'id'
      };

    constructor(props) {
            super(props);
            this.position = new Animated.ValueXY();
            this._panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (event, gesture) => {
                    this.position.setValue({ x: gesture.dx, y: gesture.dy });
                },
                onPanResponderRelease: (event, gesture) => {
                    if (gesture.dx > SWIPE_THRESHOLD) {
                        this.forceSwipe('right');
                      } else if (gesture.dx < -SWIPE_THRESHOLD) {
                        this.forceSwipe('left');
                      } else {
                        this.resetPosition();
                      }
                }
            });

            this.state = { index: 0 };
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];
        
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.position.setValue({ x: 0, y: 0 });
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        this.setState({ index: this.state.index + 1 });
    }
    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.position, {
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
    }
        
    resetPosition() {
        Animated.spring(this.position, {
        toValue: { x: 0, y: 0 }
        }).start();
    }
    getCardStyle() {
        const { position } = this;
        const rotate = position.x.interpolate({
          inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
          outputRange: ['-120deg', '0deg', '120deg']
        });
        
        return {
          ...position.getLayout(),
          transform: [{ rotate }]
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
          this.setState({
            index: 0
          })
        }
      }

    
   renderCards = () => {

    if (this.state.index >= this.props.data.length) {
        return this.props.renderNoMoreCards();
      }
  
      const deck = this.props.data.map((item, i) => {
        if (i < this.state.index) { return null; }
  
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item[this.props.keyProp]}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this._panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
  
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[styles.cardStyle, { top: 0 * (i - this.state.index)}]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      });
  
      return Platform.OS === 'android' ? deck : deck.reverse();
      };


    render() {
        return <View>{this.renderCards()}</View>;
    }
}

const styles = StyleSheet.create({

    card: {
        flex: 1,
        backgroundColor: '#a9dbc0',
        textAlign: 'left',
        justifyContent: 'center',
    },
    club_pic: {
        margin: '10%'
    },
    clubName: {
        textAlign: 'left',
        textDecorationLine: "underline",
        fontWeight: 'bold',
        fontStyle: "italic",
    },
    mission: {
        textAlign: 'center',
        fontStyle: 'italic',
        paddingTop: '10%'
    },
   cardStyle: {
        position: 'absolute',
        backgroundColor: '#a9dbc0',
        width: SCREEN_WIDTH
      }
});

