<template>
  <section class="section">
    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.policies.policies','Policies') }}
          </div>
          <div class="column is-narrow">
            <button
              class="button is-primary is-small"
              @click.prevent="showCreateForm"
            >
              <octicon :icon="plus" />&ensp; {{ $l('components.policies.add','Add') }}
            </button>
          </div>
        </div>
      </div>
      <data-table
        ref="policyTable"
        :key="currentLocale"
        :items="policyListFunc"
        :per-page="10"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          field="name"
          :label="$l('components.policies.name','Name')"
        />
        <data-column
          field="type"
          :label="$l('components.policies.type','Type')"
        >
          <template slot-scope="props">
            <span
              v-if="props.item.type === 'whitelist'"
              class="tag is-light"
            >
              {{ $l('components.policies.whitelist','Whitelist') }}
            </span>
            <span
              v-else-if="props.item.type === 'blacklist'"
              class="tag is-black"
            >
              {{ $l('components.policies.blacklist','Blacklist') }}
            </span>
            <span
              v-else-if="props.item.type === 'restriction'"
              class="tag is-warning"
            >
              {{ $l('components.policies.restriction','Password-Protected Uninstallation') }}
            </span>
            <span
              v-else
              class="tag is-warning"
            >
              {{ props.item.type }}
            </span>
          </template>
        </data-column>
        <data-column
          :sortable="false"
          :label="$l('components.policies.audience','Audience')"
        >
          <template slot-scope="props">
            <span
              v-if="props.item.audience.length === 0"
              class="tag is-primary"
              style="margin-right: 5px;"
            >
              {{ $l('components.policies.everyone','Everyone') }}
            </span>
            <span
              v-for="(mac, index) in props.item.audience"
              :key="index"
            >
              <span
                v-if="agentOptions.find(e => e.mac === mac) && index < 10"
                class="tag is-primary"
                style="margin-right: 5px;"
              >
                {{ agentOptions.find(e => e.mac === mac).computerName }}
              </span>
            </span>
            <span
              v-if="props.item && props.item.audience && props.item.audience.length>10"
            >
              ...
            </span>
          </template>
        </data-column>
        <data-column
          :sortable="false"
          :label="$l('components.policies.accessControlList','Access Control List')"
        >
          <template slot-scope="props">
            <div
              v-for="(ace, index) in props.item.accessControlList"
              :key="index"
              class="tags has-addons mb-1"
            >
              <span class="tag is-info mb-0 is-uppercase">{{ ace.controlType }}</span>
              <span class="tag is-primary mb-0">{{ ace.controlEntry }}</span>
            </div>
          </template>
        </data-column>
        <data-column
          :sortable="false"
          :label="$l('components.policies.action','Action')"
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
              class="button is-danger mx-1 my-1 is-small is-light"
              @click.prevent="deletePolicy(props)"
            >
              {{ $l('global.delete','Delete') }}
            </button>
          </template>
        </data-column>
      </data-table>
    </box>

    <modal :show.sync="showForm">
      <box>
        <div slot="header">
          {{ formType === 'create'? $l('components.policies.newPolicy','New Policy') : $l('components.policies.updatePolicy','Update Policy') }}
        </div>

        <div style="margin: auto; width:80%; padding-bottom: 10px;">
          <div class="field">
            <label class="label">{{ $l('components.policies.name','Name') }}</label>
            <div class="control">
              <input
                v-model="form.name"
                class="input"
                type="text"
                placeholder="Name"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $l('components.policies.description','Description') }}</label>
            <div class="control">
              <input
                v-model="form.desc"
                class="input"
                type="text"
                placeholder="Description"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $l('components.policies.policyType','Policy Type') }}</label>
            <div class="control">
              <v-select
                v-model="form.type"
                :clearable="false"
                :disabled="formType === 'update'"
                :reduce="item => item.value"
                :options="policyTypeOptions"
              />
            </div>
            <p class="help is-size-6 is-italic">
              <!-- eslint-disable vue/no-v-html -->
              <span
                v-if="form.type === 'blacklist'"
                v-html="$t('components.policies.blacklistHelp')"
              />

              <span
                v-if="form.type === 'restriction'"
                v-html="$t('components.policies.restrictionHelp')"
              />
            </p>
          </div>
          <div class="field">
            <label class="label">{{ $l('components.policies.audience','Audience') }}</label>
            <div class="control">
              <div class="buttons has-addons">
                <button
                  :class="['button', {'is-info': isGeneralPolicy}]"
                  @click="switchPolicyAudType"
                >
                  {{ $l('components.policies.general','General') }}
                </button>
                <button
                  :class="['button', {'is-info': !isGeneralPolicy}]"
                  @click="switchPolicyAudType"
                >
                  {{ $l('components.policies.specific','Specific') }}
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="!isGeneralPolicy"
            class="field"
          >
            <label class="label">{{ $l('components.policies.groups','Groups') }}</label>
            <div class="control">
              <v-select
                v-model="selectedGroup"
                :options="groupOptions"
                append-to-body
                label="name"
                :clearable="false"
              />
            </div>
          </div>
          <div
            v-if="!isGeneralPolicy"
            class="field"
          >
            <label class="label">{{ $l('components.policies.agents','Agents') }}</label>
            <div class="control">
              <v-select
                v-model="selectedAgents"
                :options="agentOptions"
                append-to-body
                label="computerName"
                multiple
              />
            </div>
          </div>
          <div class="field">
            <div class="columns is-gapless mb-2">
              <label class="label column">{{ $l('components.policies.accessControlList','Access Control List') }}</label>
              <div
                v-if="isMultipleACL"
                class="column is-narrow"
              >
                <button
                  class="button is-primary is-small is-light"
                  @click="addACE"
                >
                  <octicon :icon="plus" />
                </button>
              </div>
            </div>
            <div
              v-for="(ace, index) in form.accessControlList"
              :key="index"
              class="control columns is-variable is-1 is-vcentered"
            >
              <div class="column is-4">
                <v-select
                  v-model="ace.controlType"
                  append-to-body
                  :disabled="controlTypeOptions && controlTypeOptions.length <= 1"
                  :clearable="false"
                  label="name"
                  :reduce="item => item.value"
                  :options="controlTypeOptions"
                />
              </div>
              <div class="column">
                <input
                  v-model="ace.controlEntry"
                  class="input"
                  type="text"
                  :placeholder="calEntryPlaceholder(ace.controlType)"
                >
              </div>
              <div
                v-if="isMultipleACL"
                class="column is-narrow"
              >
                <button
                  class="button is-danger is-small is-light"
                  @click="form.accessControlList.splice(index, 1)"
                >
                  <octicon :icon="x" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          slot="footer"
          class="field is-grouped is-grouped-right"
        >
          <div class="control">
            <button
              v-if="formType === 'create'"
              class="button is-primary"
              @click.prevent="savePolicy"
            >
              {{ $l('global.add','Add') }}
            </button>

            <button
              v-if="formType === 'update'"
              class="button is-primary"
              @click.prevent="updatePolicy"
            >
              {{ $l('global.update','Update') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="showForm = false"
            >
              {{ $l('global.cancel','Cancel') }}
            </button>
          </div>
        </div>
      </box>
    </modal>
  </section>
</template>
<script>
import { DataTable, DataColumn, Modal } from '@cyradar/ui'
import { plus, x } from 'octicons-vue'
import vSelect from 'vue-select'
import GroupApi from '@/api/Group'
import AgentApi from '@/api/Agent'
import PolicyApi from '@/api/Policy'
import { mapGetters } from 'vuex'

export default {
  name: 'Policies',
  components: { DataTable, DataColumn, Modal, vSelect },
  data () {
    return {
      plus,
      x,
      showForm: false,
      formType: 'create',
      form: {
        name: '',
        desc: '',
        type: '',
        audience: [],
        accessControlList: []
      },
      selectedGroup: { name: 'None' },
      groupOptions: [],
      agentOptions: [],
      selectedAgents: [],
      ipOptions: [],
      isInitUpdateForm: false,
      isGeneralPolicy: true
    }
  },
  computed: {
    ...mapGetters([
      'currentLocale'
    ]),
    policyTypeOptions () {
      return [
        { label: this.$l('components.policies.blacklist', 'Blacklist'), value: 'blacklist' },
        { label: this.$l('components.policies.restriction', 'Password-Protected Uninstallation'), value: 'restriction' }
      ]
    },
    controlTypeOptions () {
      switch (this.form.type) {
        case 'restriction':
          return [{ name: this.$l('components.policies.password', 'Password'), value: 'password' }]
        default:
          return [
            { name: this.$l('components.policies.ip', 'IP'), value: 'ip' },
            { name: this.$l('components.policies.port', 'Port'), value: 'port' }
          ]
      }
    },
    isMultipleACL () {
      switch (this.form.type) {
        case 'restriction':
          return false
        default:
          return true
      }
    }
  },
  watch: {
    selectedGroup (val, oldVal) {
      if (this.isInitUpdateForm) {
        this.isInitUpdateForm = false
        return
      }
      if (val.name === 'All') {
        this.selectedAgents = this.agentOptions
        return
      }
      if (val.name === 'None') {
        this.selectedAgents = []
        return
      }
      this.selectedAgents = this.agentOptions.filter(e => val.agentMacs.includes(e.mac))
    },
    controlTypeOptions (val) {
      if (this.formType === 'update') {
        return
      }

      this.form.accessControlList = []
      if (val && val.length) {
        this.form.accessControlList.push({ controlType: val[0].value, controlEntry: '' })
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    addACE () {
      if (!this.controlTypeOptions || !this.controlTypeOptions.length) {
        return
      }
      this.form.accessControlList.push({ controlType: this.controlTypeOptions[0].value, controlEntry: '' })
    },
    switchPolicyAudType () {
      if (this.isGeneralPolicy) {
        this.isGeneralPolicy = false
        return
      }
      this.isGeneralPolicy = true
      this.selectedGroup = { name: 'None' }
      this.selectedAgents = []
    },
    calEntryPlaceholder (type) {
      switch (type) {
        case 'ip':
          return 'Exp: 192.168.1.1'
        case 'port':
          return 'Exp: 8080'
        case 'domain':
          return 'Exp: example.com'
      }
      return ''
    },
    formatListString (val) {
      if (!val || val.length === 0) {
        return ''
      }
      return val
    },
    showCreateForm () {
      this.formType = 'create'
      this.isGeneralPolicy = true

      this.form.name = ''
      this.form.desc = ''
      this.form.type = 'blacklist'
      this.form.audience = []
      this.form.accessControlList = []
      if (this.controlTypeOptions && this.controlTypeOptions.length) {
        this.form.accessControlList.push({ controlType: this.controlTypeOptions[0].value, controlEntry: '' })
      }
      this.selectedGroup = { name: 'None' }
      this.showForm = !this.showForm
    },
    showUpdateForm (props) {
      this.isInitUpdateForm = true
      this.formType = 'update'
      this.isGeneralPolicy = true
      if (props.item.audience.length > 0) {
        this.isGeneralPolicy = false
      }

      this.form = {
        _id: props.item._id,
        name: props.item.name,
        desc: props.item.desc,
        type: props.item.type,
        accessControlList: props.item.accessControlList
      }
      this.selectedGroup = { name: 'None' }
      this.selectedAgents = this.agentOptions.filter(e => props.item.audience.includes(e.mac))
      this.showForm = !this.showForm
    },
    savePolicy () {
      let content = {
        name: this.form.name,
        desc: this.form.desc,
        type: this.form.type,
        audience: this.selectedAgents.map(e => e.mac),
        accessControlList: this.form.accessControlList
      }
      PolicyApi.addPolicy(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.policyTable.loadItems()
          this.showForm = false
        })
    },
    updatePolicy () {
      let content = {
        _id: this.form._id,
        name: this.form.name,
        desc: this.form.desc,
        type: this.form.type,
        audience: this.selectedAgents.map(e => e.mac),
        accessControlList: this.form.accessControlList
      }
      PolicyApi.updatePolicy(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.policyTable.loadItems()
          this.showForm = false
        })
    },
    deletePolicy (props) {
      PolicyApi.deletePolicy(this.$http, props.item._id)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.policyTable.loadItems()
        })
    },
    policyListFunc (filtering, sorting, paging) {
      return PolicyApi.getPolicyVueTable(this.$http, filtering, sorting, paging)
        .then(res => res.data)
    },
    fetch () {
      this.fetchGroups()
      this.fetchAgents()
        .then(data => {
          this.agentOptions = data.items
        })
    },
    fetchGroups () {
      GroupApi.getGroupList(this.$http)
        .then(data => {
          let listGroup = data
          listGroup.unshift({ name: 'All' })
          listGroup.unshift({ name: 'None' })
          this.groupOptions = listGroup
        })
    },
    fetchAgents () {
      return AgentApi.getAgentVueTable(this.$http, null, null, null, { limit: 0 })
        .then(res => res.data)
    }
  }
}

</script>

<style src="vue-select/dist/vue-select.css"></style>
<style lang="scss" scoped>
.tags:last-child {
  margin-bottom: 0 !important;
}
</style>
