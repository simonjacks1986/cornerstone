import React, { Component } from 'react';
import { TouchableOpacity, Modal, StyleSheet, View, Text, Alert, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Icon, Container } from "native-base";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';

const {width, height} = Dimensions.get('screen');

class FormModalCamera extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: Camera.Constants.Type.back,
		};
	}
	componentDidMount() {
	    this.getPermissionAsync();
	}

	getPermissionAsync = async () => {  
      const { status } = await Camera.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to save images.');
      }
	}

	snap = async () => {
	  	if (this.camera) {
	  		const picOptions = {
	  			format: 'jpg',
				result: 'file',
				height: height,
				width: width,
	  			quality: 1,
	  		};
	    	let photo = await this.camera.takePictureAsync(picOptions);
	    	const manipResult = await ImageManipulator.manipulateAsync(
		      photo.uri,
		      [{resize: { width: 800 }, }],
		      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
		    );
		    let saveResult = await MediaLibrary.createAssetAsync(manipResult.uri);
	    	this.props.handleImage([this.props.identifier],saveResult.uri);
	  	}
	  	this.props.setModalCameraVisible(false);
	};

	render(){
		const { isOpen, handleColours, setModalCameraVisible, handleImage } = this.props;
		return(
			<Modal
			    animationType="slide"
			    transparent={false}
			    visible={isOpen}
			    onRequestClose={() => {
					setModalCameraVisible(false)
			    }}
			>
			    <SafeAreaView style={styles.modal}>
			    	
				    	<Camera 
				    		style={styles.camera} 
				    		type={this.state.type}
				    		zoom={0}
				    		ratio="4:3"
				    		ref={ref => {
							    this.camera = ref;
							}}
				    	>
				        	<View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row',}}>
				                <TouchableOpacity
				                  	style={{
				                    	flex: 1,
				                   		alignSelf: 'flex-end',
				                    	alignItems: 'center',
				                  	}}
				                  	onPress={() => {
				                    	this.setState({
					                      	type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
				                    	});
				                	}}>
				                	<Text name="sync" style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
				                </TouchableOpacity>

				                <TouchableOpacity
				                  	style={{
				                    	flex: 1,
				                   		alignSelf: 'flex-end',
				                    	alignItems: 'center',
				                    	justifyContent: 'flex-end',
				                  	}}
				                  	onPress={this.snap}>
				                	<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take picture </Text>
				                </TouchableOpacity>
				                
				                <TouchableOpacity
				                  	style={{
				                    	flex: 1,
				                   		alignSelf: 'flex-end',
				                    	alignItems: 'center',
				                    	justifyContent: 'flex-start',
				                  	}}
				                  	onPress={() => { setModalCameraVisible(false) }}>
				                	<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Close </Text>
				                </TouchableOpacity>
				          	</View>
				    	</Camera>
				    
			    </SafeAreaView>
			</Modal>
    	)
	}
}
const styles = StyleSheet.create({
  modal : {
  	flex:1,
  	alignItems: 'flex-start',
  	justifyContent: 'center',
  	flexDirection: 'row',
  	textAlign: 'center'
  },
  closeButton: {
  	fontSize: 24,
  	fontWeight: 'bold',
  },
  camera: {
  	flex:1,
  }
});
export default FormModalCamera ;