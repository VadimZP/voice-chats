import axios from 'axios';

class ApiError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const userModule = {
  state: {
    username: '',
  },
  getters: {
    username: state => state.username,
  },
  mutations: {
    login: (state, payload) => {
      const { data: { username, token } } = payload;
      console.log(username)
      localStorage.setItem('token', token);

      state.username = username;
      state.username = username;
    },
    signup: (state, payload) => {
      const { username } = payload;

      state.username = username;
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const data = await axios.post('http://localhost:8000/login', payload);
        commit('login', data);
        return data;
      } catch (error) {
        throw new ApiError('Incorrect username or password', error.response.status);
      }
    },
    async signup({ commit }, payload) {
      try {
        const data = await axios.post('http://localhost:8000/signup', payload);
        commit('signup', data);
        return data;
      } catch (error) {
        throw new ApiError(error.response.message, error.response.status);
      }
    },
  },
};

export default userModule;
