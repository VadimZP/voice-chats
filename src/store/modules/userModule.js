import axios from 'axios';

const userModule = {
  state: {
    username: '',
  },
  getters: {
    username: state => state.username,
  },
  mutations: {
    auth: (state, payload) => {
      state.username = 'test';
    },
  },
  actions: {
    async auth({ commit }, payload) {
      try {
        const { data: { token } } = await axios.post('http://localhost:8000/auth', payload);
        commit('auth', { token });
      } catch (e) {
        throw Error(`Auth error: ${e}`);
      }
    },
  },
};

export default userModule;
