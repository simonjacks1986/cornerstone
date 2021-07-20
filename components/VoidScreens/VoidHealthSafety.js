import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import { Button, Text, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';

class VoidHealthSafety extends Component {
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
					<CsAppTitle>Health & Safety</CsAppTitle>
					
					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>1.1 : Asbestos</Text>
							<CsAppText>External - Garden, outbuildings, soffits. Internal - Ceilings, Floors, Sink Pad, Boiler Cupboards, Risers / Pipework insulation.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidHSComment1"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidHSGrade1')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidHSGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidHSGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidHSGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidHSAdv1"
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>1.2 : Fire</Text>
							<CsAppText>FD30s check fully, associated compartmentation, polystyrene ceilings/coving, smoke alarms, general means of escape. Overhead Door closer / perko fitted and correctly operates.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidHSComment2"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidHSGrade2')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidHSGrade2 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidHSGrade2 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidHSGrade2 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidHSAdv2"
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>1.3 : Electrical</Text>
							<CsAppText>External electrical intake cupboard, inspect, CCU, wiring and sockets and switches.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidHSComment3"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidHSGrade3')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidHSGrade3 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidHSGrade3 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidHSGrade3 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidHSAdv3"
									/>
								</View>
							</View>
						</View>
					</View>
							
					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>1.4 : Gas</Text>
							<CsAppText>Mains External Gas Cupboard - intact and lockable, gas bayonet removed and capped, boiler / flu issues, Smell of gas.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidHSComment4"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidHSGrade4')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidHSGrade4 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidHSGrade4 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidHSGrade4 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidHSAdv4"
									/>
								</View>
							</View>
						</View>
					</View>
				
					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>1.5 : Legionella</Text>
							<CsAppText>Shower Hose and head, plumbing pipe work and dead ends.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidHSComment5"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidHSGrade5')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidHSGrade5 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidHSGrade5 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidHSGrade5 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidHSAdv5"
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />
				
					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>1.6 : Other</Text>
							<CsAppText>Trips and falls etc.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidHSComment6"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidHSGrade6')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidHSGrade6 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidHSGrade6 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidHSGrade6 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidHSAdv6"
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />
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
  clickBoxWidth: theme.CLICKBOXWIDTH,
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
});
export default VoidHealthSafety;