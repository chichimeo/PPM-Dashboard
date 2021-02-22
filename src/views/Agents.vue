<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <box>
          <div slot="header">
            <div class="columns is-vcentered">
              <div class="column">
                {{ $l('components.agents.agents','Agents') }}
              </div>
              <div class="column is-narrow">
                <button
                  v-if="selectedGroup.computedAgentMacs && selectedGroup.computedAgentMacs.length"
                  class="button is-primary is-small"
                  @click.prevent="showCommandGroup"
                >
                  {{ $l('components.agents.command','Command') }}
                </button>
              </div>
            </div>
          </div>
          <div @mousemove="onMouseMove($event)">
            <data-table
              ref="agentsTable"
              :key="currentLocale"
              :items="agentListFunc"
              :per-page="10"
              :sort-desc="true"
              :row-hover="onRowHover"
              :theme="$_ui_theme_tables"
            >
              <data-column
                field="computerName"
                :label="$l('components.agents.computerName','Computer Name')"
              >
                <template slot-scope="props">
                  <div>
                    {{ props.item.computerName }}
                  </div>
                </template>
              </data-column>
              <data-column
                field="agentIP"
                :label="$l('components.agents.ip','IP')"
              />
              <data-column
                field="os"
                :label="$l('components.agents.operatingSystem','Operating System')"
              />
              <data-column
                field="version"
                :label="$l('components.agents.agentVersion','Agent Version')"
              >
                <template slot-scope="props">
                  <div>
                    <span
                      v-if="props.item.uninstalled"
                      class="tag is-danger"
                    >
                      {{ $l('components.agents.removed','Removed') }}
                    </span>
                    <span
                      v-else-if="checkOutdatedAgent(props.item)"
                      class="tag is-danger"
                    >
                      {{ props.item.version }}
                    </span>
                    <span
                      v-else
                      class="tag"
                    >
                      {{ props.item.version }}
                    </span>
                  </div>
                </template>
              </data-column>
              <data-column
                :sortable="false"
                :label="$l('components.agents.action','Action')"
                width="15%"
              >
                <template slot-scope="props">
                  <div
                    @mouseenter="triggerFloatBox(false)"
                    @mouseleave="triggerFloatBox(true)"
                  >
                    <button
                      class="button is-primary mx-1 my-1 is-small is-light"
                      @click.prevent="showEdit(props)"
                    >
                      {{ $l('global.edit','Edit') }}
                    </button>
                    <button
                      class="button is-primary mx-1 my-1 is-small is-light"
                      @click.prevent="showCommand(props)"
                    >
                      {{ $l('components.agents.command','Command') }}
                    </button>
                    <button
                      class="button is-info mx-1 my-1 is-small is-light"
                      @click.prevent="showDetail(props)"
                    >
                      {{ $l('global.detail','Detail') }}
                    </button>
                  </div>
                </template>
              </data-column>
            </data-table>

            <transition name="fade">
              <box
                v-show="showFloatBox"
                ref="floatBoxDetail"
                class="float-box"
                :style="{ ...floatBox, width: '30%' }"
              >
                <div
                  v-if="detailAgent.computerName"
                  slot="header"
                >
                  {{ detailAgent.computerName }}
                </div>
                <div class="columns is-multiline">
                  <div class="column is-6">
                    <label class="label">{{ $l('components.agents.ip','IP') }}</label>
                    <span>{{ detailAgent.agentIP }}</span>
                  </div>
                  <div class="column is-6">
                    <label class="label">{{ $l('components.agents.localIP','Local IP') }}</label>
                    <span>{{ detailAgent.ip }}</span>
                  </div>

                  <div class="column is-6">
                    <label class="label">{{ $l('components.agents.operatingSystem','Operating System') }}</label>
                    <span>{{ detailAgent.os }}</span>
                  </div>
                  <div class="column is-6">
                    <label class="label">{{ $l('components.agents.agentVersion','Agent Version') }}</label>
                    <span
                      v-if="detailAgent.uninstalled"
                      class="tag is-danger"
                    >
                      {{ $l('components.agents.removed','Removed') }}
                    </span>
                    <span
                      v-else-if="checkOutdatedAgent(detailAgent)"
                      class="tag is-danger"
                    >
                      {{ detailAgent.version }}
                    </span>
                    <span v-else>
                      {{ detailAgent.version }}
                    </span>
                  </div>

                  <div class="column is-6">
                    <label class="label">{{ $l('components.agents.installTime','Install Time') }}</label>
                    <span>{{ formatDate(detailAgent.timeInstall) }}</span>
                  </div>
                  <div class="column is-6">
                    <label class="label">{{ $l('components.agents.lastConnection','Last Connection') }}</label>
                    <span>{{ formatDate(detailAgent.lastConnection) }}</span>
                  </div>

                  <div class="column is-6">
                    <label class="label">{{ $l('components.agents.vulnerabilities','Vulnerabilities') }}</label>
                    <span>{{ (detailAgent.vulnerabilities ? detailAgent.vulnerabilities.join(', ') : '&nbsp;') || '&nbsp;' }}</span>
                  </div>
                </div>
              </box>
            </transition>
          </div>
        </box>
      </div>
    </div>

    <modal :show.sync="showEditModal">
      <box>
        <div slot="header">
          {{ $l('components.agents.agentDetail','Agent Detail') }}
        </div>
        <tabs :theme="$_ui_theme_tabs">
          <tab :title="$l('components.agents.group','Group')">
            <div class="control">
              <v-select
                v-model="detailAgentGroup"
                multiple
                append-to-body
                label="name"
                :options="groupOptions.filter(e => e._id)"
              />
            </div>
          </tab>
        </tabs>

        <div
          slot="footer"
          class="field is-grouped is-grouped-right"
        >
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="updateAgentGroups"
            >
              {{ $l('global.update','Update') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-primary"
              @click.prevent="showEditModal = false"
            >
              {{ $l('global.cancel','Cancel') }}
            </button>
          </div>
        </div>
      </box>
    </modal>

    <modal
      content-width="60vw"
      :show.sync="showCommandModal"
    >
      <box>
        <div slot="header">
          {{ $l('components.agents.command','Command') }}  {{ (command.audience && command.audience.length>1) ? $l('components.agents.group','Group') : '' }}
        </div>

        <div
          style="margin: auto; width: 80%;"
          class="mb-3"
        >
          <div class="field">
            <label class="label"> {{ $l('components.agents.commandType','Command Type') }} </label>
            <div class="control">
              <v-select
                v-model="command.type"
                append-to-body
                :clearable="false"
                :options="['scan']"
              />
            </div>
          </div>
          <div
            v-if="command.type === 'scan'"
            class="field"
          >
            <label class="label">{{ $l('components.agents.path','Path') }} </label>
            <div class="control">
              <input
                v-model="command.payload.path"
                class="input"
                type="text"
                placeholder="D:\Download\abc.exe"
              >
            </div>
          </div>
        </div>

        <tabs
          v-if="pendingCommands && pendingCommands.length"
          :theme="$_ui_theme_tabs"
        >
          <tab :title="$l('components.agents.pendingCommands','Pending Commands')">
            <data-table
              ref="commandsTable"
              :key="currentLocale"
              :items="pendingCommands"
              :per-page="5"
              :disable-filtering="true"
              :theme="$_ui_theme_tables"
            >
              <data-column
                field="type"
                :sortable="false"
                :label="$l('components.agents.commandType','Command Type')"
              />
              <data-column
                field="payload"
                :sortable="false"
                :label="$l('components.agents.payload','Payload')"
              >
                <template slot-scope="props">
                  <div
                    v-for="(value, key) in props.item.payload"
                    :key="key"
                    class="tags has-addons mb-1"
                  >
                    <span class="tag is-primary mb-0">{{ key }}</span>
                    <span class="tag is-info mb-0">{{ value }}</span>
                  </div>
                </template>
              </data-column>
              <data-column
                field="createdAt"
                :sortable="false"
                :render="formatDate"
                :label="$l('components.agents.time','Time')"
              />
            </data-table>
          </tab>
        </tabs>

        <div slot="footer">
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button
                class="button is-info"
                @click.prevent="saveCommand"
              >
                {{ $l('global.send','Send') }}
              </button>
            </div>
            <div class="control">
              <button
                class="button is-primary"
                @click.prevent="showCommandModal = false"
              >
                {{ $l('global.cancel','Cancel') }}
              </button>
            </div>
          </div>
        </div>
      </box>
    </modal>

    <modal :show.sync="showModal">
      <box>
        <div slot="header">
          {{ $l('components.agents.agentDetail','Agent Detail') }}
        </div>

        <div>
          <tabs :theme="$_ui_theme_tabs">
            <tab :title="$l('global.detail','Detail')">
              <agent-detail
                :detail-agent="detailAgent"
                :outdated="checkOutdatedAgent(detailAgent)"
              />
            </tab>
            <tab :title="$l('components.agents.Json','Json')">
              <snippet
                language="json"
                :code="SanitizeObject(detailAgent)"
              />
            </tab>
          </tabs>
        </div>
      </box>
    </modal>
  </section>
</template>
<script>
import { DataTable, DataColumn, Modal, Snippet, Tabs, Tab } from '@cyradar/ui'
import { SanitizeObject } from '@/utils'
import vSelect from 'vue-select'
import Format from 'date-fns/format'
import AddDays from 'date-fns/add_days'
import IsAfter from 'date-fns/is_after'
import GroupApi from '@/api/Group'
import AgentApi from '@/api/Agent'
import { mapGetters } from 'vuex'
import AgentDetail from '../components/AgentDetail'

export default {
  name: 'Agents',
  components: { DataTable, DataColumn, Modal, Tabs, Tab, Snippet, vSelect, AgentDetail },
  data () {
    return {
      SanitizeObject: SanitizeObject,
      showModal: false,
      showEditModal: false,
      showCommandModal: false,
      detailAgent: {},
      detailAgentGroup: [],
      selectedGroup: { name: 'All', computedAgentMacs: [], _id: '' },
      groupOptions: [],
      listAgentVersion: [],
      latestAgentVersion: {},
      showFloatBox: false,
      floatBox: {
        left: 0,
        top: 0
      },
      command: {
        type: 'scan',
        audience: [],
        payload: { path: '' }
      },
      pendingCommands: []
    }
  },
  computed: {
    paramGroupID () {
      let params = this.$route.path.split('/')
      if (params.length < 3) {
        return ''
      }
      return params[2]
    },
    selectedAgentMacs () {
      if (this.selectedGroup.name !== 'All' && this.selectedGroup.computedAgentMacs.length === 0) {
        return ['']
      }
      return this.selectedGroup.computedAgentMacs
    },
    ...mapGetters([
      'currentLocale'
    ])
  },

  watch: {
    selectedGroup (val, oldVal) {
      this.$refs.agentsTable.loadItems()
    },
    paramGroupID (val) {
      let g = this.groupOptions.find(e => e._id === val)
      if (g) {
        this.selectedGroup = g
      }
    }
  },
  mounted () {
    this.fetchGroups()
      .then(groupList => {
        let g = this.groupOptions.find(e => e._id === this.paramGroupID)
        if (g) {
          this.selectedGroup = g
        }
      })
    this.fetchLatestAgentVersion()
    this.fetchListAgentVersion()
  },
  methods: {
    showCommand (props) {
      this.command = {
        type: 'scan',
        audience: [props.item.mac],
        payload: { path: '' }
      }
      this.showCommandModal = true
      this.commandListFunc()
        .then(data => {
          this.pendingCommands = data.items
        })
    },
    showCommandGroup () {
      this.command = {
        type: 'scan',
        audience: this.selectedGroup.computedAgentMacs,
        payload: { path: '' }
      }
      this.showCommandModal = true
      this.commandListFunc()
        .then(data => {
          this.pendingCommands = data.items
        })
    },
    saveCommand () {
      if (!this.command.type) {
        return
      }

      let content = {
        type: this.command.type,
        audience: this.command.audience,
        payload: this.command.type === 'scan' ? this.command.payload : null
      }

      AgentApi.sendCommand(this.$http, content)
        .then(data => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: data.message,
            duration: 10000
          })
          this.command = {
            type: 'scan',
            audience: [],
            payload: { path: '' }
          }
        })
      this.showCommandModal = false
    },
    formatListString (val) {
      if (!val || val.length === 0) {
        return ''
      }
      return val.join(', ')
    },
    formatDate (val) {
      if (!val) {
        return ''
      }
      return Format(val, 'YYYY-MM-DD HH:mm')
    },
    checkOutdatedAgent (agent) {
      if (!agent.version || agent.version === this.latestAgentVersion.version) {
        return false
      }

      for (let i = 0; i < this.listAgentVersion.length; i++) {
        let item = this.listAgentVersion[i]
        if (item.version === agent.version) {
          let currentVerDate = Date.parse(item.publishedAt)
          if (IsAfter(new Date(), AddDays(currentVerDate, 15))) {
            return true
          }
          return false
        }
      }
      return true
    },
    fetchGroups () {
      return GroupApi.getGroupList(this.$http)
        .then(data => {
          data.map(g => {
            g.computedAgentMacs = g.agentMacs
            if (g.childAgentMacs) {
              g.computedAgentMacs = g.computedAgentMacs.concat(g.childAgentMacs)
            }
            return g
          })
          return data
        })
        .then(data => {
          let listGroup = JSON.parse(JSON.stringify(data))
          listGroup.unshift({ name: 'All', agentMacs: [], _id: '' })
          this.groupOptions = listGroup
          return data
        })
    },
    fetchListAgentVersion () {
      AgentApi.getListVersion(this.$http)
        .then(data => {
          this.listAgentVersion = data
        })
    },
    fetchLatestAgentVersion () {
      AgentApi.getLatestVersion(this.$http)
        .then(data => {
          this.latestAgentVersion = data
        })
    },
    agentListFunc (filtering, sorting, paging) {
      return AgentApi.getAgentVueTable(this.$http, filtering, sorting, paging, { agentMacs: this.selectedAgentMacs })
        .then(res => res.data)
    },
    commandListFunc (filtering, sorting, paging) {
      return AgentApi.getCommandsVueTable(this.$http, filtering, sorting, paging, { audience: this.command.audience })
        .then(res => res.data)
    },
    updateAgentGroups () {
      let payload = {
        actions: 'add-groups',
        agentMac: this.detailAgent.mac,
        groups: this.detailAgentGroup.filter(e => e._id).map(e => e._id)
      }
      AgentApi.updateAgent(this.$http, payload)
        .then(data => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: data.message,
            duration: 10000
          })
          this.fetchGroups()
          this.showEditModal = false
        })
    },
    showEdit (props) {
      this.detailAgent = Object.assign({}, props.item)

      this.detailAgentGroup = this.groupOptions.filter(g => {
        if (!g.agentMacs || g.agentMacs.length === 0) {
          return false
        }
        return g.agentMacs.includes(this.detailAgent.mac)
      })
      this.showEditModal = true
    },
    showDetail (props) {
      this.showModal = true
      this.detailAgent = Object.assign({}, props.item)
    },
    triggerFloatBox: debounce(function (val) {
      this.showFloatBox = val
    }, 100),
    onRowHover (event, data, index) {
      if (event.type === 'mouseleave') {
        this.triggerFloatBox(false)
        return
      }
      this.detailAgent = data
      this.triggerFloatBox(true)
    },
    onMouseMove (e) {
      if (!this.$refs.floatBoxDetail || !this.$refs.floatBoxDetail.$el) {
        return
      }

      let boxHeight = this.$refs.floatBoxDetail.$el.clientHeight
      let boxWidth = this.$refs.floatBoxDetail.$el.clientWidth
      let boxLeft = e.clientX + 15
      let boxTop = e.clientY + 15

      // Calculate top position
      if (e.clientY > (window.innerHeight * 0.5)) {
        boxTop = e.clientY - boxHeight - 15

        if (window.innerHeight - e.clientY + boxHeight > window.innerHeight) {
          boxTop = 0
        }
      }

      if (boxTop + boxHeight > window.innerHeight) {
        boxTop = window.innerHeight - boxHeight
      }

      // Calculate left position
      if (e.clientX > (window.innerWidth * 0.7)) {
        boxLeft = e.clientX - boxWidth - 15

        if (window.innerWidth - e.clientX + boxWidth > window.innerWidth) {
          boxLeft = 0
        }
      }

      if (boxLeft + boxWidth > window.innerWidth) {
        boxLeft = window.innerWidth - boxWidth
      }

      this.floatBox = {
        left: boxLeft + 'px',
        top: boxTop + 'px'
      }
    }
  }
}

function debounce (func, wait) {
  let timeout

  return function () {
    let context = this
    let args = arguments

    let executeFunction = function () {
      func.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(executeFunction, wait)
  }
}
</script>

<style src="vue-select/dist/vue-select.css"></style>
<style lang="scss">
.float-box {
  margin: 0;
  position: fixed;
  z-index: 1000;
  overflow:hidden;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
}
</style>
