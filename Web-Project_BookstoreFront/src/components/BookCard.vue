<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card>
      <q-card-section class="q-pt-md">
        <q-input v-model="bookTitle" label="Book Title" />
        <q-input v-model="languageId" label="Language ID" />
        <q-input v-model="publicationDate" label="Publication Date" type="date" />
        <q-input v-model="author" label="Author" />
        <q-input v-model="price" label="Price" type="number" />
        <q-input v-model="edition" label="Edition" />
        <q-input v-model="stock" label="Stock" type="number" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Close" color="black" @click="closeDialog" />
        <q-btn label="Save" color="brown" @click="saveBook" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'BookCard',
  props: {
    isDialogVisible: Boolean,
  },
  emits: ['closeDialog', 'saveBook'],
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const bookTitle = ref('');
    const languageId = ref('');
    const publicationDate = ref('');
    const author = ref('');
    const price = ref(0);
    const edition = ref('');
    const stock = ref(0);

    watch(() => props.isDialogVisible, (newValue) => {
      dialogVisible.value = newValue;
    });

    // ... rest of the code ...

    const closeDialog = () => {
      resetFormValues();
      emit('closeDialog');
    };

    const saveBook = () => {
      const newBook = {
        title: bookTitle.value,
        languageId: languageId.value,
        publicationDate: publicationDate.value,
        author: author.value,
        price: price.value,
        edition: edition.value,
        stock: stock.value,
      };

      emit('saveBook', newBook);
      closeDialog();
    };

    const resetFormValues = () => {
      bookTitle.value = '';
      languageId.value = '';
      publicationDate.value = '';
      author.value = '';
      price.value = 0;
      edition.value = '';
      stock.value = 0;
    };

    return { dialogVisible, bookTitle, languageId, publicationDate, author, price, edition, stock, closeDialog, saveBook };
  },
});
</script>
