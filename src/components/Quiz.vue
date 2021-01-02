<template>
  <div class="quiz">
    <md-button @click="start()">Start</md-button>
    <md-progress-bar
      md-mode="determinate"
      :md-value="percentLeft"
    ></md-progress-bar>
    <div v-if="this.$store.state.question.name">
      <h3>{{ this.$store.state.question.name }}</h3>
      <div class="question">
        <div
          v-for="option in this.$store.state.question.options"
          v-bind:key="option.id"
          :id="option.id"
          class="option"
          @click="selectOption(option, $event)"
        >
          <div class="img">
            <img :src="option.images[1].url" />
          </div>
          <h4>{{ option.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const worker = new Worker('@/assets/js/timer.worker.js', { type: 'module' })
export default {
  name: 'Quiz',
  data: function () {
    return {
      percentLeft: 100
    }
  },
  sockets: {
    recieveQuestion: function (question) {
      this.$store.state.question = question
      this.startTimer()
      // setTimeout(function () {
      //   var el = document.getElementById(question.answer)
      //   this.selectAnswer(el)
      // }, 10000)
    }
  },
  methods: {
    start: function () {
      console.log('Starting Quiz')
      var token = localStorage.getObject('spotify_token')
      var headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `${token.token_type} ${token.access_token}`
        }
      }
      this.axios
        .get(
          'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=4&offset=0',
          headers
        )
        .then((res) => {
          this.generateQuestion(res.data.items)
        })
    },
    generateQuestion: function (tracks) {
      var question = {
        answer: tracks[0].id
      }
      var shuffledTracks = this.shuffle(tracks)
      question.options = shuffledTracks
      var name = this.$store.state.user.display_name
      question.name = `Who was ${name}'s most popular artist in the last 6 months?`
      this.$socket.client.emit('broadcastQuestion', question)
    },
    startTimer: function () {
      worker.postMessage(10000)
      worker.onmessage = function (event) {
        var remaining = event.data
        this.percentLeft = remaining
        if (remaining <= 0) {
          this.selectAnswer()
        }
      }.bind(this)
    },
    selectAnswer: function () {
      var el = document.getElementById(this.$store.state.question.answer)
      this.updateOptionElement(el, 'answer')
    },
    selectOption: function (option, event) {
      if (!this.$store.state.selected) {
        this.updateOptionElement(event.target, 'selected')
        this.$store.state.selected = option
      }
    },
    updateOptionElement: function (el, classToAdd) {
      // Recursively select parent until we reach option container div
      if (el.classList.contains('option')) {
        el.classList.add(classToAdd)
      } else {
        this.updateOptionElement(el.parentElement, classToAdd)
      }
    },
    shuffle: function (array) {
      var m = array.length
      var t
      var i

      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)

        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }

      return array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.question {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  gap: 20px 0;
  background: transparent;
  .selected {
    background: orange;
    -webkit-box-shadow: 20px 20px 10px 0px rgba(0, 0, 0, 0.4) !important;
    -moz-box-shadow: 20px 20px 10px 0px rgba(0, 0, 0, 0.4) !important;
    box-shadow: 20px 20px 10px 0px rgba(0, 0, 0, 0.4) !important;
  }
  .answer {
    background: green !important;
    -webkit-box-shadow: 20px 20px 10px 0px rgba(0, 0, 0, 0.4) !important;
    -moz-box-shadow: 20px 20px 10px 0px rgba(0, 0, 0, 0.4) !important;
    box-shadow: 20px 20px 10px 0px rgba(0, 0, 0, 0.4) !important;
  }
  .option {
    -webkit-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.4);
    box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.4);
    width: 400px;
    place-self: center;
    transition: all 0.3s ease;
    .img {
      img {
        border-radius: 50%;
      }
      padding: 10px;
    }
  }
}
</style>
