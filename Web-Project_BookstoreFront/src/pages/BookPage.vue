<template>
  <q-page class="q-pa-md">
    <div class="text-h6 text-bold">All Books</div>

    <div v-if="loading" class="text-h6 text-bold row justify-center q-mb-md">
      Loading...
    </div>

    <q-table
      v-else
      :rows="books"
      :columns="columns"
      row-key="id"
      class="q-mb-md"
    >
      <template v-slot:top-right>
        <q-btn
          color="brown"
          label="Refresh"
          icon="refresh"
          @click="refreshData"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      loading: false,
      columns: [
        { name: 'id', label: 'Book ID', align: 'left', field: 'id', sortable: true },
        { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
        { name: 'authorName', label: 'Author Name', align: 'left', field: 'authorName', sortable: true },
        { name: 'price', label: 'Price', align: 'left', field: 'price', sortable: true },
        { name: 'stock', label: 'Stock', align: 'left', field: 'stock', sortable: true },
        { name: 'firstReviewContent', label: 'First Review', align: 'left', field: 'firstReviewContent', sortable: true },
      ],
    };
  },
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const response = await this.$api.get('/book');
        this.books = response.data.data.map(book => ({
          id: book.id,
          title: book.title,
          authorName: book.author ? book.author.name : 'N/A',
          price: book.price,
          stock: book.stock,
          firstReviewContent: book.review && book.review.length > 0 ? book.review[0].content : 'No reviews',
        }));
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        this.loading = false;
      }
    },
    refreshData() {
      this.loadData();
    },
  },
};
</script>

<style scoped>
.q-table {
  width: 100%;
}
</style>
