<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="../assets/logo.svg" width="26" height="26"></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item :to="{ name: 'Home', params: {} }">HOME</b-nav-item>

        <b-nav-item-dropdown text="BLOCKCHAIN" right>
          <b-dropdown-item :to="{ name: 'Transactions', params: {type: 'latest'} }"><span class="fa fa-list-alt"/> View Txns</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Transactions', params: {type: 'pending'} }"><span class="fa fa-tasks"/> View Pending Txns</b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item :to="{ name: 'Blocks', params: {} }"><span class="fa fa-cubes"/> View Blocks</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Uncles', params: {} }"><span class="fa fa-cube"/> View Uncles</b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item :to="{ name: 'ForkedBlocks', params: {} }"><span class="fa fa-code-fork"/> Forked Blocks (Reorgs)</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="TOKENS" right>
          <b-dropdown-item :to="{ name: 'Tokens', params: {} }"><span class="fa fa-certificate"/> View Tokens</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'TokenTransfers', params: {} }"><span class="fa fa-navicon"/> View Token Transfers</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="MISC" right>
          <b-dropdown-item href="https://ubiq.darcr.us" target="_blank"><span class="fa fa-dashboard"/> Network Stats</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
