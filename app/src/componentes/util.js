'use strict'

import cloneDeep from 'lodash.clonedeep'
export default {
  clone (object) {
    return cloneDeep(object)
  },
  contains (arr1, arr2) {
    return arr2.every(i => arr1.includes(i))
  },
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  getCookie (name) {
    var cookieValue = null
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';')
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  },
  objectMap (object, mapFn) {
    return Object.keys(object).reduce(function (result, chave) {
      result[chave] = mapFn(object[chave], chave)
      return result
    }, {})
  },
  slugify (text, separator = '-') {
    text = text.toString().toLowerCase().trim()
    const sets = [
      { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
      { to: 'c', from: '[ÇĆĈČ]' },
      { to: 'd', from: '[ÐĎĐÞ]' },
      { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
      { to: 'g', from: '[ĜĞĢǴ]' },
      { to: 'h', from: '[ĤḦ]' },
      { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
      { to: 'j', from: '[Ĵ]' },
      { to: 'ij', from: '[Ĳ]' },
      { to: 'k', from: '[Ķ]' },
      { to: 'l', from: '[ĹĻĽŁ]' },
      { to: 'm', from: '[Ḿ]' },
      { to: 'n', from: '[ÑŃŅŇ]' },
      { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
      { to: 'oe', from: '[Œ]' },
      { to: 'p', from: '[ṕ]' },
      { to: 'r', from: '[ŔŖŘ]' },
      { to: 's', from: '[ßŚŜŞŠ]' },
      { to: 't', from: '[ŢŤ]' },
      { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
      { to: 'w', from: '[ẂŴẀẄ]' },
      { to: 'x', from: '[ẍ]' },
      { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
      { to: 'z', from: '[ŹŻŽ]' },
      { to: '-', from: '[·/_,:;\']' }
    ]
    sets.forEach(set => {
      text = text.replace(new RegExp(set.from, 'gi'), set.to)
    })
    text = text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
    if ((typeof separator !== 'undefined') && (separator !== '-')) {
      text = text.replace(/-/g, separator)
    }
    return text
  },
  fileNameSlug (string) {
    var fileName = String(string).split('.').slice(0, -1).join('.')
    var ext = String(string).split('.').pop()
    return this.slugify(fileName) + '.' + ext
  }
}
