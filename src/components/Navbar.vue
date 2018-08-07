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

        <b-nav-item><router-link :to="{ name: 'Home', params: {} }">HOME</router-link></b-nav-item>

        <b-nav-item-dropdown text="BLOCKCHAIN" right>
          <b-dropdown-item><router-link :to="{ name: 'Transactions', params: {type: 'latest'} }">View Latest Txns</router-link></b-dropdown-item>
          <b-dropdown-item><router-link :to="{ name: 'Transactions', params: {type: 'pending'} }">View Pending Txns</router-link></b-dropdown-item>
          <b-dropdown-item><router-link :to="{ name: 'Blocks', params: {} }">View Latest Blocks</router-link></b-dropdown-item>
          <b-dropdown-item href="#">View Uncles</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="TOKENS" right>
          <b-dropdown-item href="#">View Tokens</b-dropdown-item>
          <b-dropdown-item href="#">View Token Transfers</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="MISC" right>
          <b-dropdown-item href="#">Network Stats</b-dropdown-item>
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
