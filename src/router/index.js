import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Address from '@/views/Address'
import Block from '@/views/Block'
import Blocks from '@/views/Blocks'
import BroadcastTxn from '@/views/BroadcastTxn'
import ForkedBlocks from '@/views/ForkedBlocks'
import Home from '@/views/Home'
import Token from '@/views/Token'
import Tokens from '@/views/Tokens'
import Transaction from '@/views/Transaction'
import Transactions from '@/views/Transactions'
import TokenTransfers from '@/views/TokenTransfers'
import Uncle from '@/views/Uncle'
import Uncles from '@/views/Uncles'
import Map from '@/views/Map'
import Stats from '@/views/Stats'

import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Full,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/map',
          name: 'Map',
          component: Map
        },
        {
          path: '/charts',
          name: 'Stats',
          component: Stats
        },
        {
          path: '/txns/:type/:blockNumber?',
          name: 'Transactions',
          component: Transactions,
          props: true
        },
        {
          path: '/blocks',
          name: 'Blocks',
          component: Blocks
        },
        {
          path: '/blocks_forked',
          name: 'ForkedBlocks',
          component: ForkedBlocks
        },
        {
          path: '/broadcast',
          name: 'BroadcastTxn',
          component: BroadcastTxn
        },
        {
          path: '/tokens',
          name: 'Tokens',
          component: Tokens
        },
        {
          path: '/tokentxns',
          name: 'TokenTransfers',
          component: TokenTransfers
        },
        {
          path: '/uncles',
          name: 'Uncles',
          component: Uncles
        },
        {
          path: '/block/:number',
          name: 'Block',
          component: Block,
          props: true
        },
        {
          path: '/uncle/:hash',
          name: 'Uncle',
          component: Uncle,
          props: true
        },
        {
          path: '/tx/:hash',
          name: 'Transaction',
          component: Transaction,
          props: true
        },
        {
          path: '/token/:hash',
          name: 'Token',
          component: Token,
          props: true
        },
        {
          path: '/address/:hash',
          name: 'Address',
          component: Address,
          props: true
        }
      ]
    },
    // redirect legacy /en/ routes
    {
      path: '/en/:route/:id?',
      redirect: to => {
        const { params } = to
        if (params.id) {
          return '/' + params.route + '/' + params.id
        } else {
          return '/' + params.route
        }
      }
    }
  ]
})
