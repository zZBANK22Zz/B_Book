<template>
  <q-dialog v-model="localDialogVisible" persistent>
    <q-card>
      <q-card-section>
        <q-card-title class="text-h6">Edit Review</q-card-title>
        <q-input
          v-model="editedContent"
          label="Review Content"
          counter
          @input="handleInput"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="closeDialog" />
        <q-btn label="Save" color="positive" :disable="!isValid" @click="saveReview" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    reviewId: Number,
    initialContent: String,
  },
  data() {
    return {
      localDialogVisible: false,
      editedContent: '',
    };
  },
  computed: {
    isValid() {
      // Add any additional validation logic here
      return this.editedContent.trim() !== '';
    },
  },
  watch: {
    dialogVisible: {
    immediate: true,
    handler(newVal) {
      this.localDialogVisible = newVal;
    },
  },
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog', this.localDialogVisible);
    },
    saveReview() {
      // Send the edited content to the parent component to handle the API call
      this.$emit('save', this.reviewId, this.editedContent);
      this.closeDialog();
    },
    handleInput(value) {
      // You can add additional input handling logic here if needed
      this.editedContent = value;
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
