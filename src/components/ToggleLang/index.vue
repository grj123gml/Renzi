<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value, key) in messages"
        :disabled="key === $i18n.locale"
        :key="key"
        :command="key"
        >{{ key }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookies from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    onCommand(val) {
      // console.log(11)
      this.$i18n.locale = val
      this.$router.go(0)
      Cookies.set('lang',val)
    }
  }
}
</script>

<style scoped></style>
