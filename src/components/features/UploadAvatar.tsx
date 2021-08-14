import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from "react-native";
import UserAvatar from "../components/UserAvatar";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Menu, {ButtonType} from "./Modals/Menu";
import {useI18n} from "../../translator/i18n";
import {uploadMedia} from "../../store/modules/media/action-creators";
import {cameraWay, libraryWay} from "../../services/media/media-picker";
import {PermissionNotGranted} from "../../services/media/errors";
import {setMessage} from "../../store/modules/main/slice";
import {MEDIA_FOLDERS} from "../../store/modules/media/constants";
import {deleteAvatar, updateAvatar} from "../../store/modules/profile/action-creators";
import {setAvatarLoading} from "../../store/modules/profile/slice";

export default function UploadAvatar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { t } = useI18n()
    const avatar = useAppSelector(state => state.profile.user?.avatar)

    const postChooseFileHandler = (uri: string) => {
        setMenuVisible(false)
        dispatch(uploadMedia(uri, MEDIA_FOLDERS.AVATAR, updateAvatar()))
        dispatch(setAvatarLoading(true))
    }

    const buttonPickerHandler = (way: Function) => async () => {
        try {
            const uri = await way()

            if (uri) {
                postChooseFileHandler(uri)
            }
        } catch (error) {
            if (error instanceof PermissionNotGranted) {
                dispatch(setMessage(t(error.message)))
            } else {
                dispatch(setMessage(t('errors.abstract')))
            }
        }

    }

    const uploadAvatarIconPressHandler = () => {
        setMenuVisible(true)
    }

    const menuButtons: ButtonType[] = [
        {
            title: t('upload_files.gallary'),
            handler: buttonPickerHandler(libraryWay)
        },
        {
            title: t('upload_files.camera'),
            handler: buttonPickerHandler(cameraWay)
        },
        {
            title: t('edit_profile.delete'),
            handler: () => {
                dispatch(deleteAvatar())
                setMenuVisible(false)
            }
        }
    ]

    return (
        <View style={styles.container}>
            <UserAvatar url={avatar} sizeSmall />
            <View style={styles.uploadIcon}>
                <TouchableOpacity onPress={uploadAvatarIconPressHandler} testID="openMenuIcon">
                    <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#668395" />
                </TouchableOpacity>
            </View>
            <Menu
                visible={menuVisible}
                buttons={menuButtons}
                onClose={() => setMenuVisible(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    uploadIcon: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#fff'
    }
})