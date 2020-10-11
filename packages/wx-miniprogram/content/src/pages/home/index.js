import React from 'react'
import {
  View,
  Image
} from 'remax/wechat'
import './index.less'

export default () => {

  return (
    <View className='page page-home'>
      <View>home page</View>
      <Image src='/assets/chat_filled.png' />
    </View>
  )
}
