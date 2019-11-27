import React, { Component } from 'react';
import { TouchableHighlight, Modal, StyleSheet, View, Text, Alert } from 'react-native';
import { Icon } from "native-base";

class FormModalColourPicker extends Component {

	render(){

		const { isOpen, handleColours, setModalVisible } = this.props;
		return(
			<Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
    				<TouchableHighlight onPress={() => { setModalVisible(false) }}>
              <View style={styles.closeButton}>
                <Icon style={styles.closeButtonIcon} name="close" />
              </View>
    				</TouchableHighlight>

    				<TouchableHighlight
    					style={styles.clickBoxWidth}
    					onPress={() => { handleColours(3) }}>
    					<View style={styles.clickBox}>
    						<View style={styles.clickBoxGreen}></View>
    					</View>
    				</TouchableHighlight>

    				<TouchableHighlight
    					style={styles.clickBoxWidth}
    					onPress={() => { handleColours(2) }}>
    					<View style={styles.clickBox}>
    						<View style={styles.clickBoxOrange}></View>
    					</View>
    				</TouchableHighlight>

    				<TouchableHighlight
    					style={styles.clickBoxWidth}
    					onPress={() => { handleColours(1) }}>
    					<View style={styles.clickBox}>
    						<View style={styles.clickBoxRed}></View>
    					</View>
    				</TouchableHighlight>

            <TouchableHighlight 
              onPress={
                () => { 
                  setModalVisible(false) 
                  handleColours(null)
                }
              }
            >
              <View style={styles.clearButton}>
                <Text>Clear</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
	}
}
const styles = StyleSheet.create({
  modalContainer: {
    flex:1,
    justifyContent: 'flex-end',
  },
  modal : {
  	alignItems: 'flex-end',
  	justifyContent: 'center',
  	flexDirection: 'row',
  	padding:40,
  	textAlign: 'center',
    backgroundColor:'#fff',
    height:100,
  },
  closeButton: {
    marginRight:5,
    height:40,
    width:40,
    borderWidth:1,
    borderRadius:20,
    borderColor:'#DDDDDD',
    borderStyle:'solid',
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    height:40,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  closeButtonIcon: {
    fontSize: 40,
  },
  clickBoxWidth: {
  	width:40,
    marginRight:5,
  },
  clickBox: {
  	borderWidth:1,
  	borderColor:'#DDDDDD',
  	borderStyle:'solid',
  	backgroundColor:'#fff',
  	height:40,
  	marginTop:15,
  	padding:5
  },
  clickBoxRed: {
  	backgroundColor: '#FC0000',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  },
  clickBoxOrange: {
  	backgroundColor: '#FCC400',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  },
  clickBoxGreen: {
  	backgroundColor: '#28A745',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  }
});
export default FormModalColourPicker;