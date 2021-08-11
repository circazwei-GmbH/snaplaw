import httpClient from '../api'
import * as FileSystem from 'expo-file-system'
import {MediaPayload} from "../../store/modules/media/action-creators";
import base64 from 'react-native-base64'
const presigned = (folder: string) => httpClient.get(`api/media?folder=${folder}`)

const uploadMedia = async (mediaUri: string, pathToUpload: string) => {
    const fileBase64 = await FileSystem.readAsStringAsync(mediaUri, {
        encoding: FileSystem.EncodingType.Base64
    })
    const arrayBuffer = base64.decode(fileBase64)
    return httpClient.putWithoutHost(pathToUpload, arrayBuffer)
}

const mediaProcess = async ({ uri, folder } : MediaPayload) => {
    const response = await presigned(folder)
    await uploadMedia(uri, response.data);
    return response.data.split('?')[0]
}

export default {
    mediaProcess
}