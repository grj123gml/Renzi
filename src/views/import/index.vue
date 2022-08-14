<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeUpload="beforeUpload"></upload-excel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    beforeUpload() {}
  }
}
</script>

<style scoped lang="scss"></style>
