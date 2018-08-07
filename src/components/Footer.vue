<template>
  <!-- Footer -->
  <!-- <footer class="footer mt-4">
    <b-container fluid>
      <div>
        <div style="display:inline-block;margin-right:10px;vertical-align:top;">
          <img src="../assets/poweredby.svg" width="128" height="80"/>
        </div>
        <div style="display:inline-block;width:280px;">
          <p style="margin-bottom:0">Ubiqscan is powered by Ubiq Spectrum an open-source block explorer and analytics platform for Ubiq, a decentralized smart contracts platform.</p>
        </div>
      </div>
      <PreviewBlock :info="latestBlock"/>
    </b-container>
  </footer> -->
  <footer class="footer mt-4">

    <b-container fluid style="height:156px;padding-top:10px;">
      <b-row>
        <b-col md="2" offset-md="1">
          <div>
            <div style="display:inline-block;width:280px;">
              <img src='../assets/poweredby.png' style="height:50px;margin:0 auto 5px auto;">
              <p style="margin-bottom:0">Ubiqscan is powered by Ubiq Spectrum an open-source block explorer and analytics platform for Ubiq, a decentralized smart contracts platform.</p>
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <h6>Latest Discussions <span class="fa fa-reddit"/></h6>
          <hr style="margin: 5px 0px"/>
          <div v-for="(item, index) in reddit" :key="index">
            <a :href="'https://reddit.com' + item.data.permalink" target="_blank">{{ item.data.title }}</a>
            <hr style="margin: 5px 0px"/>
          </div>
        </b-col>
        <b-col md="2">
          <h6>Social <span class="fa fa-users"/></h6>
          <hr style="margin: 5px 0px"/>
          <ul class="social">
            <li><a href="https://twitter.com/ubiqsmart.com" target="_blank"><span class="fa fa-twitter"/> Twitter</a></li>
            <li><a href="https://discord.gg/HF6vEGF" target="_blank"><span class="fa fa-users"/> Discord</a></li>
            <li><a href="https://github.com/ubiq/" target="_blank"><span class="fa fa-github-alt"/> Github</a></li>
            <li><a href="https://www.reddit.com/r/Ubiq/" target="_blank"><span class="fa fa-reddit"/> Reddit</a></li>
            <li><a href="https://blog.ubiqsmart.com" target="_blank"><span class="fa fa-medium"/> Blog</a></li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="https://ubiqsmart.com" target="_blank">
          Ubiqsmart © 2018 (C)
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link :to="{ name: 'Address', params: {hash: '0x1234567890123456789012345678901234567890'} }">Donations 0x1234567890123456789012345678901234567890</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </footer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Footer',
  data () {
    return {
      reddit: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      axios.get('https://www.reddit.com/r/Ubiq/new.json?sort=new')
        .then(response => {
          this.reddit = response.data.data.children.splice(0, 4)
          console.log(this.reddit)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
