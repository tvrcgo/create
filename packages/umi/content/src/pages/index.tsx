import React, { useEffect } from 'react'
import { Helmet } from 'umi'
import styles from './index.less'
import useReducers from '@/hooks/reducers'

export default function () {

  const [state, dispatch] = useReducers({

  }, {})

  useEffect(() => {

  }, [])

  return (
    <div className={styles.page}>
      <Helmet>
        <title>页面标题</title>
      </Helmet>
      <h1>Home page</h1>
    </div>
  )
}
