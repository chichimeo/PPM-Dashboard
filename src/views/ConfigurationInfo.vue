<template>
  <section class="section">
    <box>
      <div slot="header">
        {{ $l('components.configurationInfo.info','Info') }}
      </div>
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.configurationInfo.group','Group') }}</label>
            <div class="control">
              <v-select
                v-model="selectedGroup"
                :options="groupOptions"
                :clearable="false"
                label="name"
              />
            </div>
          </div>
        </div>
      </div>
      <tabs :theme="$_ui_theme_tabs">
        <tab :title="$l('components.configurationInfo.organizationInfo','Organization Info')">
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.organizationID','Organization ID') }}</label>
                <div class="control">
                  <input
                    v-model="form.organization.id"
                    type="text"
                    class="input"
                    placeholder="Organization ID"
                  >
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.organizationName','Organization Name') }}</label>
                <div class="control">
                  <input
                    v-model="form.organization.name"
                    type="text"
                    class="input"
                    placeholder="Organization Name"
                  >
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.organizationAddress','Organization Address') }}</label>
                <input
                  v-model="form.organization.address"
                  type="text"
                  class="input"
                  placeholder="Organization Address"
                >
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.email','Email') }}</label>
                <input
                  v-model="form.organization.email"
                  type="text"
                  class="input"
                  placeholder="Email"
                >
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.telephone','Telephone') }}</label>
                <input
                  v-model="form.organization.telephone"
                  type="text"
                  class="input"
                  placeholder="Telephone"
                >
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.fax','Fax') }}</label>
                <input
                  v-model="form.organization.fax"
                  type="text"
                  class="input"
                  placeholder="Fax"
                >
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.website','Website') }}</label>
                <input
                  v-model="form.organization.website"
                  type="text"
                  class="input"
                  placeholder="Website"
                >
              </div>
            </div>
          </div>
        </tab>
      </tabs>
      <tabs
        style="margin: .5rem 0;"
        :theme="$_ui_theme_tabs"
      >
        <tab :title="$l('components.configurationInfo.endpoint','Endpoint')">
          <div class="columns">
            <div class="column is-half">
              <div class="field">
                <label class="label">{{ $l('components.configurationInfo.reportEndpoint','Report Endpoint') }}</label>
                <div class="control">
                  <input
                    v-model="form.envelopeEndpoint"
                    type="text"
                    class="input"
                    placeholder="Report Endpoint"
                  >
                </div>
              </div>
            </div>
          </div>
        </tab>
      </tabs>
      <div>
        <button
          class="button is-primary"
          @click.prevent="updateConfiguration"
        >
          {{ $l('global.update','Update') }}
        </button>
      </div>
    </box>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import { Tabs, Tab } from '@cyradar/ui'
import GroupApi from '@/api/Group'
import ConfigApi from '@/api/Config'
import vSelect from 'vue-select'

export default {
  name: 'ConfigurationInfo',
  components: { Tabs, Tab, vSelect },
  data () {
    return {
      selectedGroup: null,
      groupOptions: [],
      form: {
        groupName: '',
        organization: { },
        envelopeEndpoint: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  watch: {
    selectedGroup (val, oldVal) {
      if (val.name === 'All') {
        this.form.groupName = ''
        this.fetchConfiguration('')
        return
      }
      this.form.groupName = val.name
      this.fetchConfiguration(this.form.groupName)
    }
  },
  mounted () {
    this.fetchGroups()
      .then(_ => {
        if (this.groupOptions.length > 0) {
          this.selectedGroup = this.groupOptions[0]
        }
      })
  },
  methods: {
    fetchGroups () {
      return GroupApi.getGroupList(this.$http)
        .then(data => {
          let listGroup = data
          if (this.isAdmin) {
            listGroup.unshift({ name: 'All', agentMacs: [] })
          }
          this.groupOptions = listGroup
        })
    },
    fetchConfiguration (grName) {
      ConfigApi.getConfig(this.$http, { groupName: grName })
        .then(res => {
          if (!res.data) {
            return
          }
          let config = res.data
          if (this.form.groupName !== config.groupName) {
            config.groupName = this.form.groupName
          }
          this.form = config
        })
    },
    updateConfiguration () {
      ConfigApi.updateConfig(this.$http, this.form)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
        })
    }
  }
}
</script>

<style src="vue-select/dist/vue-select.css"></style>
