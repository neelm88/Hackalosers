
import React, { Component } from 'react';

import { LayoutAnimation, Linking, StyleSheet, View, Text, ScrollView, Image, UIManager, TouchableOpacity, Platform,} from 'react-native';


class ExpandableItemComponent extends Component {

  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
      loading: false,
      data: [],
    };
  }
  componentDidMount(){
    return fetch('')
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        loading
      })
    })
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }
 

  render() {
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
         // activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.clubName}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {/*Content under the header of the Expandable List Item*/}
          
          {this.props.item.missionCategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              >
              <Image source={require('../assets/buckeye.png')} style={styles.iconStyling}/>
              <Text style={styles.textSubHeader}>
                {item.id}
              </Text>
            
                <Text style = {styles.text}>
                    {'\t'}{item.val}
                </Text>

              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
           {this.props.item.infoCategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              >
              <Text style={styles.textSubHeader}>
                {item.id}
              </Text>
            
              <Text onPress = {() => Linking.openURL(item.val)}>
              {'\t'}Click here for more details</Text>
                
              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
 
export default class DisplayMatches extends Component {
  //Main View defined under this Class
  constructor() {
    super();
    this.state = { listDataSource: CONTENT };
  }
 
  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainHeader}>
          <Image source={require('../assets/matches.png')} style={styles.imgStyling}/>
        </View>
        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.clubName}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainHeader: {
    alignItems: 'center',
    backgroundColor: '#a9dbc0',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  headerText: {
    marginTop: 10,
    fontSize: 23,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  textSubHeader: {
    fontSize: 18,
    color: 'black',
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingTop: 10,
    marginBottom: 10

  },
  text: {
    fontSize: 16,
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  imgStyling: {
    position:"relative",
    marginTop: 50,
    width: 300,
    height: 150,
    marginBottom: -70
  },
  iconStyling: {
 
    marginLeft: 140,
    marginRight: 140,
    position:'relative',
    width: 80,
    height: 80,
  }
});
 

const dataF = [{
      "link": "https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=cef99280-7d97-4496-9396-900def432d97&l=ALL&v=list&c=Columbus&page=0",
      "location": "Columbus",
      "name": "1 Day For The K.I.A., Inc.",
      "service": "Community Service/Service Learning|Special Interest",
      "type": "Awareness/Activism"
    },
    {
      "link": "https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=9c37c72e-3852-475c-8605-32f8594b5dbc&l=ALL&v=list&c=Columbus&page=0",
      "location": "Columbus",
      "name": "1girl",
      "service": "Community Service/Service Learning",
      "type": "Awareness/Activism"
    }
]

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: false,
    clubName: '1 Day For The K.I.A., Inc.',
    missionCategory: [{ id: 'Mission' , val: '1 Day for the K.I.A.\u2019s purpose is to raise awareness and commemorate fallen military service members. 1 Day for the K.I.A. accomplishes our ...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=cef99280-7d97-4496-9396-900def432d97&l=ALL&v=list&c=Columbus&page=0' }],
  },
  {
    isExpanded: false,
    clubName: '1girl',
    missionCategory: [{ id: 'Mission' , val: 'To provide girls everywhere the opportunity to develop the skills and confidence they need to lead fulfilling lives and become successful le...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=9c37c72e-3852-475c-8605-32f8594b5dbc&l=ALL&v=list&c=Columbus&page=0' }],
},

];