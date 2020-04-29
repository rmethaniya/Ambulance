import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'
import styleApp from '../Styles/styleApp';

{/* Use Below Function
    
    <ImageIcon
touchableStyle={{ position: 'absolute' }}
style={{ marginStart: dimens.w3 }}
path={require('../images/back.png')}
onClick={() => navigation.goBack()} />


For SHow Only Icon
--------------
<ImageIcon path={Icons.vegGreen}/>


BIG icon 
---------
<ImageIcon big path={Icons.back}
                        onClick={() => console.log('icon click')} />
                        
Example -2

  <ImageIcon
          touchableStyle={{}}
            style={{ }}
            path={Icons.starYellow}
            onClick={() => console.log('icon click')} />

*/}


export default function ImageIcon(props) {
    return (<TouchableOpacity
        disabled={!(props.onClick)}
        style={[props.touchableStyle]}
        onPress={() => props.onClick()}>

        <FastImage style={[props.big ? styleApp.iconBig :
            props.small ? styleApp.iconSmall : styleApp.icon, props.style]} {...props}
            source={props.url
                ? { uri: props.url }
                : props.path}
            resizeMode={FastImage.resizeMode.contain}
            onError={() => console.log('image error in load image : ImageFast.js')}>
        </FastImage>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({


});