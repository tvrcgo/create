
module.exports = {
  pages: [
    'pages/home/index',
  ],
  window: {
    navigationBarTitleText: '一个小程序',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#fff',
    backgroundColor: '#f5f5f5',
  },
  style: 'v2',
  tabBar: {
    color: '#555',
    selectedColor: '#1b73fa',
    borderStyle: 'white',
    list: [
      {
        text: '',
        pagePath: 'pages/home/index',
        iconPath: 'assets/chat_regular.png',
        selectedIconPath: 'assets/chat_filled.png',
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你在哪儿'
    }
  }
}
