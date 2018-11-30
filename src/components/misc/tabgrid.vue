<template>
  <b-card style="height:700px;" no-body>
    <div slot="header">
      {{descriptions[this.isActive]}}
    </div>
    <div class="grid" :style="panel">
      <a v-for="(slot, name) in slots" :key="name" @click="active(name)" :style="{'grid-area': name}" >
        <b-button @click="isActive = name" v-if="isActive !== name" name="button">{{descriptions[name]}}</b-button>
        <slot v-else :name="name"></slot>
      </a>
    </div>
  </b-card>
</template>
<script>

export default {
  props: {
    descriptions: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isActive: ''
    }
  },
  methods: {
    active (x) {
      this.isActive = x
    },
    defaultpanel () {
      let result = [
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.']
      ]
      let arr = Object.keys(this.descriptions)

      for (var i = 0; i < arr.length; i++) {
        if (i < 4) {
          result[1][1+i] = arr[i]
        } else {
          result[2][i-3] = arr[i]
        }
      }
      return this.areasToCss(result)
    },
    displaypanel (x) {
      let letters = Object.keys(this.descriptions)
      let result = [
        [x, x, x, x, x, x],
        [x, x, x, x, x, x],
        [x, x, x, x, x, x],
        ['', '', '', '', '', '']
      ]

      // TODO: add more cases
      switch (letters.length) {
        case 4:
        for (var i = 0; i < 4; i++) {
          if (letters[i] !== x) {
            result[3].push(letters[i])
            result[3].push(letters[i])
          }
        }
        break;
        default:
        for (var i = 0; i < 6; i++) {
          if (letters[i] !== x) {
            if (letters.length < 5) {
              result[3][i] = letters[i]
              result[3][i] = letters[i]
            } else {
              if (letters[i] === undefined) {
                result[3][i] = '.'
              } else {
                result[3][i] = letters[i]
              }
            }
          } else {
            result[3][i] = '.'
          }
        }
      }
      return this.areasToCss(result)
    },
    areasToCss (arr) {
      return arr.map(row => {
        return `"${row.join(' ')}"`
      }).join(' ')
    }
  },
  computed: {
    panel: function () {
      switch (this.isActive) {
        case '':
        return {
          'grid-template-areas': this.defaultpanel()
        }
        default:
        return {
          'grid-template-areas': this.displaypanel(this.isActive)
        }
      }
    },
    slots: function () {
      return this.$slots
    }
  }
}
</script>
<style lang="scss" scoped>

// @mixin active_panel($x) {
//
//   $vars: "a", "b", "c", "d";
//
//   $str: "";
//
//   @each $item in $vars {
//     @if $item != $x {
//       $str: #{$str + " " + $item + " " + $item}
//     }
//   }
//
//   grid-template-areas:
//   "#{$x} #{$x} #{$x} #{$x} #{$x} #{$x}"
//   "#{$x} #{$x} #{$x} #{$x} #{$x} #{$x}"
//   "#{$x} #{$x} #{$x} #{$x} #{$x} #{$x}"
//   "#{$str}";
//
// }

.grid {
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

.btn {
  height: 100%;
  width: 100%;
  border: 0;
  &:hover {
    background-color: #212121;
  }
}

</style>
