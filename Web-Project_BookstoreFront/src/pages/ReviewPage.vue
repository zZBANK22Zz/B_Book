<template>
  <div>
    <div class="q-pa-md" align="center">
       <h3>Bookstore Reviews</h3>
    </div>


     <div v-if="reviews && reviews.length > 0">
      <div v-for="reviews in reviews" :key="reviews.review_id" class="review">
        <div class="review-card">
          <div class="review-content">
            <p>{{ reviews.review_content }} - {{ reviews.review_at }}</p>
          </div>
          <div class="review-actions">
            <button @click="editReview(reviews)" class="edit-button">Edit</button>
            <button @click="deleteReview(reviews.review_id)" class="delete-button">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      No reviews available.
    </div>

    <div>
        <label for="book-dropdown">Select a book:</label>
        <select v-model="selectedBook" id="book-dropdown">
          <option value="book1">Book 1</option>
          <option value="book2">Book 2</option>
          <option value="book3">Book 3</option>
        </select>
      </div>

    <form @submit.prevent="submitReview">
      <label for="review-content">Write a review:</label>
      <textarea v-model="newReview" id="review-content" name="review-content" rows="4" required></textarea>


      <button type="submit">Submit Review</button>
      <router-link to="/Allreview">
      <button>Go to Review Page</button>
    </router-link>
    </form>
  </div>
</template>

<script>
import { useLoginUserStore } from "../stores/user"

export default {
  data() {
    return {
      userLogin: useLoginUserStore(),
      reviews: [],
      newReview: '',
      bookOptions: [],
    };
  },
  methods: {
    async fetchReviews() {
    try {
        const response = await this.$api.get('/book_review/');
        this.reviews = response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);

    }
},
    async submitReview() {

    const bookId = 1;
    const userId = this.userLogin.userid;

      console.log("user",userId)

    if (!this.newReview) {
        return;
    }

    try {
        const response = await this.$api.post('/book_review/create', {
            bookId,
            userId,
            content: this.newReview,
        });

        console.log('Server response:', JSON.stringify(response.data));

        if (response.data.status) {
          this.newReview = '';
          this.fetchReviews();
        } else {
          alert('Error submitting review. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        if (error.response) {

      console.error('Server responded with:', error.response.data);
    } else if (error.request) {

      console.error('No response received from the server.');
    } else {

      console.error('Error setting up the request:', error.message);
    }

  }
    },
      },
  mounted() {
    this.fetchReviews();
  },
};
</script>

<style scoped>
  .review-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    resize: vertical;
  }

  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
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
