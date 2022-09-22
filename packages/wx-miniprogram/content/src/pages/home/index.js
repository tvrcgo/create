import {
  View,
  Image
} from '@tarojs/components'
import './index.scss'

export default () => {

  return (
    <View className='page page-home'>
      <View>home page</View>
      <Image src='/assets/chat_filled.png' />
    </View>
  )
}
