<template>
  <vs-dialog
    :value="true"
    width="550px"
    not-center
    prevent-close
  >
    <template #header>
      <h4 class="not-margin">
        Hello there! 🙋‍♂️
      </h4>
    </template>

    <div class="con-content">
      <p>
        We've noticed you have unfinished game. Would you like to resume it?
      </p>
    </div>

    <template #footer>
      <div class="w-full flex-center">
        <vs-button
          flat
          @click="$emit('cancel')"
        >
          No
        </vs-button>
        <vs-button @click="$emit('resume')">
          Yes
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>
