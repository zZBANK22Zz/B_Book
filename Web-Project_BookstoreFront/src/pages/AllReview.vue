<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <q-icon name="chat" size="2em" class="q-mr-md" />
      <div class="text-h6 text-bold">All Reviews</div>
    </div>

    <div v-if="loading" class="text-h6 text-bold row justify-center q-mb-md">
      Loading...
    </div>

    <q-table
      v-else
      :rows="reviews"
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :props="props" v-for="col in columns" :key="col.name">
            <template v-if="col.name === 'user'">
              {{ props.row.user.firstName }} {{ props.row.user.lastName }}
            </template>
            <template v-else>
              {{ props.row[col.name] }}
            </template>
          </q-td>
          <q-btn
            color="primary"
            label="Edit"
            @click="showEditDialog(props.row.id, props.row.content)"
          />
          <q-btn
            color="negative"
            label="Delete"
            @click="deleteReview(props.row.id)"
          />

        </q-tr>
      </template>
    </q-table>
    <edit-review-dialog
          :dialogVisible="editDialogVisible"
          :reviewId="reviewIdToEdit"
          :initialContent="initialContentToEdit"
          @closeDialog="closeEditDialog"
          @save="saveEditedReview"
        />

    <router-link to="/review">
      <button>Go back</button>
    </router-link>
  </q-page>
</template>

<script>
import EditReviewDialog from '../components/EditReviewDialog.vue';

export default {
  components: {
  EditReviewDialog,
},

  data() {
    return {
      reviews: [],
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
        { name: 'bookId', label: 'Book ID', align: 'left', field: 'bookId', sortable: true },
        { name: 'content', label: 'Review Content', align: 'left', field: 'content', sortable: true },
        { name: 'user', label: 'User', align: 'left', field: 'user', sortable: true },
        { name: 'reviewAt', label: 'Review Date', align: 'left', field: 'reviewAt', sortable: true },
      ],
      loading: false,
      searchQuery: '',
      editDialogVisible: false,
      reviewIdToEdit: null,
      initialContentToEdit: '',
    };
  },
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const response = await this.$api.get('/book_review');
        this.reviews = response.data.data;
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        this.loading = false;
      }
},
        showEditDialog(reviewId, initialContent) {
          console.log('Edit button clicked:', reviewId, initialContent);
            this.reviewIdToEdit = reviewId;
            this.initialContentToEdit = initialContent;
            this.editDialogVisible = true;
          },

          closeEditDialog() {
            this.reviewIdToEdit = null;
            this.initialContentToEdit = '';
            this.editDialogVisible = false;
          },

    refreshData() {
      this.loadData();
    },

    async saveEditedReview(reviewId, editedContent) {
  console.log('Edit dialog triggered with ID:', reviewId);
  try {
    const formData = new FormData();
    formData.append('content', editedContent);

    // Assuming your API endpoint for updating is correct
    await this.$api.put(`/book_review/update/${reviewId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to form data
      },
    });

    const editedReviewIndex = this.reviews.findIndex(review => review.id === reviewId);
    if (editedReviewIndex !== -1) {
      this.$set(this.reviews, editedReviewIndex, { ...this.reviews[editedReviewIndex], content: editedContent });
    }
    console.log(`Review ID ${reviewId} edited successfully`);
  } catch (error) {
    console.error(`Error editing review ID ${reviewId}:`, error);
  }
},
  async deleteReview(reviewId) {
  try {
    await this.$api.delete(`/book_review/remove/${reviewId}`);
    this.reviews = this.reviews.filter(review => review.id !== reviewId);
    console.log(`Review ID ${reviewId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting review ID ${reviewId}:`, error);
  }
},

  },
};
</script>

<style scoped>
.q-table {
  width: 100%;
}
button {
  background-color: brown;
  color: #fff;
  padding: 10px;
  border: 20px;
  border-radius: 20px;
  cursor: pointer;
}
button:hover {
  background-color: whitesmoke;
}
</style>
