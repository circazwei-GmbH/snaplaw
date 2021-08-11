import * as ImagePicker from "expo-image-picker";
import {MediaTypeOptions} from "expo-image-picker";
import {CameraPermissionNotGranted, LibrarryPermissionNotGranted} from "./errors";

export const libraryWay = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== ImagePicker.PermissionStatus.GRANTED) {
        throw new LibrarryPermissionNotGranted('errors.galary_permission')
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 0.5
    })

    if (!result.cancelled) {
        return result.uri
    }

    return undefined
}

export const cameraWay = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
        throw new CameraPermissionNotGranted('errors.camera_permission')
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 0.5,
    })

    if (!result.cancelled) {
        return result.uri
    }

    return undefined
}