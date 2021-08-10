import httpClient from '../api'
import * as FileSystem from 'expo-file-system'
import Base64Binary from 'base64-arraybuffer'
import {MediaPayload} from "../../store/modules/media/action-creators";

const presigned = (folder: string) => httpClient.get(`api/media?folder=${folder}`)

const uploadMedia = async (mediaUri: string, pathToUpload: string) => {
    const fileBase64 = await FileSystem.readAsStringAsync(mediaUri, {
        encoding: FileSystem.EncodingType.Base64
    })
    const arrayBuffer = Base64Binary.decode(fileBase64)

    return httpClient.put(pathToUpload, arrayBuffer)
}

const mediaProcess = async ({ uri, folder } : MediaPayload) => {
    const {data: {uploadUrl}} = await presigned(folder)
    await uploadMedia(uri, uploadUrl);

}

export default {
    mediaProcess
}