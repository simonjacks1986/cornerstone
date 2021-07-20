import React, { Component } from 'react';
import { TouchableOpacity, Modal, StyleSheet, View, Text, Alert, SafeAreaView, Image, Dimensions } from 'react-native';
import { Icon } from "native-base";

class FormModalCamera extends Component {
	render(){
		const { isOpen, setModalVisible, handleImage, imageUri, removeImage, identifier } = this.props;
		return(
			<Modal
			    animationType="slide"
			    transparent={false}
			    visible={isOpen}
			    onRequestClose={() => {
					setModalVisible(false)
			    }}
			>
			    <SafeAreaView style={styles.modal}>
			    	<View style={{ flex: 1 }}  >
			    		<Image
							style={styles.backgroundImage}
							source={{uri: imageUri}}
							resizeMode={'contain'}
				        />
			        	<View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row',}}>
			                <TouchableOpacity
			                  	style={{
			                    	flex: 1,
			                   		alignSelf: 'flex-end',
			                    	alignItems: 'center',
			                    	justifyContent: 'flex-end',
			                  	}}
			                  	onPress={() => { setModalVisible(false) }}>
			                	<Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Close </Text>
			                </TouchableOpacity>

			                <TouchableOpacity
			                  	style={{
			                    	flex: 1,
			                   		alignSelf: 'flex-end',
			                    	alignItems: 'center',
			                    	justifyContent: 'flex-end',
			                  	}}
			                  	onPress={() => { 
			                  		removeImage(identifier);
			                  		setModalVisible(false);
			                  	}}>
			                	<Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Delete </Text>
			                </TouchableOpacity>
			                
			          	</View>
			    	</View>
			    </SafeAreaView>
			</Modal>
    	)
	}
}

const styles = StyleSheet.create({
  modal : {
  	flex:1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	flexDirection: 'row',
  	textAlign: 'center',
  	height:'100%',
  },
  closeButton: {
  	fontSize: 24,
  	fontWeight: 'bold',
  },
  backgroundImage: {
  	flex:1,
  },
});
export default FormModalCamera ;