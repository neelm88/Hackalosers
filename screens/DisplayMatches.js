
import React, { Component } from 'react';

import { LayoutAnimation, Linking, StyleSheet, View, Text, ScrollView, Image, UIManager, TouchableOpacity, Platform,} from 'react-native';


class ExpandableItemComponent extends Component {

  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
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
     
console.log(dataF[0]);
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
        <Image source={require('../assets/matches.png')} style={{backgroundColor: '#a9dbc0', paddingBottom: 10, paddingTop: 50, alignItems: 'center', width: 300, height: 150}}/>
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
    paddingTop: 30,
    alignContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainHeader: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 40,
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
});
 

const dataF = [{
    "1 Day For The K.I.A., Inc.": [
        "1 Day for the K.I.A.\u2019s purpose is to raise awareness and commemorate fallen military service members. 1 Day for the K.I.A. accomplishes our ...",
        [
            "Columbus",
            "Awareness/Activism",
            "Community Service/Service Learning|Special Interest|"
        ],
        "https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=cef99280-7d97-4496-9396-900def432d97&l=ALL&v=list&c=Columbus&page=0"
    ]},{
    "1girl": [
        "To provide girls everywhere the opportunity to develop the skills and confidence they need to lead fulfilling lives and become successful le...",
        [
            "Columbus",
            "Awareness/Activism",
            "|Community Service/Service Learning"
        ],
        "/involvement/student_organizations/find_a_student_org?i=9c37c72e-3852-475c-8605-32f8594b5dbc&l=ALL&v=list&c=Columbus&page=0"
    ]
}
]

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: false,
    clubName: 'Club 1',
    missionCategory: [{ id: 'Mission' , val: '1 Day for the K.I.A.\u2019s purpose is to raise awareness and commemorate fallen military service members. 1 Day for the K.I.A. accomplishes our ...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=cef99280-7d97-4496-9396-900def432d97&l=ALL&v=list&c=Columbus&page=0' }],
  },
  {
    isExpanded: false,
    clubName: 'Club 2',
    missionCategory: [{ id: 'Mission' , val: 'Sub Cat 4' }],
    infoCategory: [{ id: 'More info' , val: 'https://www.google.com/' }],
},
];