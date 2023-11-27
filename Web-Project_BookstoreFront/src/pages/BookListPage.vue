<template>
  <q-page class="q-px-md">
    <div class="q-gutter-y-sm">
      <div class="row justify-between">
        <div class="text-subtitle1 text-bold q-mt-md">All Books</div>
        <q-btn
          color="brown"
          icon="add"
          label="ADD"
          style="border-radius: 20px;"
          @click="showDialog"
        />
      </div>
      <BookCard :isDialogVisible="isDialogVisible" @closeDialog="closeDialog" @saveBook="saveBook" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BookCard from '../components/BookCard.vue';

export default defineComponent({
  name: 'BookListPage',
  components: {
    BookCard,
  },
  setup() {
    const isDialogVisible = ref(false);

    const showDialog = () => {
      isDialogVisible.value = true;
    };

    const closeDialog = () => {
      isDialogVisible.value = false;
    };

    const saveBook = (newBook) => {
      // Handle save book logic
      console.log('Book saved in BookListPage:', newBook);
      closeDialog();
    };

    return { isDialogVisible, showDialog, closeDialog, saveBook };
  },
});
</script>
