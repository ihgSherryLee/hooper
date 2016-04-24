function setCookie (name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

function getCookie (name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(name + '=')
    var c_end
    if (c_start !== -1) {
      c_start = c_start + name.length + 1
      c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}

var account = getCookie('account')
console.log(account)

// module.exports = {
//   setCookie: function (name, value, expiredays) {
//     var exdate = new Date()
//     exdate.setDate(exdate.getDate() + expiredays)
//     document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
//   },
//   getCookie: function (name) {
//     if (document.cookie.length > 0) {
//       var c_start = document.cookie.indexOf(name + '=')
//       var c_end
//       if (c_start !== -1) {
//         c_start = c_start + name.length + 1
//         c_end = document.cookie.indexOf(';', c_start)
//         if (c_end === -1) c_end = document.cookie.length
//         return unescape(document.cookie.substring(c_start, c_end))
//       }
//     }
//     return ''
//   }
// }