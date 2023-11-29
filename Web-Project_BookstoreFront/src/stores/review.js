import { defineStore } from "pinia";
import { createStore } from "@vueuse/core";

export const useReviewStore = defineStore("review",{
  state: ()=>({
    reviews: [],
  }),
  mutations: {
    setReviews(state, reviews) {
      state.reviews = reviews;
    },
    addReview(state, review) {
      state.reviews.unshift(review);
    },
  },
  actions: {
    // Fetch reviews from the server
    async fetchReviews({ commit }) {
      try {
        const response = await this.$api.get('/book_review');
        commit('setReviews', response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Handle errors as needed
        alert('An error occurred while fetching reviews. Please try again.');
      }
    },

    // Submit a new review to the server and update the state
    async submitReview({ commit, state }, { bookId, userId, content }) {
      try {
        const response = await this.$api.post('/book_review/create', {
          bookId,
          userId,
          content,
        });

        if (response.data.status) {
          const newReview = {
            review_id: response.data.review_id,
            review_content: response.data.review_content,
            review_at: response.data.review_at,
          };

          commit('addReview', newReview);
        } else {
          alert('Error submitting review. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        // Handle errors as needed
        alert('An error occurred. Please try again.');
      }
    },
  },
  getters: {
    getReviews: (state) => state.reviews,
  },
});
