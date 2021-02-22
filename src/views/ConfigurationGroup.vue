<template>
  <section class="section">
    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.configurationGroup.groups','Groups') }}
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
        ref="groupTable"
        :key="currentLocale"
        :items="groupList"
        :per-page="10"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          :label="$l('components.configurationGroup.licenseKey','License Key')"
        >
          <template slot-scope="props">
            <span
              v-for="(key, index) in computeLicenseForGroup(props.item._id)"
              :key="index"
              class="tag is-primary is-light"
              style="margin: 2px 5px 2px 0"
            >
              {{ key }}
            </span>
          </template>
        </data-column>
        <data-column
          field="name"
          :label="$l('components.configurationGroup.groupName', 'Group Name')"
          width="15%"
        />
        <data-column
          :label="$l('components.configurationGroup.childGroups','Child Groups')"
        >
          <template slot-scope="props">
            <span
              v-for="(child, index) in computeChildGroups(props.item)"
              :key="index"
              class="tag is-info is-light"
              style="margin: 2px 5px 2px 0"
            >
              {{ child }}
            </span>
          </template>
        </data-column>
        <data-column
          :label="$l('components.configurationGroup.agentCount','Agent Count')"
        >
          <template slot-scope="props">
            {{ agentCount(computeAgentMacs(props.item)) }}
          </template>
        </data-column>
        <data-column
          :sortable="false"
          :label="$l('components.configurationGroup.agents','Agents')"
        >
          <template slot-scope="props">
            <span
              v-for="(mac, index) in computeAgentMacs(props.item).slice(0, 10)"
              :key="index"
              class="tag is-primary is-light"
              style="margin: 2px 5px 2px 0"
            >
              {{ agentOptions.find(e => e.mac === mac) ? agentOptions.find(e => e.mac === mac).computerName : 'Unknown PC' }}
            </span>
            <span
              v-if="agentCount(computeAgentMacs(props.item))>10"
              class="tag is-primary is-light"
              style="margin: 2px 5px 2px 0"
            > and {{ agentCount(computeAgentMacs(props.item)) -10 }} more ...</span>
          </template>
        </data-column>
        <data-column
          v-if="isAdmin"
          :sortable="false"
          :label="$l('components.configurationGroup.action','Action')"
        >
          <template slot-scope="props">
            <button
              class="button is-primary mx-1 my-1 is-small is-light"
              @click.prevent="showUpdateForm(props)"
            >
              {{ $l('global.edit','Edit') }}
            </button>
            <button
              class="button is-danger mx-1 my-1 is-small is-light"
              @click.prevent="deleteGroup(props)"
            >
              {{ $l('global.delete','Delete') }}
            </button>
          </template>
        </data-column>
      </data-table>
    </box>

    <modal :show.sync="groupForm">
      <box>
        <div slot="header">
          {{ form.type === 'create' ? $l('components.configurationGroup.createNewGroup','Create New Group'):$l('components.configurationGroup.editGroup','Edit Group') }}
        </div>
        <div style="margin: auto; width:80%;">
          <div class="field">
            <label class="label">{{ $l('components.configurationGroup.name','Name') }}</label>
            <div class="control">
              <input
                v-if="form.type === 'create'"
                v-model="form.name"
                type="text"
                class="input"
                placeholder="Group Name"
              >
              <input
                v-if="form.type === 'update'"
                v-model="form.name"
                disabled
                type="text"
                class="input"
                placeholder="Name"
              >
            </div>
          </div>

          <div
            v-if="form.type === 'create'"
            class="field"
          >
            <label class="checkbox">
              <input
                v-model="form.isCreateLicense"
                type="checkbox"
              >
              {{ $l('components.configurationGroup.createLicense','Create license key for this group') }}
            </label>
          </div>

          <div
            v-if="form.isCreateLicense"
            class="field"
          >
            <label class="label">{{ $l('components.configurationGroup.licenseKey','License Key') }}</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  v-model="form.licenseKey"
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

          <div class="field">
            <label class="label">{{ $l('components.configurationGroup.agents','Agents') }}</label>
            <div class="control">
              <v-select
                v-model="selectedAgents"
                :options="agentOptions"
                label="computerName"
                multiple
              />
            </div>
          </div>

          <div class="field">
            <label class="label">{{ $l('components.configurationGroup.childGroups', 'Child Groups') }}</label>
            <div class="control">
              <v-select
                v-model="selectedChilds"
                :options="groupOptions"
                label="name"
                multiple
              />
            </div>
          </div>

          <div class="field">
            <label class="label">{{ $l('components.configurationGroup.description','Description') }}</label>
            <div class="control">
              <textarea
                v-model="form.desc"
                rows="2"
                type="text"
                class="textarea"
                placeholder="Description"
              />
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
              @click.prevent="saveGroup"
            >
              {{ $l('global.submit','Submit') }}
            </button>
            <button
              v-if="form.type === 'update'"
              class="button is-primary"
              @click.prevent="updateGroup"
            >
              {{ $l('global.update','Update') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="groupForm = false"
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
import GroupApi from '@/api/Group'
import AgentApi from '@/api/Agent'
import LicenseApi from '@/api/License'

export default {
  name: 'ConfigurationGroup',
  components: { DataTable, DataColumn, Modal, vSelect },
  data () {
    return {
      plus,
      netmask: 24,
      groupForm: false,
      form: {
        type: 'create'
      },
      isInitUpdate: false,
      subnetOptions: [],
      agentOptions: [],
      groupList: [],
      groupOptions: [],
      licenseList: [],
      selectedAgents: [],
      selectedChilds: []
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'currentLocale'
    ]),
    selectedSubnets () {
      if (!this.form.subnets) {
        return []
      }
      return this.form.subnets
    }
  },
  watch: {
    netmask (val, oldVal) {
      this.fetchSubnets()
    },
    selectedSubnets (val, oldVal) {
      if (this.isInitUpdate) {
        this.isInitUpdate = false
        return
      }
      if (val.length === 0) {
        this.selectedAgents = []
        return
      }
      this.fetchAgents()
        .then(data => {
          this.selectedAgents = data.items
        })
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    generateKey () {
      let length = 8
      let result = ''
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      this.$set(this.form, 'licenseKey', result)
    },
    saveGroup () {
      let content = {
        name: this.form.name,
        subnets: this.form.subnets,
        agentMacs: this.selectedAgents.map(e => e.mac),
        childGroups: this.selectedChilds.map(e => e._id),
        desc: this.form.desc
      }
      GroupApi.addGroup(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.fetchGroups()
            .then(_ => {
              if (this.form.isCreateLicense) {
                let newGroup = this.groupList.find(e => e.name === content.name)
                let license = {
                  key: this.form.licenseKey,
                  groups: [newGroup._id]
                }
                LicenseApi.addLicense(this.$http, license)
                  .then(res => {
                    this.$store.dispatch('NOTIFY', {
                      type: 'success',
                      text: res.message,
                      duration: 10000
                    })
                  })
              }

              this.groupForm = false
              this.resetForm('create')
            })
        })
    },
    updateGroup () {
      let content = {
        _id: this.form._id,
        name: this.form.name,
        subnets: this.form.subnets,
        agentMacs: this.selectedAgents.map(e => e.mac),
        childGroups: this.selectedChilds.map(e => e._id),
        desc: this.form.desc
      }
      GroupApi.updateGroup(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.fetchGroups()
          this.groupForm = false
          this.resetForm('create')
        })
    },
    showCreateForm () {
      this.resetForm('create')
      this.groupForm = !this.groupForm
      this.groupOptions = this.groupList
      this.selectedChilds = []
    },
    showUpdateForm (props) {
      this.isInitUpdate = true
      this.form = {
        type: 'update',
        _id: props.item._id,
        name: props.item.name,
        subnets: props.item.$_subnets,
        desc: props.item.desc
      }
      this.groupOptions = this.groupList.filter(group => props.item._id !== group._id)
      this.selectedChilds = []
      this.selectedAgents = this.agentOptions.filter(agent => props.item.agentMacs.includes(agent.mac))
      if (props.item.childGroups && props.item.childGroups.length > 0) {
        this.selectedChilds = this.groupOptions.filter(group => props.item.childGroups.includes(group._id))
      }
      this.groupForm = !this.groupForm
    },
    resetForm (type) {
      this.form = { type: type }
      this.selectedAgents = []
      this.selectedChilds = []
    },
    deleteGroup (props) {
      GroupApi.deleteGroup(this.$http, props.item._id)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.fetchGroups()
        })
    },
    groupListFunc (filtering, sorting, paging) {
      return GroupApi.getGroupVueTable(this.$http, filtering, sorting, paging)
        .then(res => res.data)
    },
    fetch () {
      this.fetchSubnets()
      this.fetchAgents()
        .then(data => {
          this.agentOptions = data.items
        })
      this.fetchGroups()
      this.fetchLicenses()
    },
    fetchSubnets () {
      AgentApi.getAgentFrequency(this.$http, { kind: 'subnet', netmask: this.netmask })
        .then(res => res.data)
        .then(data => data.map(e => { return e.label }))
        .then(data => {
          this.subnetOptions = data
        })
    },
    fetchAgents () {
      return AgentApi.getAgentVueTable(this.$http, null, null, null, {
        subnets: this.selectedSubnets,
        limit: 0
      })
        .then(res => res.data)
    },
    fetchGroups () {
      return GroupApi.getGroupList(this.$http)
        .then(data => {
          this.groupList = data
        })
    },
    fetchLicenses () {
      return LicenseApi.getLicenseList(this.$http)
        .then(data => {
          this.licenseList = data
        })
    },
    computeLicenseForGroup (id) {
      let filtered = this.licenseList.filter(e => e.groups.includes(id))
      if (filtered.length < 1) {
        return []
      }
      return filtered.map(e => e.key)
    },
    computeAgentMacs (agent) {
      if (!agent.childAgentMacs || agent.childAgentMacs.length === 0) {
        return agent.agentMacs
      }
      return [...agent.agentMacs, ...agent.childAgentMacs]
    },
    computeChildGroups (item) {
      if (!item.childGroups || item.childGroups.length <= 0) {
        return ''
      }

      return this.groupList.filter(e => item.childGroups.includes(e._id)).map(e => e.name)
    },
    formatListSubnet (val) {
      if (!val || val.length === 0) {
        return ''
      }
      return val.join(', ')
    },
    agentCount (val) {
      if (!val) {
        return 0
      }
      return val.length
    },
    setNetmask (val) {
      this.netmask = val
    }
  }
}
</script>

<style src="vue-select/dist/vue-select.css"></style>
