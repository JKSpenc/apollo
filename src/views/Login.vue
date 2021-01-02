<template>
  <div class="login">
    <md-button :href="url()">Login</md-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  beforeMount () {
    if (this.$route.query.code) {
      var url = 'http://localhost:3000/token?code=' + this.$route.query.code +
      '&referrer=' + encodeURIComponent('http://' +
      window.location.hostname + (window.location.hostname === 'localhost' ? ':8080' : '') +
       window.location.pathname)
      this.axios.get(url).then((res) => {
        console.log(res)
        localStorage.setObject('spotify_token', res.data)
        var referrer = localStorage.getItem('referrer')
        localStorage.removeItem('referrer')
        window.location.replace(referrer)
      })
    }
  },
  methods: {
    url: function () {
      var scopes = 'user-top-read'
      return 'https://accounts.spotify.com/authorize?' +
        'response_type=code&client_id=9bf03c09856e4c4b88dd0d8fb6cddc90' +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent('http://localhost:8080/login')
    }
  }
}
</script>
