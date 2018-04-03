<template>
  <nav class="menu">
      <h3><a @click="logout">Logout</a></h3>
  </nav>
</template>

<script>
export default {
  methods : {
    logout() {
        this.$state.user = null
        this.$router.push({name: 'login'})
    }
  }
}
</script>

