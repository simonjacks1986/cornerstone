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

class VoidDoorsWindows extends Component {
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
					<CsAppTitle>Doors & Windows</CsAppTitle>

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>4.1 : Doors</Text> 
							<CsAppText>Carry out lock change by replacing the primary key mechanism to front and back door. Any flat front doors require internal thumb turn for fire escape.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidDWComment1"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>4.2 : Doors</Text> 
							<CsAppText>External / internal doors, frames, architraves and door furniture to be repaired or replaced where missing or damaged, ease and adjust leaving in full working order.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidDWConfirm2')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidDWConfirm2 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidDWComment2"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>4.3 : Doors</Text> 
							<CsAppText>Internal glazed doors or screens are to be upgraded to comply with safety glazing regulations or in-filled with plywood panel.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidDWComment3"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidDWGrade3')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidDWGrade3 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidDWGrade3 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidDWGrade3 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidDWAdv3"
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>4.4 : Windows</Text> 
							<CsAppText>Window frames, casements, cills, window furniture and window locks to be repaired or replaced where missing or damaged.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidDWComment4"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidDWGrade4')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidDWGrade4 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidDWGrade4 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidDWGrade4 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>4.5 : Windows</Text> 
							<CsAppText>Provide manual non locking window restrictors to all 1st floor windows and above.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidDWComment5"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidDWGrade5')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidDWGrade5 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidDWGrade5 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidDWGrade5 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>4.6 : Windows</Text> 
							<CsAppText>Reglaze missing, cracked or misted / broken down glazing. Upgrade all areas of non-compliant safety glazing.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidDWComment6"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidDWGrade6')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidDWGrade6 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidDWGrade6 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidDWGrade6 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
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
export default VoidDoorsWindows;