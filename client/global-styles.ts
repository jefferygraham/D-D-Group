import { StyleSheet } from 'react-native';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
  width: 1125,
  height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#BA3130',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10
  },
  loginText: {
    color: 'white',
    fontSize:18
  },
  /* Things for creatChar */
  charInputText: {
    color: 'white',
    fontSize: 20,
    borderColor: 'white',
    borderWidth: 1,

  },
  charInputTextLong: {
    color: 'white',
    fontSize: 20,
    borderColor: 'white',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    flex: 1

  },
  charLabel: {
    alignSelf: 'center',
    padding: 10,
    color: 'white',
  },
  characteristicsLabel: {
    color: 'white',
    fontSize: 20,
    marginRight: 10,
    width:'13%',
    textAlign:'right'
  },
  charInputLabel: {
    flexDirection: 'row',
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  charContainer: {
    width:'100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#003f5c',
  },
  charInputBox: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    padding: 20,


  },
  radio: {
    flexDirection: 'row',
  },
  radioLabel: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    alignSelf: 'flex-start',

  },
  radioContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  displayContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    padding: 10,
    margin: 10,

  },
  radioText: {
    alignSelf: 'center',
    color: 'white',
    margin: 5,
    fontSize:17,
  },
  radioBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: '#465881',
    borderRadius: 25,
    padding: 10,
    margin: 10,
    justifyContent: 'space-evenly',

  },
  displayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#465881',
    borderRadius: 25,
    padding: 10,
    margin: 10,

  },
  boxOfThree:{
    flexDirection:'column',
    flex:1,
    justifyContent:'space-evenly',
  },
  borderedBoxRow:{
    width:'100%',
    borderWidth:1,
    borderColor:'white',
    flexDirection:'row',
    flex:1,
    flexWrap: 'wrap',
    padding:10,
    justifyContent: 'space-evenly',
    
  },

  borderedBoxColumn:{
    width:'100%',
    borderWidth:1,
    borderColor:'white',
    flexDirection:'column',
    flex:1,
    alignContent:'flex-start',
    alignItems:'flex-start',
    padding:10
  },
  leftLabel:{
    alignSelf:'flex-start',
    color:'white',
    fontSize:20,
    margin:5

  },
  leftText:{
    alignSelf:'flex-start',
    color:'white',
    margin: 5,
    fontSize:17,

  },
  looksLabel: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginRight: 10,


  },
  backgroundInfoContainer:{
    flex:1,
    margin:5,

  },
  backgroundInfoContainer2:{
    flex:2,
    margin:5,

  },
  createBtn:{
    width: '80%',
    backgroundColor: '#BA3130',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#BA3130'
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    marginRight: 45
  },
  radioButton: {
    height: 12,
    width: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
  }

});

export default styles;