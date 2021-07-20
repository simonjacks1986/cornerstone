import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Button, Text, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';


class VoidAdditionalWorks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalColourVisible: false,
		    whichGrade: 1,
		};
	}

	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	handleColours = which =>{
		const { handleChoice } = this.props;
		handleChoice(this.state.whichGrade, which);
		this.setModalColourVisible(!this.state.modalColourVisible);
	}

	handleTickBox = which => {
		const { handleChoice, values } = this.props;
		if(values[which]) {
			handleChoice(which, 0);
		} else {
			handleChoice(which, 1);
		}
		
	}

	render(){
		const {values, handleChange, handlePicker, handleImage, handleChoice } = this.props;
		return(
			<Container style={styles.container}>
        <ScrollView>
  				<FormModalColourPicker
  					isOpen={this.state.modalColourVisible}
  					setModalVisible={this.setModalColourVisible}
  					handleColours={this.handleColours}
  				/>
  				<CsAppTitle>Additional works identified or call back reason</CsAppTitle>

  				<View style={styles.rowContainer}>
  					<View style={styles.rowText}>
  						<Text style={styles.title}>9.1</Text> 
  						<CsAppText>Additional works or refer above for fail reasons.</CsAppText>
  					</View>
  					<View style={styles.rowControls}>
  						<View style={styles.row}>
  							<View style={styles.rowFirst}>
  								<CsAppLabel>Comment</CsAppLabel>
  							    <CsInput
  									handleChange={handleChange}
  									values={values}
  									identifier={"voidAHComment1"}
  								/>
  							</View>
  							<View style={styles.rowSecond}>
  								<CsAppLabel>Grade</CsAppLabel>
  								<TouchableHighlight
  			            			style={styles.clickBoxWidth}
  									onPress={() => {
  										this.setModalColourVisible(true)
  										this.setWhichGrade('voidAHGrade1')
  									}}
  								>
  									<View style={styles.clickBox}>
  										{ (values.voidAHGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
  										{ (values.voidAHGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
  										{ (values.voidAHGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
  									</View>
  								</TouchableHighlight>
  							</View>
  						</View>
  						<View style={styles.row}>
  							<View style={styles.rowFirst}>
  								<CsAppLabel>Advisory</CsAppLabel>
  								<CsInput
  								  	handleChange={handleChange}
  									values={values}
  									identifier="voidAHAdv1"
  								/>
  							</View>
  						</View>
  					</View>
  				</View>
          </ScrollView>
  				<FormControls
  					nextStep={this.props.nextStep}
  					prevStep={this.props.prevStep}
  				/>
			</Container>
		)
	}
}
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  button: {
  	backgroundColor: theme.PRIMARY_COLOR,
  	width:140,
  	height: 48,
  	alignSelf: 'flex-end',
  	justifyContent: 'center',
  	borderRadius: 1,
  	marginTop:40,
  },
  title: {
  	fontSize: theme.FONT_SIZE_LARGE,
  	marginBottom:10,
  },
  divider: {
  	borderBottomWidth: 1,
  	borderBottomColor: '#ddd',
  	height:1,
  	marginTop:20,
  	marginBottom:20,
  },
  rowContainer: {
  	flex: 1,
    flexDirection:'row',
  },
  row: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:5,
  },
  rowText: {
  	flex:2,
  	paddingRight:40,
  },
  rowControls: {
  	flex:4,
  },
  rowFirst: {
  	flex:3,
  	margin:5
  },
  rowSecond: {
  	margin:5
  },
  closeButton: {
  	fontSize: 24,
  	fontWeight: 'bold',
  },
  clickBoxWidth: {
  	width:40,
  },
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
  confirmBoxWidth: {
    width:40,
    marginBottom: 20,
  },
  confirmBox: {
  	borderWidth:1,
  	borderColor:'#DDDDDD',
  	borderStyle:'solid',
  	backgroundColor:'#fff',
  	height:40,
  	marginTop:15,
  	padding:5,
  	paddingTop:10,
  }
});
export default VoidAdditionalWorks;