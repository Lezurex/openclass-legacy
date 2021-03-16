<template>
  <main>
    <div></div>
  </main>
</template>

<script>
export default {
  name: "Login",
  methods: {
    async sendRequest() {
      await fetch('/api/', {
        method: "GET",
      });
    }
  }
}
</script>

<style scoped>

</style>