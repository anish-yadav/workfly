import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
    onComplete: ({ title, url}: { title:string,url:string}) => void;
    color: string;
    placeholderColor:string;
    backgroundColor:string;
    visible:boolean;
    setVisible:(v:boolean) => void
}

export const LinkModal = ({ onComplete, color, placeholderColor, backgroundColor, visible , setVisible}:Props) => {
    

    const [ isModalVisible,setModalVisible] = useState<boolean>(visible)
    const [ title,setTitle] = useState<string>('');
    const [ url,setUrl] = useState<string>('');

    useEffect(() => {
    console.log('from props here',visible)
    setModalVisible(visible)
    },[visible])
    const onDone = () => {
        setVisible(false)
        onComplete({title, url});
    }

    const hideModal = () => {
        setVisible(false)
    }

    
        return (
            <Modal
                isVisible={isModalVisible}
                backdropColor={color}
                backdropOpacity={0.3}
                onBackdropPress={() => setModalVisible(false)}>
                <View style={[styles.dialog, {backgroundColor}]}>
                    <View style={styles.linkTitle}>
                        <Text style={{color}}>Insert Link</Text>
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, {color}]}
                            placeholderTextColor={placeholderColor}
                            placeholder={'title'}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, {color}]}
                            placeholderTextColor={placeholderColor}
                            placeholder="http(s)://"
                            onChangeText={(text) => setUrl(text)}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.btn} onPress={() => hideModal()}>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={onDone}>
                            <Text style={styles.text}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        height: 40,
    },
    linkTitle: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#b3b3b3',
    },
    dialog: {
        borderRadius: 8,
        marginHorizontal: 40,
        paddingHorizontal: 10,
    },

    buttonView: {
        flexDirection: 'row',
        height: 36,
        paddingVertical: 4,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#286ab2'
    }
});