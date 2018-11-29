<template>
  <div class="">
    <b-card style="height:700px;" no-body>
      <div slot="header">
        {{this.text[this.isActive]}}
      </div>
      <div class="testcontainer" :class="classObject">
        <a @click="active('a')" :class="isActive === 'a' ? 'a ' + 'active' : 'a'">
          <b-button @click="isActive = 'a'" v-if="this.isActive !== 'a'" name="button">{{this.text.a}}</b-button>
          <difficulty v-else/>
        </a>
        <a @click="active('b')" :class="isActive === 'b' ? 'b ' + 'active' : 'b'">
          <b-button @click="isActive = 'b'" v-if="this.isActive !== 'b'" name="button">{{this.text.b}}</b-button>
          <avggastx v-else/>
        </a>
        <a @click="active('c')" :class="isActive === 'c' ? 'c ' + 'active' : 'c'">
          <b-button @click="isActive = 'c'" v-if="this.isActive !== 'c'" name="button">{{this.text.c}}</b-button>
          <blocktime v-else/>
        </a>
        <a @click="active('d')" :class="isActive === 'd' ? 'd ' + 'active' : 'd'">
          <b-button @click="isActive = 'd'" v-if="this.isActive !== 'd'" name="button">{{this.text.d}}</b-button>
          <blocktime88 v-else/>
        </a>
      </div>
    </b-card>
  </div>
</template>
<script>
import avggastx from './charts/avggastx'
import difficulty from './charts/difficulty'
import blocktime from './charts/blocktime'
import blocktime88 from './charts/blocktime88'

export default {
  name: 'Stats',
  components: {
    avggastx,
    difficulty,
    blocktime,
    blocktime88
  },
  data () {
    return {
      isActive: "",
      text: {
        'a':'Difficulty/Hashrate',
        'b':'Avg.gas/Gaslimit/Txns',
        'c':'Avg.blocktime',
        'd':'Avg.88-block period blocktime'
      },
      refresh: false
    }
  },
  methods: {
    active (x) {
      this.isActive = x
    }
  },
  computed: {
    classObject: function() {
      let str = "gridlayout-" + this.isActive
      return str
    }
  }
}
</script>
<style lang="scss" scoped>

@mixin active_panel($x) {

  $vars: "a", "b", "c", "d";

  $str: "";

  @each $item in $vars {
    @if $item != $x {
      $str: #{$str + " " + $item + " " + $item}
    }
  }

  grid-template-areas:
  "#{$x} #{$x} #{$x} #{$x} #{$x} #{$x}"
  "#{$x} #{$x} #{$x} #{$x} #{$x} #{$x}"
  "#{$x} #{$x} #{$x} #{$x} #{$x} #{$x}"
  "#{$str}";

}

.chart-container {
  width: 1600px;
}

.testcontainer {
  display: grid;
  height: 100%;
  grid-template-rows: 50px 1fr 1fr 50px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
  ". . . . . ."
  ". a a b b ."
  ". c c d d ."
  ". . . . . .";
}

.gridlayout-a {
  @include active_panel("a");
}
.gridlayout-b {
  @include active_panel("b");
}
.gridlayout-c {
  @include active_panel("c");
}
.gridlayout-d {
  @include active_panel("d");
}

.a {
  grid-area: a;
}
.b {
  grid-area: b;
}
.c {
  grid-area: c;
}
.d {
  grid-area: d;
}

.btn {
  height: 100%;
  width: 100%;
  border: 0;
  &:hover {
    background-color: #212121;
  }
}

</style>
