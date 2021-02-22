<template>
  <div id="app">
    <dashboard>
      <template slot="header">
        <div class="navbar-item btn-download">
          <a
            class="button is-link is-light"
            style="height: 2.2em; font-weight: normal;"
            @click="$router.push({ name: 'download' })"
          >
            {{ $l('global.download', 'Download') }}
          </a>
        </div>
      </template>

      <template slot="login-right">
        <div class="has-text-centered">
          <a
            class="button is-primary"
            @click="$router.push({ name: 'download' })"
          >
            {{ $l('components.login.downloadCyEDR', 'Download CyEDR') }}
          </a>
        </div>
      </template>
    </dashboard>
  </div>
</template>
<style src="@cyradar/ui/dist/ui.css"></style>
<script>
import { mapGetters } from 'vuex'
import jwt from 'jwt-decode'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'authenticationToken',
      'authenticationClaims',
      'groupList',
      'routes'
    ])
  },
  watch: {
    authenticationToken (val, oldVal) {
      if (!val) {
        this.$store.dispatch('AUTHENTICATION_SET_CLAIMS')
        return
      }
      this.$store.dispatch('AUTHENTICATION_SET_CLAIMS', jwt(val))
    },
    authenticationClaims (val, oldVal) {
      if (!val) {
        return
      }
      this.$store.dispatch('RELOAD_GROUP_LIST')
    },
    groupList (groupList) {
      let routes = this.routes
      let agentRoute = routes.find(e => e.name === 'agent')

      if (!agentRoute || !groupList) {
        return
      }

      for (let i = 0; i < groupList.length; i++) {
        let children = []
        if (groupList[i].childGroups && groupList[i].childGroups.length > 0) {
          groupList[i].children = groupList.filter(e => groupList[i].childGroups.includes(e._id))
          children = groupList[i].children.map(e => {
            return {
              path: `/agent/${e._id}`,
              meta: { title: e.name }
            }
          })

          groupList = groupList.filter(e => !groupList[i].childGroups.includes(e._id))
        }
        groupList[i] = {
          path: `/agent/${groupList[i]._id}`,
          meta: { title: groupList[i].name },
          children: children
        }
      }

      agentRoute.children = groupList
      this.$store.commit('UPDATE_ROUTES', routes)
    }
  },
  mounted () {
    if (!this.authenticationToken) {
      this.$store.dispatch('AUTHENTICATION_SET_CLAIMS')
      return
    }
    this.$store.dispatch('AUTHENTICATION_SET_CLAIMS', jwt(this.authenticationToken))
  }
}
</script>
<style lang="scss">
  @import "assets/app.scss";
</style>
