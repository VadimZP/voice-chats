<template>
  <div class="home">
    {{checkToken()}}
  </div>
</template>

<script>
import router from "../router";

export default {
  name: 'home',
  data() {
    return {
      token: ''
    }
  },
  methods: {
    checkToken() {
      if(localStorage.getItem('token') === null) {
        router.push('login')
      }
    }
  }
};
</script>
