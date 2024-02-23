import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const LoaderBackdrop = ({ loading }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={styles.backdrop}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 20,
  },
});

export default LoaderBackdrop;
