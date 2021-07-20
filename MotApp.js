import React from 'react'
import {StyleSheet, Text, View, ScrollView, Image, Modal, TouchableHighlight, SafeAreaView, Alert } from 'react-native'
import {Container, Header, Left, Body, Right, Button, Icon, Root } from "native-base"
import FormMot from './components/FormMot'
import CsLogo from './components/Parts/CsLogo'
import CsMenuToggle from './components/Parts/CsMenuToggle'
import { Font, AppLoading } from "expo"
import FormModalHeaderMenu from './components/Modal/FormModalHeaderMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImageManipulator from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library'

const date = new Date()

export default class MotApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      menuVisible: false,
      propertyId: "PROP" + [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('').toUpperCase(),
      isUploading: false,
      validating: false,
      photos: {},
      suAmountOfSections: 1,
      moAmountOfSections: 1,
      simAmountOfSections: 1,
      venAmountOfSections: 1,
      intAmountOfSections: 1,
      atsAmountOfSections: 1,
      obsgAmountOfSections: 1,
      obstAmountOfSections: 1,
      savedSessions: [],
      menuVisible: this.props.menuVisible,
      loadScreen: false,
      time: date.getHours() + ":" + (date.getMinutes().length > 1 ? "0" + date.getMinutes() :  date.getMinutes()) ,
      date: date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear(),
      user: {
        id: this.props.values.user.id
      }
    }
  }

  setMenuVisible = (visible) => {
    this.setState({menuVisible: visible})
  }

  compressAllImages = async () => {
    const fullImages = this.state.photos
    const imageKeys = Object.keys(fullImages)
    for (const key of imageKeys) {
      const manipResult = await ImageManipulator.manipulateAsync(
        fullImages[key],
        [{resize: { width: 700 }}],
        { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG }
      )
      let saveResult = await MediaLibrary.createAssetAsync(manipResult.uri)
      this.setState({
        photos: {
            ...this.state.photos,
            [key]: saveResult.uri
          }
      })
    }
    this.setState({ menuVisible: false })
    Alert.alert('Image compression complete')
  }

  // Saving state functions
  confirmRemoveSessionStorage = (sessionKey) => {
    Alert.alert(
      'Are you sure you want to delete this saved session?', '', [ 
        { text: 'Yes', onPress: () => this.removeSessionStorage(sessionKey)},
        { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  removeSessionStorage = async (sessionKey) => {
    newArrayOfSessions = []
    await AsyncStorage.removeItem(sessionKey)
    const listOfSessions = await AsyncStorage.getItem('savedSessions')
    let arrayOfSessions = JSON.parse(listOfSessions)
    arrayOfSessions.map((item, key) => 
      (sessionKey !== item) && newArrayOfSessions.push(item)
    )
    await AsyncStorage.setItem('savedSessions', JSON.stringify(newArrayOfSessions))
    this.setState({savedSessions: newArrayOfSessions})
  }

  saveSessionStorage = async () => {
    const dataToSave = JSON.stringify(this.state)
    await AsyncStorage.setItem(this.state.propertyId, dataToSave)
    let arrayOfSessions = []
    const listOfSessions = await AsyncStorage.getItem('savedSessions')
    if (listOfSessions !== null) {
      arrayOfSessions = JSON.parse(listOfSessions)
      if (arrayOfSessions.indexOf(this.state.propertyId) == -1) {
        arrayOfSessions.push(this.state.propertyId)
        const arrayToAdd = JSON.stringify(arrayOfSessions)
        await AsyncStorage.setItem('savedSessions', arrayToAdd)
      }
    } else {
      arrayOfSessions = [this.state.propertyId];
      await AsyncStorage.setItem('savedSessions', JSON.stringify(arrayOfSessions));  
    }
    this.setState({menuVisible: false})
    Alert.alert('Form saved')
  }

  loadSessionStorage = async (sessionKey) => {
    const stateKeys = Object.keys(this.state)
    for (const key of stateKeys) {
      this.setState({[key]: undefined})
    }
    const initialState = {loading: true, menuVisible: false, isUploading: false, validating: false, photos: {}, suAmountOfSections: 1, moAmountOfSections: 1, simAmountOfSections: 1, venAmountOfSections: 1, intAmountOfSections: 1, atsAmountOfSections: 1, obsgAmountOfSections: 1, obstAmountOfSections: 1, menuVisible: false, loadScreen: false}
    this.setState(initialState)
    this.setState({ loading: false })
    const retrievedState = await AsyncStorage.getItem(sessionKey)
    this.setState(JSON.parse(retrievedState))
    this.setState({menuVisible: false})
    this.setState({loadScreen: false})
    Alert.alert('Form loaded')
  }

  switchLoadPage = async () => {
    const listOfSessions = await AsyncStorage.getItem('savedSessions');
    if (listOfSessions !== null) {
      let arrayOfSessions = JSON.parse(listOfSessions)
      this.setState({savedSessions: arrayOfSessions})
    }
    this.setState({loadScreen: !this.state.loadScreen})
    this.setState({menuVisible: false})
  }

  handleChange = (text) => (event) => {
    this.setState({[text]: event.nativeEvent.text })
  }
  handlePicker = (name) => (event) => {
    this.setState({[name]: event})
  }
  handleChoice = (name, value) => {
    this.setState({[name]: value})
  }
  handleSignature = ({base64DataUrl}) => {
    this.setState({signature: base64DataUrl})
  }
  handleImage = (name, value) => {
    this.setState({
      photos: {
          ...this.state.photos,
          [name]: value
        }
    })
  }

  removeImage = (name) => {
    let newImageObject = { photos:{} }
    for (let [key, value] of Object.entries(this.state.photos)) {
      if(key !== name) newImageObject.photos[key] = value
    }
    this.setState(newImageObject)
  }

  render() {
    const values = this.state
    const loadItems = this.state.savedSessions
    const { switchStep, logOutUser } = this.props
    if (this.state.loadScreen) {
      return (
        <View style={styles.container}>
          <FormModalHeaderMenu 
            isOpen={this.state.menuVisible}
            logOut={logOutUser}
            saveSession={this.saveSessionStorage}
            loadSession={this.switchLoadPage}
            setMenuVisible={this.setMenuVisible}
            userInfo={this.props.values.user}
            switchStep={switchStep}
            compressAllImages={this.compressAllImages}
          />
          <Header style={styles.header}>
            <Left style={styles.headerRight}>
              <Button style={styles.headerMenu}
                onPress={() => {switchStep(1)}}
              >
                <Icon 
                  style={styles.headerMenuIcon}
                  name='home'
                />
              </Button>
            </Left>
            <Body>
              <Image style={styles.logo} source={require('./assets/cmm-logo.png')} />
            </Body>
            <Right style={styles.headerRight}>
              <Button style={styles.headerMenu}
                onPress={() => {setMenuVisible(true)}}
              >
                <Icon 
                  style={styles.headerMenuIcon}
                  name='menu'
                />
              </Button>
            </Right>
          </Header>
          <ScrollView>
            <View style={styles.loadList}>
              { loadItems.map((item, key)=>(
                <View key={key} style={styles.loadListItem}>
                  <Icon 
                    style={styles.loadMenuIcon}
                    name='upload'
                    type='FontAwesome5'
                  />
                  <Text style={styles.loadListItemText} onPress={()=>{this.loadSessionStorage(item)}}> { item.toUpperCase() } </Text>
                  <Text style={styles.loadListDeleteText} onPress={()=>{this.confirmRemoveSessionStorage(item)}}>Delete</Text>
                </View>
                )
              )}
            </View>
          </ScrollView>
          <View style={styles.backButtonContainer}>
            <Text style={styles.backButton} onPress={()=>{this.switchLoadPage()}}>Close</Text>
          </View>  
        </View>
      )
    }

    return (
      <Container style={styles.container}>
        <FormModalHeaderMenu 
          isOpen={this.state.menuVisible}
          logOut={logOutUser}
          saveSession={this.saveSessionStorage}
          loadSession={this.switchLoadPage}
          setMenuVisible={this.setMenuVisible}
          userInfo={this.props.values.user}
          switchStep={switchStep}
          compressAllImages={this.compressAllImages}
        />
        
        <Header style={styles.header}>
          <Left style={styles.headerRight}>
              <Button style={styles.headerMenu}
                onPress={() => {switchStep(1)}}
              >
                <Icon 
                  style={styles.headerMenuIcon}
                  name='home'
                />
              </Button>
            </Left>
          <Body style={styles.headerCenter}>
            <Image style={styles.logo} source={require('./assets/cmm-logo.png')} />
          </Body>
          <Right style={styles.headerRight}>
            <Button style={styles.headerMenu}
              onPress={() => {this.setMenuVisible(true)}}
            >
              <Icon 
                style={styles.headerMenuIcon}
                name='menu'
              />
            </Button>
          </Right>
        </Header>

        <FormMot 
          key={this.state.loggedOut} 
          values={values}
          validate={this.validate}
          isLoggedIn={this.props.isLoggedIn}
          compressImages={this.compressImages}
          removeImage={this.removeImage}
          handleImage={this.handleImage}
          handleChange={this.handleChange}
          handlePicker={this.handlePicker}
          handleChoice={this.handleChoice}
          handleSignature={this.handleSignature}
          handleFormSubmit={this.handleFormSubmit}
        />
        
        
      </Container>
    );
  }


  handleImageSubmit = async (post_id, base_url) => {

    const phots = Object.entries(this.state.photos)
      
    phots.forEach((item, i) => {
      let uploadData = new FormData();
      uploadData.append('type', 'formImages');
      // uploadData.append('propID', post_id);
      uploadData.append('propID', this.state.propertyId);
      uploadData.append('suAmount', this.state.suAmountOfSections);
      uploadData.append('obsgAmount', this.state.obsgAmountOfSections);
      uploadData.append('obstAmount', this.state.obstAmountOfSections);
      uploadData.append('simAmount', this.state.simAmountOfSections);
      uploadData.append('submit', 'ok');
      uploadData.append('Content-Type', 'image/jpg');
      uploadData.append("files" + i, {
        uri: item[1],
        type: "image/jpg",
        name: item[0] + '.jpg' || `filename${i}.jpg`,
        filename: item[0] + '.jpg',
      });
      fetch(base_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: "application/x-www-form-urlencoded"
        },
        body: uploadData,
      })
      .then((response) => response.text())
      .then((response) => {
        if(response.status) {
          console.log(response.status);
        } else {  
          console.log(response);
        }
      }).catch((error) => {
        
      });
    });
    this.setState({isUploading: false});
    Alert.alert(
      'Form submitted',
      'Successfully uploaded to dashboard'
    );
  }

  handleFormSubmit = async (image_uri) => {
    let formDataComplete = this.state;
    this.setState({isUploading: true});
    let base_url = 'https://dashboard.propertymot.uk/form-submit/';
    let formData = new FormData();
    formData.append('type', 'formContent');
    // formData.append('user', JSON.stringify(this.props.values.user));
    formData.append('data', JSON.stringify(formDataComplete));
    let postId;
    fetch(base_url, {
      method: 'POST',
      body: formData,
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', }),
    })
    .then((response) => response.text())
    .then((responseText) => {
      postId = responseText;
      this.handleImageSubmit(postId, base_url);
    }).catch((error) => {});
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
  headerCenter: {
    alignItems: 'center',
  },
  headerMenuIcon: {
    color:'white',
  },
  loadList: {
    margin:30,
  },
  loadListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:20,
    marginBottom:20,
    marginLeft:10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  loadListItemText: {
    marginLeft:20,
    fontSize:18,
    flex:1,
  },
  loadListDeleteText: {
    color:'#FC0000',
  },
  loadMenuIcon: {
    color:'#002163',
    fontSize:20,
  },
  logo: {
    width:122,
    height:36,
    alignSelf: 'center',
  },
  menuModalContainer: {
    alignItems:'flex-end',
    justifyContent: 'flex-start',
    height:'100%',
    backgroundColor:'transparent'
  },
  menuModal: {
    backgroundColor: '#002163',
    width:240,
    height:240,
    padding:15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight:10,
    marginTop:-1,
  },
  menuItems: {
    padding:10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize:20,
  },
  menuItemIcon: {
    color: '#FFFFFF',
    fontSize:16,
    marginRight:20,
  },
  closeButton: {
    height:30,
    width:30,
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'flex-end',
    lineHeight: 1,
    padding:0,
    marginRight:2,
  },
  closeButtonIcon: {
    fontSize: 30,
    color:'white',
    marginTop: -1,
  },
  backButtonContainer:{
    padding:10,
    justifyContent: 'center',
  },
  backButton: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
});