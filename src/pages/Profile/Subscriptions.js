import React, { useEffect, useState } from 'react'
import {
  Card,
  Button,
  Flex,
  Box,
  Text,
  Image,
  Heading,
  Sidebar,
  Spinner,
} from '../../primitives'
import Utils from '../../components/Utils'

const Trades = ({ actions, location }) => {
  const cPage = location.pathname

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState([])

  useEffect(() => {
    actions
      .listMySubscriptions()
      .then(s => {
        setState(s)
        setLoading(false)
      })
      .catch(e => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return loading ? <Utils.LoadingPage /> : (
    <Flex
      flexDirection="column"
      p={4}
      width={[1, 2 / 3]}
      justifyContent="space-evenly"
    >
      <Utils.DownloadCSV data={state}/>
      <Heading>My Subscriptions</Heading>
      {state.length > 0 ? (
        state.map(data => {
          return <Utils.RenderObject data={data} key={data.id} />
        })
      ) : (
        <Text>You have no subscriptions.</Text>
      )}
    </Flex>
  )
}

export default Trades