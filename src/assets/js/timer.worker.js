/* eslint-disable */
addEventListener('message', event => {
  var maxTime = event.data
  var timeout = maxTime
  var timer = setInterval(updateProgress, 100)
  function updateProgress () {
    if (timeout <= 0) {
      clearInterval(timer)
    } else {
      timeout = timeout - 100
      postMessage((timeout / maxTime) * 100)
    }
  }
})
