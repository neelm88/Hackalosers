
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
  {
    isExpanded: false,
    clubName: '3D Urban Dance Team',
    missionCategory: [{ id: 'Mission' , val: 'Our organization will provide a creative outlet for aspiring dancers. Our organization also strives to expose our members as well as our aud...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=b906b1c1-e37b-402c-91b5-20787e5ae5c7&l=ALL&v=list&c=Columbus&page=0' }],
  },
  {
    isExpanded: false,
    clubName: 'Alpha Chi Omega',
    missionCategory: [{ id: 'Mission' , val: 'The purpose of Alpha Chi Omega Fraternity is \u201cto encourage the spirit of true sisterhood, to develop through personal effort a high moral an...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=d7f8f85f-8b5e-4795-bd51-e48fafac8992&l=ALL&v=list&c=Columbus&page=0' }],
  },
  {
    isExpanded: false,
    clubName: 'Buckeyes for WHEP',
    missionCategory: [{ id: 'Mission' , val: 'WHEP at Ohio State aims to support WHEP (Womens Health Education Program) through fundraising, donation drives, and mentorship for moms. In...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=f50a23aa-8ca9-42f0-b82d-b50c2448a638&l=ALL&v=list&c=Columbus&page=0' }],
  },
  {
    isExpanded: false,
    clubName: 'Buckeyes in the Making',
    missionCategory: [{ id: 'Mission' , val: 'To create/restrengthen the bond between OSU and the Columbus community. This will be done by providing the underprivileged children of Colum...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=f6569dde-fb1e-40d5-b1ab-73e3cbfa2dea&l=ALL&v=list&c=Columbus&page=0' }],
  },
  {
    isExpanded: false,
    clubName: 'Information Systems Association',
    missionCategory: [{ id: 'Mission' , val: 'ISA is an organization dedicated to providing MIS, CIS, and CSE students with opportunities to network with technology professionals, profes...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=48c0269f-86ff-4845-b809-9018eb58266c&l=ALL&v=list&c=Columbus&page=0' }],
  },
  {
    isExpanded: false,
    clubName: 'Institute of Industrial & Systems Engineers',
    missionCategory: [{ id: 'Mission' , val: 'To be the premier Industrial Engineering student organization committed to developing professional, academic, and social networks that openl...' }],
    infoCategory: [{ id: 'More info' , val: 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=e22b0410-2439-4a45-83f2-b4aac40a2719&l=ALL&v=list&c=Columbus&page=0' }],
  },

];