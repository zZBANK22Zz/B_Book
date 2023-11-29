<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <q-icon name="attach_money" size="2em" class="q-mr-md" />
      <div class="text-h6 text-bold">All Transactions</div>
    </div>

    <!-- Search Input -->
    <q-input
      v-model="searchQuery"
      filled
      label="Search by Payment ID"
      @input="searchPayments"
    />

    <div v-if="loading" class="text-h6 text-bold row justify-center q-mb-md">
      Loading...
    </div>

    <q-table
      v-else
      :rows="filteredPayments"
      :columns="columns"
      row-key="paymentId"
      class="q-mb-md"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
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
    </q-table>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      payments: [],
      columns: [
        { name: 'paymentId', label: 'Payment ID', align: 'left', field: 'paymentId', sortable: true },
        { name: 'paymentOrder', label: 'Order ID', align: 'left', field: 'paymentOrder', sortable: true },
        { name: 'paymentMethod', label: 'Payment Method', align: 'left', field: 'paymentMethod', sortable: true },
        { name: 'paymentAmount', label: 'Payment Amount', align: 'left', field: 'paymentAmount', sortable: true },
      ],
      loading: false,
      searchQuery: '',
    };
  },
  async created() {
    this.loadData();
  },
  computed: {
    filteredPayments() {
      // Filter payments based on the search query
      const query = this.searchQuery.toLowerCase();
      return this.payments.filter(payment =>
        payment.paymentId.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const response = await this.$api.get('/payment');
        this.payments = response.data.data;
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        this.loading = false;
      }
    },
    refreshData() {
      this.loadData();
    },
    searchPayments() {
      // Triggered when the user types in the search input
      // The filteredPayments computed property will automatically update
      // based on the search query
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here if needed */
.q-table {
  width: 100%;
}
</style>
