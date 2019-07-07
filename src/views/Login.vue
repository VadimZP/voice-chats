<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <div :class="{ 'hasError': $v.form.username.$error }">
                <label for="username">Username</label>
                <input type="username" name="username" v-model="form.username">
            </div>
            <div :class="{ 'hasError': $v.form.password.$error }">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="form.password">
            </div>
            <button type="submit" class="button">
                Submit
            </button>
        </form>
        <p v-if="loginError">{{loginError}}</p>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import router from '../router';

export default {
  data() {
    return {
      loginError: '',
      form: {
        password: '',
        username: '',
      },
    };
  },

  validations: {
    form: {
      password: { required },
      username: { required },
    },
  },

  methods: {
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
      try {
        const result = await this.$store.dispatch('login', { username: this.form.username, password: this.form.password });
        if (result) {
          router.push('home');
        }
      } catch (error) {
        if(error.statusCode === 403) {
          this.loginError = error.message
        }
        throw Error(error.message);
      }
    },
  },
};
</script>

<style lang="scss">
.hasError {
    color: red,
}
</style>
