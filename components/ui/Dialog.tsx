import { Modal, Pressable, View } from "react-native"

type DialogProps = {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

const Dialog = ({ visible, onClose, children }: DialogProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="absolute inset-0 items-center justify-center bg-black/75">
        <Pressable
          className="m-0 p-0"
          onPressOut={onClose}
          style={{ flex: 1 }}
        />

        <View className="absolute inset-0 items-center justify-center px-6">
          <Pressable onPress={() => {}} className="w-auto">
            {children}
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default Dialog
