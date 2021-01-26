import {StyleSheet} from 'react-native';

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
        color: '#fb5b5a',
        marginBottom: 40,
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
        width: '80%',
        backgroundColor: '#fb5b5a',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
      },
      loginText: {
        color: 'white',
      },
      charInputText:{
        height: 50,
        color: 'white',
        padding:10,
      },
      charLabel:{
          alignSelf:'center',
          padding:10,
          color:'white',
      },
      radio:{
        flexDirection: 'row',

      },
      radioLabel:{
        fontWeight: 'bold',
        fontSize: 25,
        color: '#fb5b5a',
        alignSelf:'flex-start',

      },
      radioContainer:{
        flexDirection:'column',
        alignItems:'center',
        width:'80%',      
      },
      radioText:{
        alignSelf:'center',
        color:'white',
        margin:5,
      },
      radioBox:{
        flexDirection: 'row',
        flexWrap:'wrap',
        width:'100%',
        backgroundColor: '#465881',
        borderRadius: 25,
        padding:10,
        margin:10,
        justifyContent:'space-evenly',

      },
      charContainer:{
          flex:1,
          flexDirection:'column',
          alignItems:'center',
          backgroundColor: '#003f5c',
      },
      charInputBox:{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#465881',
        borderRadius: 25,
        height: 50,
        margin:15,


      },
    
  });

  export default styles;