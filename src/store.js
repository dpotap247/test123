import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      currentProduct: null,
      products: []
    }
  },
  mutations: {
    setCurrentProduct (state, payload) {
      state.currentProduct = payload
    },
    setProducts (state, payload) {
        state.products = payload
    }
  }
})