import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Address from '@/views/Address'
import Block from '@/views/Block'
import Blocks from '@/views/Blocks'
import ForkedBlocks from '@/views/ForkedBlocks'
import Home from '@/views/Home'
import Transaction from '@/views/Transaction'
import Transactions from '@/views/Transactions'
import TokenTransfers from '@/views/TokenTransfers'
import Uncle from '@/views/Uncle'
import Uncles from '@/views/Uncles'

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
        }
      ]
    },
    {
      path: 'txns',
      component: Full,
      children: [
        {
          path: '/txns/:type',
          name: 'Transactions',
          component: Transactions,
          props: true
        }
      ]
    },
    {
      path: 'blocks',
      component: Full,
      children: [
        {
          path: '/blocks',
          name: 'Blocks',
          component: Blocks
        }
      ]
    },
    {
      path: 'blocks_forked',
      component: Full,
      children: [
        {
          path: '/blocks_forked',
          name: 'ForkedBlocks',
          component: ForkedBlocks
        }
      ]
    },
    {
      path: 'tokentransfers',
      component: Full,
      children: [
        {
          path: '/tokentxns',
          name: 'TokenTransfers',
          component: TokenTransfers
        }
      ]
    },
    {
      path: 'uncles',
      component: Full,
      children: [
        {
          path: '/uncles',
          name: 'Uncles',
          component: Uncles
        }
      ]
    },
    {
      path: 'block',
      component: Full,
      children: [
        {
          path: '/block/:number',
          name: 'Block',
          component: Block,
          props: true
        }
      ]
    },
    {
      path: 'uncle',
      component: Full,
      children: [
        {
          path: '/uncle/:hash',
          name: 'Uncle',
          component: Uncle,
          props: true
        }
      ]
    },
    {
      path: 'tx',
      component: Full,
      children: [
        {
          path: '/tx/:hash',
          name: 'Transaction',
          component: Transaction,
          props: true
        }
      ]
    },
    {
      path: 'address',
      component: Full,
      children: [
        {
          path: '/address/:hash',
          name: 'Address',
          component: Address,
          props: true
        }
      ]
    }
  ]
})
