import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Root } from "native-base";
import AppLoading from 'expo-app-loading';
import VoidApp from './VoidApp';
import MotApp from './MotApp';
import FormLogin from './components/FormLogin'
import theme from './assets/styles/common.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loggedOut: 0,
      validating: false,
      loadScreen: false,
      menuVisible: false,
      user: {
        isLoggedIn: 0,
        authToken: null,
        id: null,
        name: null
      },
      whichScreen: 2,
    };
  }

  switchStep = (step) => {
    if(step == 1) {
      Alert.alert(
        'Are you sure you want to leave this survey? All unsaved progress will be lost.', '', [ 
          { text: 'Yes', onPress: () => this.setState({ whichScreen: step })},
          { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'cancel'},
        ],{cancelable: false},
      );
    } else {
      this.setState({ whichScreen: step });  
    }
  }

  setMenuVisible = (visible) => {
    this.setState({menuVisible: visible});
  }

  logOutUser = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(
      {
        isLoggedIn: 0,
        authToken: null,
        id: null,
        name: null,
      })
    );
    this.setState({loggedOut: 1});
    this.setState({user:{isLoggedIn: 0}});
    this.setState({menuVisible: false});
    return true;
  }

  componentDidMount = async () => {
    this.setState({ loading: false });
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        let userInfo = JSON.parse(value)
        this.setState({
          user: {
            isLoggedIn: userInfo.isLoggedIn,
            authToken: userInfo.authToken,
            id: userInfo.id,
            name: userInfo.name
          }
        })
      }
    } catch (error) { /* Do nowt and go to login screen */ }
  }

  validate = () => {
    this.setState({ validating: true });
    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('login', this.state.username);
    formData.append('password', this.state.password);
    return fetch('https://dashboard.propertymot.uk/client-login/', {
      method: 'POST',
      body: formData, 
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let returnData = response.data;
      if(response.status) {
        if (this.saveUserStorage(returnData)){
          this.setState({
            validating: false,
            user: { isLoggedIn: 1 }
          });
        } else { 
          console.log('Failed to store auth'); 
          this.setState({ validating: false });
        }
      } else { 
        Alert.alert('Incorrect details');
        this.setState({ validating: false });
      } 
    }).catch((error) => { console.error(error); });
  } 

  async saveUserStorage(userData){
    if (userData) {
      await AsyncStorage.setItem('user', JSON.stringify({
          isLoggedIn: 1,
          authToken: userData.auth_token,
          id: userData.user_id,
          name: userData.user_login
        })
      );
      return true;
    }
    return false;
  }

  handleChange = (text) => (event) => {
    this.setState({[text]: event.nativeEvent.text });
  }
 
  render() {
    const { whichScreen } = this.state;
    const values = this.state;
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }
    if (!this.state.user.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Header style={styles.header}>
            <Left />
            <Body>
              <Image style={styles.logo} source={require('./assets/cmm-logo.png')} />
            </Body>
            <Right/>
          </Header>
          <ScrollView>
            <FormLogin
              handleChange={this.handleChange}
              validate={this.validate}
              values={values}
              validating={values.validating}
            />
          </ScrollView>
        </View>
      )
    } else {
      switch(whichScreen){
        case 1:
          return (
            <View style={styles.container}>
              <Header style={styles.header}>
                <Left />
                <Body>
                  <Image style={styles.logo} source={require('./assets/cmm-logo.png')} />
                </Body>
                <Right/>
              </Header>
              <View style={styles.choiceButtonContainer}>
                <Button block
                  style={styles.choiceButton}
                  onPress={() => {this.switchStep(2)}}
                >
                  <Text style={styles.choiceButtonText}>Moisture MOT</Text>
                </Button>
                 
                <Button block
                  style={styles.choiceButton}
                  onPress={() => {this.switchStep(3)}}
                >
                  <Text style={styles.choiceButtonText}>Void</Text>
                </Button>
              </View>
            </View>
          )
        case 2:
          return (
            <View style={styles.container}>
              <ScrollView>
                <MotApp 
                  key={this.state.loggedOut}
                  values={values}
                  validate={this.validate}
                  isLoggedIn={this.state.user.isLoggedIn}
                  switchStep={this.switchStep}
                  logOutUser={this.logOutUser}
                  menuVisible={this.state.menuVisible}
                />
              </ScrollView>
            </View>
          )
        case 3:
          return (
            <View style={styles.container}>
              <ScrollView>
                <VoidApp 
                  key={this.state.loggedOut}
                  values={values}
                  validate={this.validate}
                  isLoggedIn={this.state.user.isLoggedIn}
                  switchStep={this.switchStep}
                  logOutUser={this.logOutUser}
                  menuVisible={this.state.menuVisible}
                />
              </ScrollView>
            </View>
          )
      }
    }
  }
}



  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FC',
  },
  header: {
    height:80,
    padding:0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerMenu: {
    borderRadius:0,
    backgroundColor:'#002163',
    height:60,
  },
  headerRight: {
    alignSelf: 'flex-end',
  },
  headerMenuIcon: {
    color:'white',
  },
  logo: {
    width:122,
    height:36,
  },
  choiceButtonContainer: {
    padding:20,
  },
  choiceButton: {
    marginBottom: 20,
    backgroundColor:'#002163',
  },
  choiceButtonText: {
    color:'#FFFFFF',
    fontSize:26,
  }
});