import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Text, Container, Footer, FooterTab } from "native-base";
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';

class VoidAdditionalComments extends Component {
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
		const {values, handleChange, handlePicker, handleImage, handleChoice, handleFormSubmit, prevStep } = this.props;
		return(
			<Container style={styles.container}>
          <ScrollView>
    				<FormModalColourPicker
    					isOpen={this.state.modalColourVisible}
    					setModalVisible={this.setModalColourVisible}
    					handleColours={this.handleColours}
    				/>
    				<CsAppTitle>Additional comments</CsAppTitle>

    				<View style={styles.rowContainer}>
    					<View style={styles.rowText}>
    						<Text style={styles.title}>10.1</Text> 
    						<CsAppText>Comments</CsAppText>
    					</View>
    					<View style={styles.rowControls}>
    						<View style={styles.row}>
    							<View style={styles.rowFirst}>
    								<CsAppLabel>Comment</CsAppLabel>
    							    <CsInput
    									handleChange={handleChange}
    									values={values}
    									identifier={"voidACComment1"}
    								/>
    							</View>
    							<View style={styles.rowSecond}>
    								<CsAppLabel>Grade</CsAppLabel>
    								<TouchableHighlight
    			            			style={styles.clickBoxWidth}
    									onPress={() => {
    										this.setModalColourVisible(true)
    										this.setWhichGrade('voidACGrade1')
    									}}
    								>
    									<View style={styles.clickBox}>
    										{ (values.voidACGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
    										{ (values.voidACGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
    										{ (values.voidACGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
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
    									identifier="voidACAdv1"
    								/>
    							</View>
    						</View>
    					</View>
    				</View>				

    				</ScrollView>

            <Footer>
              <FooterTab style={styles.buttons}>
                <Button
                  bordered
                  style={styles.buttonPrev}
                  title="Previous"
                  type="outline"
                  onPress = {() => {prevStep()}}
                >
                <Text style={styles.titlePrev}>Back</Text>
                </Button>
                <Button></Button>
                <Button
                  style={styles.button}
                  onPress = {() => { handleFormSubmit()}}
                >
                {(this.props.isUploading == true) ? <ActivityIndicator size="large" color="#FFFFFF" /> : <Text style={styles.title}>Finish & Upload</Text>}
              </Button>
              </FooterTab>
            </Footer>
          
			</Container>
		)
	}
}
let {Platform} = React;
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  buttons: {
    paddingTop: (Platform.OS === 'ios') ? 10 : 0,
    backgroundColor: '#F4F6FC',
  },
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
  },
  buttonPrev: {
    borderColor: theme.PRIMARY_COLOR,
    backgroundColor: '#fff',
    width:140,
    height: 48,
    justifyContent: 'center',
    borderRadius: 1,
  },
  button: {
    backgroundColor: theme.PRIMARY_COLOR,
    width:140,
    height: 48,
    justifyContent: 'center',
    borderRadius: 1,
  },
  title: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: 'white'
  },
  titlePrev: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: theme.PRIMARY_COLOR,
  },
});
export default VoidAdditionalComments;