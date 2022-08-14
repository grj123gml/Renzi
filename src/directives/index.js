//定义自定义指令
export const imgError = {
  inserted(el, { value }) {
    if (!el.src) {
      el.src = value
      // console.log(value)
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令绑定元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
      // console.log(value)
    }
  }
}
