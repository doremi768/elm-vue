import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_LOCATION: 'SET_LOCATION',
  SET_ADDRESS: 'SET_ADDRESS'
}

export default new Vuex.Store({
  state: {
    location: {},
    address: ''
  },
  mutations: {
   [types.SET_LOCATION](state,location){
     if(location){
       state.location = location;
     } else {
       state.location = null
     }
   },
   [types.SET_ADDRESS](state,address){
    if(address){
      state.address = address;
    } else {
      state.address = "";
    }
  }
  },
  actions: {
    setLocation: ({commit},location) => {
      commit(types.SET_LOCATION,location)
    },
    setAddress: ({commit},address) => {
      commit(types.SET_ADDRESS,address)
    }
  },
  modules: {
  },
  getters: {
   location: state => state.location,
   address: state => state.address
  }
})
