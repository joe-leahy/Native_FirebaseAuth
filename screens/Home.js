import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Current from './Current'

const Home = () => {
  return (
    <View>
      <LinearGradient
        colors={['#F29849', '#82C9D9']}
        style={styles.background}
        <Current />
      />

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        opacity:.75
      },

})
