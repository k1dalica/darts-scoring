<template>
  <vs-dialog
    :value="true"
    not-close
    auto-width
    not-center
    prevent-close
  >
    <template #header>
      <h4 class="not-margin">
        Congratulations! 🥳🎯
      </h4>
    </template>

    <div class="con-content">
      <p v-if="!isLastSet">
        Player <b>{{ winner ? winner.name : '' }}</b> won a battle, but not a war!
      </p>
      <p v-else>
        <template v-if="set > 1">
          Player <b>{{ winner ? winner.name : '' }}</b> won last set.<br><br>
          <template v-if="playersWithMostWins.length > 1">
            But overall it's a draw between <b>{{ playersWithMostWins.join(', ') }}</b>! What now?
          </template>
          <template v-else>
            But overall player with most wins is <b>{{ playersWithMostWins[0] }}</b>! What now?
          </template>
        </template>
        <template v-else>
          Player <b>{{ winner ? winner.name : '' }}</b> won! What now?
        </template>
      </p>
    </div>

    <template #footer>
      <div class="w-full flex-center">
        <vs-button
          flat
          @click="$emit('leave')"
        >
          Leave game
        </vs-button>
        <vs-button
          v-if="!isLastSet"
          @click="$emit('nextSet')"
        >
          Next set
        </vs-button>
        <vs-button
          v-if="isLastSet"
          @click="$emit('replay')"
        >
          Play again
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  props: {
    winner: {
      type: Object,
      required: true
    },

    playersWithMostWins: {
      type: Array,
      required: true
    },

    set: {
      type: Number,
      required: true
    },

    isLastSet: {
      type: Boolean,
      default: false
    }
  }
}
</script>
