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
      const { username, email, token } = payload;

      localStorage.setItem('token', token);

      state.username = username;
      state.email = email;
    },
  },
  actions: {
    async auth({ commit }, payload) {
      try {
        const { data } = await axios.post('http://localhost:8000/login', payload);
        commit('auth', data);
        return data;
      } catch (e) {
        throw Error(`Auth error: ${e}`);
      }
    },
  },
};

export default userModule;
