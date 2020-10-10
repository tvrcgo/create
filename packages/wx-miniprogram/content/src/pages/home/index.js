import * as React from 'react'
import {
  View,
  Image
} from 'remax/wechat'
import './index.less'
import img from '@/assets/chat_filled.png'

export default () => {

  return (
    <View className='page page-home'>
      <View>home page</View>
      <Image src={img} />
    </View>
  )
}
