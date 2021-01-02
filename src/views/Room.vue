<template>
  <div class="room">
    <quiz/>
    <participants/>
  </div>
</template>

<script>
import Participants from '../components/Participants.vue'
import Quiz from '../components/Quiz.vue'
export default {
  components: { Participants, Quiz },
  name: 'Room',
  mounted () {
    var token = localStorage.getObject('spotify_token')
    var headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
    this.axios.get('https://api.spotify.com/v1/me', headers).then((res) => {
      this.$store.commit('setUser', res.data)
      this.$socket.client.emit('setRoom', this.$route.params.room, res.data)
    })
  },
  sockets: {
    connect () {
      console.log('connected')
    },
    updateRoom (users) {
      this.$store.commit('setUsers', users)
    }
  }
}
</script>

<style lang="scss" scoped>
.room {
  display: flex;

  .quiz {
    flex-grow: 5;
  }
  .participants {
    flex-grow: 1;
  }
}
</style>
