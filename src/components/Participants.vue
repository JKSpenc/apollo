<template>
  <div class="participants">
    <h2>Participants</h2>
    <ul>
      <li v-for="user in this.$store.state.users" v-bind:key="user.username">
        <div :class="'user'">
          <div class="info">
            <md-avatar v-if="user.images.length > 0" class="md-avatar-icon">
              <img :src="user.images[0].url" :alt="user.display_name[0]" />
            </md-avatar>
            <md-avatar v-else class="md-avatar-icon">
              {{ user.display_name[0] }}
            </md-avatar>
            <span>{{ user.display_name }}</span>
          </div>
          <div class="score">
            <span>0</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Participants'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.current {
  background: var(--md-theme-default-primary, #118511);
}
.participants {
  text-align: left;
  padding: 20px;
  ul {
    display: contents;
    li {
      display: block;
      .user {
        display: flex;
        border-radius: 5px;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 4px;
        border: 1px #ffe1e1 solid;
        .info {
          flex-grow: 9;
          span {
            padding-left: 10px;
          }
        }
        .score {
          flex-grow: 1;
          span {
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
