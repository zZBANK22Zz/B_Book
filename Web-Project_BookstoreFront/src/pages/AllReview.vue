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
      :rows="filteredReviews"
      :columns="columns"
      row-key="reviewId"
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
            {{ props.row[col.name] }}
          </q-td>
        </q-tr>
      </template>
      <!-- <template v-slot:body="props">
      <q-tr :props="props">
        <q-td :props="props">{{ props.row.review_id }}</q-td>
        <q-td :props="props">{{ props.row.review_content }}</q-td>
        <q-td :props="props">{{ props.row.review_at }}</q-td>
      </q-tr>
    </template> -->
    </q-table>
    <router-link to="/review">
      <button>Go back</button>
    </router-link>
  </q-page>
</template>

<script>


export default {
  data() {
    return {
      reviews: [],
      columns: [
        { name: 'review_id', label: 'Review ID', align: 'left', field: 'review_id', sortable: true },
        { name: 'review_content', label: 'review', align: 'left', field: 'review_content', sortable: true },
        { name: 'review_at', label: 'Date', align: 'left', field: 'review_at', sortable: true },
      ],
      loading: false,
      searchQuery: '',
    };
  },
  async created() {
     this.loadData();
  },
  computed: {

  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const response = await this.$api.get('/book_review');
        console.log('API response:', response.data);
        this.reviews = response.data.data;
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        this.loading = false;
      }
    },
    refreshData() {
      this.loadData();
    },
    searchReviews(){}
  },
};
</script>

<style scoped>
.q-table {
  width: 100%;
}
button {
    background-color:brown;
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
