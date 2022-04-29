<template>
  <vs-dialog
    :value="true"
    auto-width
    not-center
    prevent-close
    @close="$emit('close')"
  >
    <template #header>
      <h4 class="not-margin">
        Hey there! 🙋‍♂️
      </h4>
    </template>

    <div class="con-content">
      <p>
        Are you sure you want to leave?
      </p>
    </div>

    <template #footer>
      <div class="w-full flex-center">
        <vs-button
          flat
          @click="$emit('close')"
        >
          Cancel
        </vs-button>
        <vs-button @click="$emit('leave')">
          Leave game
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>
