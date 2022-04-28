<template>
  <div class="typing">
    <div class="value">
      {{ value }}<typing-indicator v-if="value < 100" />
    </div>
    <div class="digits">
      <button
        v-for="i in 9"
        :key="i"
        class="digit"
        @click="type(i)"
      >
        {{ i }}
      </button>
      <button
        class="digit lg"
        @click="erase()"
      >
        <i class="bx bxs-eraser" />
      </button>
      <button
        class="digit lg"
        @click="type(0)"
      >
        0
      </button>
      <button
        class="digit xl primary"
        @click="$emit('submit')"
      >
        <i class="bx bx-check" />
      </button>
    </div>
  </div>
</template>

<script>
import TypingIndicator from './TypingIndicator'

export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },

  components: {
    TypingIndicator
  },

  methods: {
    type (i) {
      let val = !this.value ? i : parseInt(this.value + '' + i)
      if (val > 180) {
        val = 180
      }
      this.$emit('input', val)
    },

    erase () {
      this.$emit('input', parseInt(('' + this.value).slice(0, -1)) || null)
    }
  }
}
</script>

<style lang="scss" scoped>
  .typing {
    margin: 0 10px 10px 10px;
    border-radius: 20px;
    background-color: $dark;
    .value {
      height: 50px;
      line-height: 50px;
      color: $white;
      text-align: center;
      font-weight: 700;
      font-size: 28px;
    }
    .digits {
      padding: 10px;
      border-radius: 20px;
      background-color: $darker;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .digit {
        width: calc((100% - 10px) / 3);
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        padding: 0;
        border: none;
        background-color: transparent;
        &.lg {
          font-size: 18px;
        }
        &.xl {
          font-size: 24px;
        }
        &.primary {
          background-color: $primary;
          color: $white;
          border-radius: 15px;
        }
      }
    }
  }
</style>
