<template>
  <section class="section">
    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.configurationLicense.licenses','Licenses') }}
          </div>
          <div class="column is-narrow">
            <button
              v-if="isAdmin"
              class="button is-primary is-small"
              @click.prevent="showCreateForm"
            >
              <octicon :icon="plus" />&ensp;{{ $l('global.add','Add') }}
            </button>
          </div>
        </div>
      </div>

      <data-table
        ref="licenseTable"
        :key="currentLocale"
        :items="licenseList"
        :per-page="10"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          field="key"
          :label="$l('components.configurationLicense.licenseKey', 'License Key')"
        >
          <template slot-scope="props">
            {{ props.item.key }}
            <span
              v-if="!props.item.key"
              class="tag is-primary"
            >
              Not Required
            </span>
            <span
              v-if="props.item.isMaster"
              class="tag is-success"
              style="margin-left: 5px;"
            >
              Master Key
            </span>
          </template>
        </data-column>
        <data-column
          field="groups"
          :label="$l('components.configurationLicense.agentGroups','Agent Groups')"
        >
          <template slot-scope="props">
            <span
              v-for="(id, index) in props.item.groups"
              :key="index"
              class="tag is-primary"
              style="margin: 2px 5px 2px 0"
            >
              {{ groupOptions.find(e => e._id === id) ? groupOptions.find(e => e._id === id).name : 'Unknown Group' }}
            </span>
          </template>
        </data-column>
        <data-column
          field="limit"
          :label="$l('components.configurationLicense.countLimit','Count/Limit')"
        >
          <template slot-scope="props">
            <span
              v-if="props.item.limit < 0"
              class="tag is-primary"
              style="margin: 2px 5px 2px 0"
            >
              Disabled
            </span>
            <div
              v-else
            >
              <div class="tags has-addons mb-1">
                <span class="tag is-info mb-0">{{ licenseFrequency[props.item.key] || 0 }}</span>
                <span class="tag is-primary mb-0">{{ props.item.limit === 0 ? $l('components.configurationLicense.unlimited','Unlimited') : props.item.limit }}</span>
              </div>
            </div>
          </template>
        </data-column>
        <data-column
          v-if="isAdmin"
          :sortable="false"
          :label="$l('global.action','Action')"
          width="15%"
        >
          <template slot-scope="props">
            <button
              class="button is-primary mx-1 my-1 is-small is-light"
              @click.prevent="showUpdateForm(props)"
            >
              {{ $l('global.edit','Edit') }}
            </button>
            <button
              v-if="!props.item.isMaster"
              class="button is-danger mx-1 my-1 is-small is-light"
              @click.prevent="deleteLicense(props)"
            >
              {{ $l('global.delete','Delete') }}
            </button>
          </template>
        </data-column>
      </data-table>
    </box>

    <modal :show.sync="licenseForm">
      <box>
        <div slot="header">
          {{ form.type === 'create' ? $l('components.configurationLicense.createNewGroup','Create New Group'):$l('components.configurationLicense.editGroup','Edit Group') }}
        </div>
        <div style="margin: auto; width:80%; min-height: 450px;">
          <div class="field">
            <label class="label">{{ $l('components.configurationLicense.licenseKey','License Key') }}</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  v-model="form.key"
                  type="text"
                  class="input"
                  :placeholder="$l('components.configurationLicense.licenseKey','License Key')"
                >
              </div>
              <div class="control">
                <button
                  class="button is-primary"
                  @click="generateKey"
                >
                  {{ $l('components.configurationLicense.random','Random') }}
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="!form.isMaster"
            class="field"
          >
            <label class="label">{{ $l('components.configurationLicense.agentGroups', 'Agent Groups') }}</label>
            <div class="control">
              <v-select
                v-model="selectedGroups"
                :options="groupOptions"
                label="name"
                multiple
              />
            </div>
          </div>

          <div class="field">
            <label class="label">{{ $l('components.configurationLicense.limit','Limit') }}</label>
            <div class="control">
              <div class="buttons has-addons">
                <button
                  :class="['button', {'is-info': !isLimitLicense}]"
                  @click="switchLicenseLimitType"
                >
                  {{ $l('components.configurationLicense.unlimited','Unlimited') }}
                </button>
                <button
                  :class="['button', {'is-info': isLimitLicense}]"
                  @click="switchLicenseLimitType"
                >
                  {{ $l('components.configurationLicense.limit','Limited') }}
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="isLimitLicense"
            class="field has-addons"
          >
            <div class="control is-expanded">
              <input
                v-model.number="form.limit"
                type="number"
                class="input"
                :placeholder="$l('components.configurationLicense.limit','Limit')"
              >
            </div>
            <div class="control">
              <p class="control">
                <a class="button is-static">
                  {{ $l('components.configurationLicense.agents','Agents') }}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div
          slot="footer"
          class="field is-grouped is-grouped-right"
        >
          <div class="control">
            <button
              v-if="form.type === 'create'"
              class="button is-primary"
              @click.prevent="saveLicense"
            >
              {{ $l('global.submit','Submit') }}
            </button>
            <button
              v-if="form.type === 'update'"
              class="button is-primary"
              @click.prevent="updateLicense"
            >
              {{ $l('global.update','Update') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="licenseForm = false"
            >
              {{ $l('global.close','Close') }}
            </button>
          </div>
        </div>
      </box>
    </modal>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import { DataTable, DataColumn, Modal } from '@cyradar/ui'
import { plus } from 'octicons-vue'
import LicenseApi from '@/api/License'
import AgentApi from '@/api/Agent'
import GroupApi from '@/api/Group'

export default {
  name: 'ConfigurationLicense',
  components: { DataTable, DataColumn, Modal, vSelect },
  data () {
    return {
      plus,
      licenseForm: false,
      form: {
        type: 'create',
        limit: 0
      },
      isLimitLicense: false,
      licenseList: [],
      licenseFrequency: {},
      groupOptions: [],
      selectedGroups: []
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'currentLocale'
    ])
  },
  mounted () {
    this.fetch()
  },
  methods: {
    switchLicenseLimitType () {
      if (!this.isLimitLicense) {
        this.form.limit = 10
        this.isLimitLicense = true
        return
      }
      this.isLimitLicense = false
    },
    generateKey () {
      let length = 8
      let result = ''
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      this.$set(this.form, 'key', result)
    },
    showCreateForm () {
      this.form = { type: 'create', limit: 0 }
      this.selectedGroups = []
      this.licenseForm = true
      this.isLimitLicense = false
    },
    showUpdateForm (props) {
      this.isLimitLicense = props.item.limit > 0
      this.form = {
        type: 'update',
        _id: props.item._id,
        key: props.item.key,
        isMaster: props.item.isMaster,
        limit: props.item.limit
      }
      this.selectedGroups = this.groupOptions.filter(e => props.item.groups.includes(e._id))
      this.licenseForm = true
    },
    saveLicense () {
      let content = {
        key: this.form.key,
        groups: this.selectedGroups.map(e => e._id),
        limit: this.isLimitLicense ? this.form.limit : 0
      }
      LicenseApi.addLicense(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.fetchLicenses()
          this.licenseForm = false
        })
    },
    updateLicense () {
      let content = {
        _id: this.form._id,
        key: this.form.key,
        isMaster: this.form.isMaster,
        groups: this.selectedGroups.map(e => e._id),
        limit: this.isLimitLicense ? this.form.limit : 0
      }
      LicenseApi.updateLicense(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.fetchLicenses()
          this.licenseForm = false
        })
    },
    deleteLicense (props) {
      LicenseApi.deleteLicense(this.$http, props.item._id)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.fetchLicenses()
        })
    },
    fetch () {
      this.fetchLicenses()
      this.fetchGroups()
      this.fetchLicenseFrequency()
    },
    fetchLicenses () {
      LicenseApi.getLicenseList(this.$http)
        .then(data => {
          this.licenseList = data
        })
    },
    fetchLicenseFrequency () {
      AgentApi.getAgentFrequency(this.$http, { kind: 'groupKey' })
        .then(res => {
          this.licenseFrequency = res.data.reduce(function (map, obj) {
            map[obj.label] = obj.data
            return map
          }, {})
        })
    },
    fetchGroups () {
      return GroupApi.getGroupList(this.$http)
        .then(data => {
          this.groupOptions = data
        })
    }
  }
}
</script>

<style src="vue-select/dist/vue-select.css"></style>
