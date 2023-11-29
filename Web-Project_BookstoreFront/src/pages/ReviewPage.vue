<template>
  <div>
    <div class="q-pa-md" align="center">
       <h3>Bookstore Reviews</h3>
    </div>

    <div v-if="reviews.length === 0">No reviews available.</div>

    <div v-else>
      <div v-for="review in reviews" :key="review.review_id" class="review">
        {{ review.review_content }} - {{ review.review_at }}
      </div>
    </div>

    <form @submit.prevent="submitReview">
      <label for="review-content">Write a review:</label>
      <textarea v-model="newReview" id="review-content" name="review-content" rows="4" required></textarea>
      <button type="submit">Submit Review</button>
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
    };
  },
  methods: {
    async fetchReviews() {
    try {
        const response = await this.$api.get('/book_review');
        this.reviews = response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        alert('An error occurred while fetching reviews. Please try again.');
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
  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .reviews-container {
    margin-top: 20px;
  }

  .review {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
  }

  form {
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

  .no-reviews {
    margin-top: 20px;
    text-align: center;
    color: #888;
  }
</style>
