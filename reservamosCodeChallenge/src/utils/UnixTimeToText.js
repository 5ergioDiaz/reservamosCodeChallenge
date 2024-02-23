import React from 'react';
import { View, Text } from 'react-native';

const UnixTimeToText = (unixTime) => {
  console.log(unixTime)
  const date = new Date(unixTime * 1000);
  const dayOfWeek = date.toLocaleDateString('es-ES', { weekday: 'long' });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleDateString('es-ES', { month: 'long' });

  return (
    <View>
      <Text>{`${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)} ${dayOfMonth} de ${month}`}</Text>
    </View>
  );
};

export default UnixTimeToText;