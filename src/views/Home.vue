<template>
  <div class="home">
    {{checkToken()}}
    <Navbar></Navbar>
  </div>
</template>

<script>
import router from "../router";
import Navbar from "@/components/Navbar.vue"

export default {
  name: 'home',
  components: {
    Navbar,
  },
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
