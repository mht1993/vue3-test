import Vue from 'vue'
import Loading from './loading.vue'
const Mask = Vue.extend(Loading)
const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      el.instance.visible = true
      insertDom(el, el, binding)
    })
  } else {
    el.instance.visible = false
  }
}

const insertDom = (parent, el) => {
  parent.appendChild(el.mask)
}

const _Loading = {
  bind: function (el, binding) {
    const mask = new Mask({
      el: document.createElement('div'),
      data () {}
    })
    el.instance = mask
    el.mask = mask.$el
    el.maskStyle = {}
    binding.value && toggleLoading(el, binding)
  },
  update: function (el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind: function (el) {
    el.instance && el.instance.$destroy()
  }
}

export default {
  install (Vue) {
    Vue.directive('_loading', _Loading)
  }
}