import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, Modal, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Icon } from "native-base";

class FormModalHeaderMenu extends Component {

  render(){
    const { isOpen, logOut, saveSession, loadSession, setMenuVisible } = this.props;
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setMenuVisible(false)
        }}
      >
        <SafeAreaView style={styles.menuModalContainer}>
          <View style={styles.menuModal}>
            <TouchableHighlight onPress={() => { setMenuVisible(false) }}>
                <View style={styles.closeButton}>
                  <Icon style={styles.closeButtonIcon} name="close" />
                </View>
            </TouchableHighlight>

            <View 
              style={styles.menuItems}
            >
              <TouchableHighlight onPress={() => { saveSession(); }}>
                <View style={styles.menuItem}>
                  <Icon 
                    style={styles.menuItemIcon}
                    name='download'
                    type='FontAwesome5'
                  />
                  <Text style={styles.menuItemText}>Save form</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => { loadSession(); }}>
                <View style={styles.menuItem}>
                  <Icon 
                    style={styles.menuItemIcon}
                    name='upload'
                    type='FontAwesome5'
                  />
                  <Text style={styles.menuItemText}>Load form</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => { logOut() }}>
                <View style={styles.menuItem}>
                  <Icon 
                    style={styles.menuItemIcon}
                    name='sign-out-alt'
                    type='FontAwesome5'
                  />
                  <Text style={styles.menuItemText}>Log out</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});
export default FormModalHeaderMenu;