import { Modal, Text, View, Alert } from "react-native";
import { Button } from "@/components/Button";
//import { Styles } from "./style"
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import axios from "axios"; // ou outra lib de requisição como fetch

import { styles } from "./style";

export function Scan() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const qrCodeLock = useRef(false);

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert("Camera", "Você precisa habilitar o uso da câmera");
      }
      setModalIsVisible(true);
      qrCodeLock.current = false;
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmDelivery(reservationId: string) {
    try {
      const response = await axios.patch(`/reservas/${reservationId}/confirm`, {
        status: "ENTREGUE",
      });
      if (response.status === 200) {
        Alert.alert(
          "Entrega Confirmada",
          "A entrega foi confirmada com sucesso!"
        );
      } else {
        Alert.alert("Erro", "Falha ao confirmar a entrega");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao confirmar a entrega.");
    }
  }

  function handleQRCodeRead(data: string) {
    setModalIsVisible(false);
    Alert.alert("QR Code", `Código lido: ${data}`);

    confirmDelivery(data);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Vamos verificar seu código!</Text>
      </View>

      <Button icon="camera" title="Ler QR code" onPress={handleOpenCamera} />

      <Modal visible={modalIsVisible} style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrCodeLock.current) {
              qrCodeLock.current = true;
              setTimeout(() => {
                handleQRCodeRead(data);
                qrCodeLock.current = false;
              }, 500);
            }
          }}
        />

        <View>
          <Button title="Cancelar" onPress={() => setModalIsVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
