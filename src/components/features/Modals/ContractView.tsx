import React, {useEffect, useState} from 'react'
import {Modal, StyleSheet, View} from "react-native";
import Pdf from "react-native-pdf";
import TextButton from "../../basics/buttons/TextButton";
import {useI18n} from "../../../translator/i18n";
import {useAppSelector} from "../../../store/hooks";
import {buildPDFSource} from "../../../services/contract";

type ContractViewProps = {
  visible: boolean,
  onClose: () => void
}

export default function ContractView({ visible, onClose }: ContractViewProps) {
  const [uri, setUri] = useState<string|null>(null)
  const { t } = useI18n()
  const locale = useAppSelector(state => state.profile.language)
  useEffect(() => {
      if (visible) {
        setUri('http://www.africau.edu/images/default/sample.pdf')
      } else {
        setUri(null)
      }
  }, [visible])
  return (
    <View>
      <Modal visible={visible}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TextButton styleText={styles.buttonText} text={t('')} onPress={onClose} type="left" />
          </View>
          {uri ? (<Pdf style={styles.pdf}  source={buildPDFSource(uri, locale)} />) : null}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 25,
    backgroundColor: '#C2C2C2'
  },
  pdf: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: '#C2C2C2'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  buttonText: {
    color: '#FFF'
  }
})