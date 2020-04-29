import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import { dimens, Icons } from '../Constants';
import styleApp from '../Styles/styleApp';
import { ImageIcon } from '../Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux'


var intervalId = null;
export default function AmbulanceTrack({ navigation }) {
    const dispatch = useDispatch();

    //Access State
    const testReducer = useSelector((state) => state.TestReducer)
    const { timeDuration, ambTimeDuration, rotaion } = testReducer

    const [direction, setDirection] = useState(1)
    const [timeLeft, setTimeLeft] = useState(timeDuration);
    const [directionPosition, setDirectionPosition] = useState([1, 2, 3, 4])

    useEffect(() => {
        InitTimer()
        // clear interval on re-render to avoid memory leaks
        return () => {
            clearInterval(intervalId);
            intervalId = null;
        }
    }, [timeLeft]);
    /**
     * Ambulance Text
     */
    function AMB_Txt() {
        return (<Text style={styles.commonBorder}>Amb</Text>)
    }

    /**
     * When user click in signal then need to reset timer
     *  and update flag for that direction
     */
    function EventSignal(directionTag) {
        setDirection(parseInt(directionTag))
        ResetInterval()
    }

    /**
     * Reset Interval
     */
    function ResetInterval() {
        clearInterval(intervalId);
        setTimeLeft(ambTimeDuration);
        InitTimer()
    }
    /**
     *  This function is used for manage direction when click on button.
     *  name - Direction Name
     *  directionTag - tag for selection
     */
    function SignalText({ name, directionTag }) {
        return (<TouchableOpacity onPress={() => EventSignal(directionTag)}>
            <Text style={[styles.commonBorder, styles.directionTxt, {
                backgroundColor: directionTag == direction ? 'green' : 'white'
            }]}>{name}</Text>
        </TouchableOpacity>)
    }

    /**
     * Timer will be display here
     * name - Timer text
     */
    function TimerText({ name, timerTag }) {
        return (<Text>{timerTag == direction ? timeLeft : timeDuration}</Text>)
    }

    function InitTimer() {
        intervalId = setInterval(() => {
            var timeRemian = timeLeft - 1;
            // console.log('timeRemian ', timeRemian)
            if (timeRemian <= 0) {
                timeRemian = timeDuration
                //I have not created EMNU here.
                var nextDirection = 1;
                switch (rotaion) {
                    case 1:
                        var a = directionPosition[direction]
                        nextDirection = direction + 1;
                        if (nextDirection > 4) nextDirection = 1
                        break;
                    case 2:
                        nextDirection = direction - 1
                        if (nextDirection <= 0) nextDirection = 4
                        break;
                    case 3:
                        if (direction == 1) {
                            nextDirection = 3
                        } else if (direction == 2) {
                            nextDirection = 1
                        } else if (direction == 3) {
                            nextDirection = 4
                        } else if (direction == 4) {
                            nextDirection = 2
                        }
                        break;
                    default:
                        break;
                }
                setDirection(nextDirection)
            }
            setTimeLeft(timeRemian);
        }, 1000);
    }

    return (
        <SafeAreaView style={[styles.root]}>
            {/** Settin ICON */}
            <ImageIcon big path={Icons.tempSetting}
                touchableStyle={{ padding: dimens.w4, alignSelf: 'flex-end', }}
                onClick={() => navigation.push('Setting')} />
            <View style={styles.rootDetails}>
                {/** Signal Top A */}
                <AMB_Txt />
                <SignalText name="A" directionTag='1' />
                <TimerText name='10' timerTag='1' />
                {/** Center Row */}
                <View style={styles.centerRowRoot}>
                    {/** Left */}
                    <View style={styles.centerLeftRightRoot}>
                        <AMB_Txt />
                        <SignalText name="A" directionTag='4' />
                        <TimerText name='10' timerTag='4' />
                    </View>
                    {/** Right */}
                    <View style={[styles.centerLeftRightRoot, { marginStart: dimens.w10 }]}>
                        <TimerText name='10' timerTag='2' />
                        <SignalText name="A" directionTag='2' />
                        <AMB_Txt />
                    </View>
                </View>

                {/** Bottom*/}
                <TimerText name='10' timerTag='3' />
                <SignalText name="A" directionTag='3' />
                <AMB_Txt />

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    rootDetails: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    commonBorder: {
        width: dimens.w12,
        height: dimens.w12,
        borderRadius: dimens.w2,
        borderWidth: 0.5,
        textAlign: 'center',
        borderColor: 'black',
        paddingHorizontal: dimens.w1o5,
        paddingVertical: dimens.w4,
        textTransform: 'uppercase',
        overflow: 'hidden',
        margin: dimens.w2
    },
    directionTxt: {
    },
    centerRowRoot: {
        flexDirection: "row",
        marginVertical: dimens.w4,
        justifyContent: 'space-between'
    },
    centerLeftRightRoot: {
        flexDirection: "row",
        alignItems: 'center',
    }

});
