import React, { Component } from 'react';
import { TouchableOpacity, Modal, StyleSheet, View, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';

class PartsCameraUploadText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: Camera.Constants.Type.back,
		};
	}

	render(){
		const { isOpen, setModalVisible, setWhichImage, identifier } = this.props;
		return(
			<View style={styles.photoRow}>
				<Text 
					style={styles.photoButton}
					onPress={() => 
						setModalVisible(true)
					}
				>
					Take Photo</Text>

				<Text style={styles.photoButton}>View Photo</Text>
			</View>
    	)
	}
}
const styles = StyleSheet.create({
  photoRow : {
  	flex:1,
  	justifyContent: 'space-between',
  	flexDirection: 'row',
  },
  photoButton : {
  	flex:1,
  	justifyContent: 'space-between',
  	flexDirection: 'row',
  	color: '#2187FF',
  	textDecorationLine: 'underline',
  },
});
export default PartsCameraUploadText ;
			