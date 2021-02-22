<template>
  <div>
    <section
      v-if="currentRouteName === 'config'"
      class="section"
    >
      <div class="columns has-text-centered is-multiline">
        <div class="column is-half">
          <div class="widget widget--green">
            <div
              class="columns"
              style="cursor: pointer; padding: 2rem 0;"
              @click="$router.push({ name: 'config:info' })"
            >
              <div class="column is-5">
                <span>
                  <octicon
                    :icon="info"
                    :scale="3.5"
                  />
                </span>
              </div>
              <div class="columns is-vcentered">
                <span>{{ $l('components.configuration.organizationInfo','Organization Info') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="widget widget--blue">
            <div
              class="columns"
              style="cursor: pointer; padding: 2rem 0;"
              @click="$router.push({ name: 'config:group' })"
            >
              <div class="column is-5">
                <span>
                  <octicon
                    :icon="organization"
                    :scale="3.5"
                  />
                </span>
              </div>
              <div class="columns is-vcentered">
                <span>{{ $l('components.configuration.agentsGroup','Agents Group') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="widget widget--yellow">
            <div
              class="columns"
              style="cursor: pointer; padding: 2rem 0;"
              @click="$router.push({ name: 'config:license' })"
            >
              <div class="column is-5">
                <span>
                  <octicon
                    :icon="key"
                    :scale="3.5"
                  />
                </span>
              </div>
              <div class="columns is-vcentered">
                <span>{{ $l('components.configuration.license','License') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="widget widget--pink">
            <div
              class="columns"
              style="cursor: pointer; padding: 2rem 0;"
              @click="$router.push({ name: 'config:user' })"
            >
              <div class="column is-5">
                <span>
                  <octicon
                    :icon="shield"
                    :scale="3.5"
                  />
                </span>
              </div>
              <div class="columns is-vcentered">
                <span>{{ $l('components.configuration.dashboardUser','Dashboard User') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="widget widget--gray">
            <div
              class="columns"
              style="cursor: pointer; padding: 2rem 0;"
              @click="$router.push({ name: 'config:update' })"
            >
              <div class="column is-5">
                <span>
                  <octicon
                    :icon="desktopDownload"
                    :scale="3.5"
                  />
                </span>
              </div>
              <div class="columns is-vcentered">
                <span>{{ $l('components.configuration.offlineUpdate','Offline Update') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <router-view v-else />
  </div>
</template>
<script>
import Octicon, { info, shield, organization, desktopDownload, key } from 'octicons-vue'

export default {
  name: 'Configuration',
  components: { Octicon },
  data: function () {
    return {
      info,
      shield,
      organization,
      desktopDownload,
      key
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>
