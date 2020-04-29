import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image'
import styleApp from '../Styles/styleApp';

import { spacing, Icons, dimens, Font, constants, colour } from '../Constants';
import { ImageIcon, HeaderView } from '../Components'
import { fontsizes } from '../Constants/Theme';
import { useSelector, useDispatch } from 'react-redux'
import { timeDirationAction, ambTimeDirationAction  ,rotaionAction} from '../redux/actions/TestAction'
let macInputLength = 3
const rotaionArray = ['Clockwise', 'Anticlockwise', 'Up to down Left to Right']

export default function Setting({ navigation }) {
    const dispatch = useDispatch();

    //Access State
    const testReducer = useSelector((state) => state.TestReducer)
    const { timeDuration, ambTimeDuration , rotaion } = testReducer

    const [timeDurationInput, setTimeDuration] = React.useState(timeDuration + '');
    const [ambTimeDurationInput, setAmbTimeDuration] = React.useState(ambTimeDuration + '');
    const [rotaionSelect, setRotaion] = useState(rotaion)


    function RotationType({ name, type }) {
        return (<TouchableOpacity
            onPress={() => setRotaion(type)}
            style={styles.rotationTypeItem}>
            <Text style={styles.textItem}>{rotaionArray[type - 1]}</Text>
            <ImageIcon path={rotaionSelect == type ? Icons.radioSelectBlue : Icons.radioUnBlue} />
        </TouchableOpacity>)
    }
    return (
        <SafeAreaView style={styles.root}>
            <HeaderView title={'Configuration Screen'}
                onLeftClick={() => { navigation.goBack() }} />
            {/** Config Detai;s */}
            <View style={styles.viewDetails}>
                {/**  Time duration */}
                <View style={[styleApp.shadows, spacing.viewPadding]}>
                    <Text style={styles.textTitle}>Time duration (seconds)</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setTimeDuration(text)}
                        value={timeDurationInput}
                        keyboardType='number-pad'
                        maxLength={macInputLength}
                    />
                </View>
                {/** Rotatioan Type */}
                <View style={[styleApp.shadows, spacing.viewPadding, { marginVertical: dimens.w5 }]}>
                    <Text style={styles.textTitle}>Rotation </Text>
                    <RotationType name={rotaionArray[0]} type={1} />
                    <RotationType name={rotaionArray[1]} type={2} />
                    <RotationType name={rotaionArray[2]} type={3} />
                </View>
                {/**  MB Time duration */}
                <View style={[styleApp.shadows, spacing.viewPadding]}>
                    <Text style={styles.textTitle}>Time duration (seconds)</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setAmbTimeDuration(text)}
                        value={ambTimeDurationInput}
                        keyboardType='number-pad'
                        maxLength={macInputLength}
                    />
                </View>

                {/** Save */}
                <TouchableOpacity
                    onPress={() => validate()}
                    style={styles.btnRoot}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );

    function validate() {
        var timeDur = parseInt(timeDurationInput);
        var ambTime = parseInt(ambTimeDurationInput)

        var isError = false;
        var msg = ''
        if (timeDur < 5 || timeDur > 120) {
            isError = true;
            msg = 'Timer durations is between including 5 to 120 seconds'
        } else if (ambTime < 10 || ambTime > 300) {
            isError = true;
            msg = 'AMB Timer durations is between including 10 to 300 seconds'
        }
        if (isError) {
            alert(msg)
            return
        }
        dispatch(timeDirationAction(timeDurationInput))
        dispatch(ambTimeDirationAction(ambTimeDurationInput))
        dispatch(rotaionAction(rotaionSelect))
        navigation.goBack();
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    viewDetails: {
        margin: dimens.w6
    },
    itemRoot: {

    },
    textTitle: {
        fontSize: fontsizes.FONT_48Px,
        fontWeight: 'bold',
        marginBottom: dimens.w2
    },

    textItem: {
        fontSize: fontsizes.FONT_48Px,
        marginVertical: dimens.w1,
        flex: 1,
    },
    textInput: {
        height: 40, borderColor: 'gray', borderWidth: 1,
        paddingHorizontal: dimens.w1, marginTop: dimens.w2
    },
    rotationTypeItem: {
        flexDirection: 'row'
    },
    btnRoot: {
        marginVertical: dimens.h5,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    btnText: {
        color: 'white',
        paddingHorizontal: dimens.w5,
        paddingVertical: dimens.w4
    }

});
