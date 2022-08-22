import store from '@/store'
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

export const isHas = {
  inserted(el, binding) {
    // console.log(el)
    // console.log(binding)
    const has = store.state.permission.points.includes(binding.value)
    // console.log(has)
    if (!has) {
      el.remove()
    }
  }
}
