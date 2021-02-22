<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <box class="widget widget--gray">
          <div
            style="cursor: pointer;"
            @click="filterStr = 'low'"
          >
            <div class="has-text-centered">
              <p class="heading">
                {{ $l('components.threats.lowPriorityThreats','Low Priority Threats') }}
              </p>
              <p class="title">
                {{ count.priority.low }}
              </p>
            </div>
          </div>
        </box>
      </div>
      <div class="column">
        <box class="widget widget--yellow">
          <div
            style="cursor: pointer;"
            @click="filterStr = 'medium'"
          >
            <div class="has-text-centered">
              <p class="heading">
                {{ $l('components.threats.mediumPriorityThreats','Medium Priority Threats') }}
              </p>
              <p class="title">
                {{ count.priority.medium }}
              </p>
            </div>
          </div>
        </box>
      </div>
      <div class="column">
        <box class="widget widget--pink">
          <div
            style="cursor: pointer;"
            @click="filterStr = 'high'"
          >
            <div class="has-text-centered">
              <p class="heading">
                {{ $l('components.threats.highPriorityThreats','High Priority Threats') }}
              </p>
              <p class="title">
                {{ count.priority.high }}
              </p>
            </div>
          </div>
        </box>
      </div>
      <div class="column">
        <box class="widget widget--purple">
          <div
            style="cursor: pointer;"
            @click="filterStr = 'critical'"
          >
            <div class="has-text-centered">
              <p class="heading">
                {{ $l('components.threats.criticalThreats','Critical Threats') }}
              </p>
              <p class="title">
                {{ count.priority.critical }}
              </p>
            </div>
          </div>
        </box>
      </div>
    </div>

    <box>
      <div slot="header">
        {{ $l('components.threats.threatEvents','Threat Events') }}
      </div>

      <div class="columns">
        <div class="column is-half">
          <label class="label">{{ $l('components.threats.group','Group') }}</label>
          <v-select
            v-model="selectedGroup"
            :options="groupOptions"
            :clearable="false"
            label="name"
          />
        </div>
      </div>
      <!-- <data-table
        ref="eventsTable"
        :key="currentLocale"
        :items="eventListFunc"
        :per-page="10"
        :filter="filterStr"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          field="nameProcess"
          :label="$l('components.threats.processName','Process Name')"
        />
        <data-column
          field="priority"
          :label="$l('components.threats.priority','Priority')"
        />
        <data-column
          field="malwareName"
          :label="$l('components.threats.category','Category')"
        />
        <data-column
          field="time"
          :label="$l('components.threats.time','Time')"
          :render="formatDate"
        />
        <data-column
          field="agentInfo.computerName"
          :label="$l('components.threats.computerName','Computer Name')"
        >
          <template slot-scope="props">
            <div
              @mouseenter="showDetailComputer(true, props.item, $event)"
              @mouseleave="showDetailComputer(false, props.item, $event)"
            >
              <span class="tag is-primary is-light">{{ props.item.agentInfo.computerName }}</span>
            </div>
          </template>
        </data-column>
        <data-column
          :sortable="false"
          :label="$l('components.threats.action','Action')"
          width="10%"
        >
          <template slot-scope="props">
            <button
              class="button is-info mx-1 my-1 is-small is-light"
              @click.prevent="showDetail(props)"
            >
              {{ $l('global.detail','Detail') }}
            </button>
            <button
              v-if="props.item.sampleFile"
              class="button is-warning mx-1 my-1 is-small is-light"
              @click.prevent="downloadSample(props)"
            >
              <octicon
                :icon="arrowDown"
              />
              {{ $l('components.threats.sample','Sample') }}
            </button>
          </template>
        </data-column>
      </data-table> -->

      <data-table
        ref="eventsTable1"
        :key="currentLocale"
        :items="eventListFunc"
        :per-page="20"
        :filter="filterStr"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          field="nameProcess"
          :label="$l('components.threats.processName','Process Name')"
        />
        <data-column
          field="priority"
          :label="$l('components.threats.priority','Priority')"
        />
        <data-column
          field="malwareName"
          :label="$l('components.threats.category','Category')"
        />
        <data-column
          field="time"
          :label="$l('components.threats.time','Time')"
          :render="formatDate"
        />
        <data-column
          field="agentInfo.computerName"
          :label="$l('components.threats.computerName','Computer Name')"
        >
          <template slot-scope="props">
            <div
              @mouseenter="showDetailComputer(true, props.item, $event)"
              @mouseleave="showDetailComputer(false, props.item, $event)"
            >
              <span class="tag is-primary is-light">{{ props.item.agentInfo.computerName }}</span>
            </div>
          </template>
        </data-column>
        <data-column
          :sortable="false"
          :label="$l('components.threats.action','Action')"
          width="10%"
        >
          <template slot-scope="props">
            <button
              class="button is-info mx-1 my-1 is-small is-light"
              @click.prevent="showDetail(props)"
            >
              {{ $l('global.detail','Detail') }}
            </button>
            <button
              v-if="props.item.sampleFile"
              class="button is-warning mx-1 my-1 is-small is-light"
              @click.prevent="downloadSample(props)"
            >
              <octicon
                :icon="arrowDown"
              />
              {{ $l('components.threats.sample','Sample') }}
            </button>
          </template>
        </data-column>
      </data-table>

      <div v-if="items">
        <timeline
          :items="items"
          :options="options"
        />
      </div>
    </box>

    <modal
      content-width="60vw"
      :show.sync="showModal"
    >
      <box>
        <div slot="header">
          {{ $l('components.threats.activityDetail','Activity Detail') }}
        </div>

        <tabs :theme="$_ui_theme_tabs">
          <tab :title="$l('global.detail','Detail')">
            <div
              class="columns"
            >
              <div class="column is-two-thirds">
                <box style="height: 100%;">
                  <div slot="header">
                    {{ $l('components.threats.processTree','Process Tree') }}
                  </div>
                  <div>
                    <tree-view
                      :key="procTimestamp"
                      :model="processTree"
                      label="nameProcess"
                      track-by="processID"
                      :selection.sync="detailProcess"
                    />
                  </div>
                </box>
              </div>
              <div class="column is-one-third">
                <box style="height: 100%;">
                  <div slot="header">
                    {{ $l('components.threats.processInfo','Process Info') }}
                  </div>
                  <div class="process-detail">
                    <div class="field">
                      <label class="label">
                        {{ $l('components.threats.name','Name') }}
                      </label>
                      <span>
                        {{ detailProcess.nameProcess }}&nbsp;
                      </span>
                    </div>
                    <div class="field">
                      <label class="label">
                        {{ $l('components.threats.path','Path') }}
                      </label>
                      <span>
                        {{ detailProcess.pathProcess }}&nbsp;
                      </span>
                    </div>
                    <div class="field">
                      <label class="label">
                        {{ $l('components.threats.pid','PID') }}
                      </label>
                      <span>
                        {{ detailProcess.processID }}&nbsp;
                      </span>
                    </div>
                    <div class="field">
                      <label class="label">
                        {{ $l('components.threats.parentPID','Parent PID') }}
                      </label>
                      <span>
                        {{ detailProcess.parentPID }}&nbsp;
                      </span>
                    </div>
                    <div class="field">
                      <label class="label">
                        {{ $l('components.threats.time','Time') }}
                      </label>
                      <span>
                        {{ detailProcess.time }}&nbsp;
                      </span>
                    </div>
                    <div class="field">
                      <label class="label">
                        {{ $l('components.threats.user','User') }}
                      </label>
                      <span>
                        {{ detailProcess.user }}&nbsp;
                      </span>
                    </div>
                  </div>
                </box>
              </div>
            </div>
          </tab>
          <tab title="JSON">
            <snippet
              language="json"
              :code="SanitizeObject(detailProcess)"
              style="max-height: 500px; margin: 0;"
            />
          </tab>
        </tabs>
      </box>
    </modal>
    <box
      ref="boxDetailComputer"
      class="detail-computer"
      :style="{ ...floatBox, width: '30%' }"
    >
      <div
        v-if="detailComputer.computerName"
        slot="header"
      >
        {{ detailComputer.computerName }}
      </div>
      <div class="columns is-multiline">
        <div class="column is-6">
          <label class="label">{{ $l('components.agents.ip','IP') }}</label>
          <span>{{ detailComputer.agentIP }}</span>
        </div>
        <div class="column is-6">
          <label class="label">{{ $l('components.agents.localIP','Local IP') }}</label>
          <span>{{ detailComputer.ip }}</span>
        </div>

        <div class="column is-6">
          <label class="label">{{ $l('components.agents.operatingSystem','Operating System') }}</label>
          <span>{{ detailComputer.os }}</span>
        </div>
        <div class="column is-6">
          <label class="label">{{ $l('components.agents.agentVersion','Agent Version') }}</label>
          <span
            v-if="detailComputer.uninstalled"
            class="tag is-danger"
          >
            {{ $l('components.agents.removed','Removed') }}
          </span>
          <span v-else>
            {{ detailComputer.version }}
          </span>
        </div>

        <div class="column is-6">
          <label class="label">{{ $l('components.agents.installTime','Install Time') }}</label>
          <span>{{ formatDate(detailComputer.timeInstall) }}</span>
        </div>
        <div class="column is-6">
          <label class="label">{{ $l('components.agents.lastConnection','Last Connection') }}</label>
          <span>{{ formatDate(detailComputer.lastConnection) }}</span>
        </div>
      </div>
    </box>
  </section>
</template>
<script>
import { DataTable, DataColumn, Modal, Tabs, Tab, Snippet } from '@cyradar/ui'
import Octicon, { arrowDown } from 'octicons-vue'
import { SanitizeObject } from '@/utils'
import vSelect from 'vue-select'
import TreeView from 'components/TreeView2'
import Format from 'date-fns/format'
import AddYears from 'date-fns/add_years'
import GroupApi from '@/api/Group'
import EventApi from '@/api/Event'
import { mapGetters } from 'vuex'
import Timeline from '../components/TimeLine'
import axios from 'axios'

export default {
  name: 'Threats',
  components: { Timeline, DataTable, DataColumn, TreeView, Modal, Tabs, Tab, vSelect, Octicon, Snippet },
  data () {
    return {
      SanitizeObject: SanitizeObject,
      detailProcess: {},
      processTree: {},
      procTimestamp: (new Date()).toISOString(),
      count: {
        priority: {
          low: 0,
          medium: 0,
          high: 0,
          critical: 0
        }
      },
      filterStr: '',
      selectedGroup: { name: 'All', agentMacs: [] },
      groupOptions: [],
      showModal: false,
      arrowDown,
      detailComputer: {},
      floatBox: {
        left: 0,
        top: '100%'
      },
      items: [
        // { id: 1, content: 'DESKTOP-I4LH4UE', start: '2021-01-20' },
        // { id: 2, content: 'PHONGQUANLYKHOA', start: '2021-01-14' },
        // { id: 3, content: 'PC2017082816YET', start: '2021-01-18' },
        // { id: 4, content: 'MAY05', start: '2021-01-16' },
        // { id: 5, content: 'HUNGLAPTOP', start: '2021-01-25' },
        // { id: 6, content: 'item 6', start: '2020-10-27', type: 'point' }
      ],
      options: {},
      dataTimeline: [
        { '_id': '5fe59dfd3e66d642036b8c94', 'agentIP': '127.0.0.1', 'agentIPInt': 2130706433, 'agentInfo': { 'agentIP': '127.0.0.1', 'agentIPInt': 2130706433, 'autoProtect': false, 'computerName': 'DESKTOP-I4LH4UE', 'contact': '', 'enableFirewall': false, 'groupKey': '6X6K9KM2', 'ip': '192.168.1.173', 'lastConnection': '2020-12-25T15:08:08.154+07:00', 'lastUpdate': '0001-01-01T00:00:00Z', 'mac': '10:62:e5:07:f9:02', 'macNetwork': '10:62:e5:07:f9:02', 'os': 'Ubuntu 18.04.4 LTS', 'status': 0, 'timeInstall': '2020-10-27T11:50:41.963+07:00', 'uninstalled': false, 'username': ['root', 'daemon', 'bin', 'sys', 'sync', 'games', 'man', 'lp', 'mail', 'news', 'uucp', 'proxy', 'www-data', 'backup', 'list', 'irc', 'gnats', 'nobody', 'systemd-network', 'systemd-resolve', 'syslog', 'messagebus', '_apt', 'uuidd', 'avahi-autoipd', 'usbmux', 'dnsmasq', 'rtkit', 'speech-dispatcher', 'whoopsie', 'kernoops', 'saned', 'pulse', 'avahi', 'colord', 'hplip', 'geoclue', 'gnome-initial-setup', 'gdm', 'thanhnv', 'cups-pk-helper', 'sshd', 'mysql', 'redis', 'mongodb', 'elasticsearch', 'glances', 'statd', 'libvirt-dnsmasq', 'vnstat', 'nx', 'nvidia-persistenced', 'openvpn'], 'version': '1.0.0.1', 'vulnerabilities': [] }, 'backupDirectory': '/home/thanhnv/go/src/git.cyradar.com/X/cyedr-agenix/cmd/agenix/_backup/61e996f0d50f5f49ab9d7b42ad977c1a.zip', 'category': 'heuristic', 'cmd': '', 'createdAt': '2020-12-25T15:08:29.139+07:00', 'malwareName': 'HEUR/AGEN.1100230', 'md5': '61e996f0d50f5f49ab9d7b42ad977c1a', 'nameProcess': 'sys.elf', 'parentPID': '-1', 'pathProcess': '/home/thanhnv/Downloads/eicar/sys.elf', 'priority': 'high', 'processID': '-1', 'registryKey': '', 'sampleFile': '', 'taskSchedule': '', 'time': '2020-12-24T15:08:29.016+07:00', 'type': '', 'user': 'root' },
        { '_id': '5fe59cf23e66d642036b8c92', 'agentIP': '127.0.0.1', 'agentIPInt': 2130706433, 'agentInfo': { 'agentIP': '127.0.0.1', 'agentIPInt': 2130706433, 'autoProtect': false, 'computerName': 'thanhnv-desktop', 'contact': '', 'enableFirewall': false, 'groupKey': '6X6K9KM2', 'ip': '192.168.1.173', 'lastConnection': '2020-12-25T15:03:36.771+07:00', 'lastUpdate': '0001-01-01T00:00:00Z', 'mac': '10:62:e5:07:f9:02', 'macNetwork': '10:62:e5:07:f9:02', 'os': 'Ubuntu 18.04.4 LTS', 'status': 0, 'timeInstall': '2020-10-27T11:50:41.963+07:00', 'uninstalled': false, 'username': ['root', 'daemon', 'bin', 'sys', 'sync', 'games', 'man', 'lp', 'mail', 'news', 'uucp', 'proxy', 'www-data', 'backup', 'list', 'irc', 'gnats', 'nobody', 'systemd-network', 'systemd-resolve', 'syslog', 'messagebus', '_apt', 'uuidd', 'avahi-autoipd', 'usbmux', 'dnsmasq', 'rtkit', 'speech-dispatcher', 'whoopsie', 'kernoops', 'saned', 'pulse', 'avahi', 'colord', 'hplip', 'geoclue', 'gnome-initial-setup', 'gdm', 'thanhnv', 'cups-pk-helper', 'sshd', 'mysql', 'redis', 'mongodb', 'elasticsearch', 'glances', 'statd', 'libvirt-dnsmasq', 'vnstat', 'nx', 'nvidia-persistenced', 'openvpn'], 'version': '1.0.0.1', 'vulnerabilities': [] }, 'backupDirectory': '/home/thanhnv/go/src/git.cyradar.com/X/cyedr-agenix/cmd/agenix/_backup/61e996f0d50f5f49ab9d7b42ad977c1a.zip', 'category': 'heuristic', 'cmd': '', 'createdAt': '2020-12-25T15:04:02.153+07:00', 'malwareName': 'HEUR/AGEN.1100230', 'md5': '61e996f0d50f5f49ab9d7b42ad977c1a', 'nameProcess': 'SysUpdate.exe2', 'parentPID': '-1', 'pathProcess': '/home/thanhnv/Downloads/eicar/SysUpdate.exe2', 'priority': 'high', 'processID': '-1', 'registryKey': '', 'sampleFile': '', 'taskSchedule': '', 'time': '2019-12-25T15:04:01.616+07:00', 'type': '', 'user': 'root' }]
    }
  },
  computed: {
    ...mapGetters([
      'currentLocale'
    ]),
    selectedAgentMacs () {
      if (this.selectedGroup.name !== 'All' && this.selectedGroup.agentMacs.length === 0) {
        return ['']
      }
      return this.selectedGroup.agentMacs
    },
    filterQuery () {
      return this.$route.query.filter
    }
  },
  watch: {
    selectedGroup (val, oldVal) {
      this.$refs.eventsTable.loadItems()
      this.fetchEventPriorityFrequency()
    },
    filterQuery (val, oldVal) {
      this.setFilter(val)
    }
  },
  mounted () {
    this.fetchEventPriorityFrequency()
    this.fetchGroups()
    this.setFilter(this.$route.query.filter)
    this.getEvent()
    console.log('moun', this.items)
  },
  methods: {
    convertToTreeModel (process) {
      if (process.parent) {
        let child = process
        let parent = process.parent
        delete child.parent
        parent.children = [child]
        return this.convertToTreeModel(parent)
      }
      return process
    },
    setFilter (str) {
      if (!str) {
        return
      }
      this.filterStr = str
    },
    formatDate (val) {
      return Format(val, 'YYYY-MM-DD HH:mm:ss')
    },
    showDetail (props) {
      this.showModal = true
      this.detailProcess = Object.assign({}, props.item)
      this.detailProcess.time = this.detailProcess.$_time
      delete this.detailProcess.$_time
      this.processTree = this.convertToTreeModel(this.detailProcess)
      this.procTimestamp = (new Date()).toISOString()
    },
    downloadSample (props) {
      EventApi.getEventSample(this.$http, props.item.sampleFile)
        .then((response) => {
          let blob = new Blob([response.data], { type: 'application/zip' })
          let link = document.createElement('a')
          document.body.appendChild(link)
          link.href = window.URL.createObjectURL(blob)
          link.download = props.item.sampleFile
          link.click()
          document.body.removeChild(link)
        })
    },
    fetchGroups () {
      GroupApi.getGroupList(this.$http)
        .then(data => {
          let listGroup = data
          listGroup.unshift({ name: 'All', agentMacs: [] })
          this.groupOptions = listGroup
        })
    },
    fetchEventPriorityFrequency () {
      EventApi.getEventFrequency(this.$http, {
        startDate: new Date(0).toISOString(),
        endDate: AddYears(new Date(), 1).toISOString(),
        kind: 'priority',
        agentMacs: this.selectedAgentMacs
      })
        .then(res => res.data)
        .then(data => data.map(e => { return { [e.label]: e.data } }))
        .then(data => {
          if (data.length < 1) {
            return {}
          }
          return Object.assign(...data)
        })
        .then(data => {
          Object.keys(this.count.priority).forEach(key => {
            if (!data[key]) {
              this.count.priority[key] = 0
              return
            }
            this.count.priority[key] = data[key]
          })
        })
    },
    eventListFunc (filtering, sorting, paging) {
      // return EventApi.getEventVueTable(this.$http, filtering, sorting, paging, { agentMacs: this.selectedAgentMacs })
      //   .then(res => {
      //     return res.data
      //   })
      return axios.get(`https://60331870a223790017acfaf5.mockapi.io/api/v1/threat/threat?md5=61e996f0d50f5f49ab9d7b42ad977c1a`)
        .then(res => { return res.data })
        .catch(err => { console.log(err) })
    },
    showDetailComputer (val, data, e) {
      let boxHeight = this.$refs.boxDetailComputer.$el.clientHeight
      let boxWidth = this.$refs.boxDetailComputer.$el.clientWidth
      const el = e.target.getBoundingClientRect()
      let boxLeft = el.left - boxWidth - 15
      let boxTop = el.top
      if (boxTop + boxHeight > window.innerHeight) {
        boxTop = el.top - boxHeight + 15
      }
      this.floatBox = {
        left: boxLeft + 'px',
        top: boxTop + 'px',
        opacity: val ? '1' : '0'
      }

      this.detailComputer = data.agentInfo
    },
    getEvent () {
      axios.get(`https://60331870a223790017acfaf5.mockapi.io/api/v1/threat/threat?md5=61e996f0d50f5f49ab9d7b42ad977c1a`)
        .then(res => {
          for (let i = 0; i < res.data.items.length; i++) {
            this.items.push({
              'id': res.data.items[i].id,
              'content': res.data.items[i].agentInfo.computerName,
              'start': res.data.items[i].time
            })
          }
          return this.items
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style src="vue-select/dist/vue-select.css"></style>
<style lang="scss">
.process-detail {
  height: 100%;
  overflow-x: scroll;
  white-space: nowrap;
}
.detail-computer {
  margin: 0;
  position: fixed;
  opacity: 0;
  overflow:hidden;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
  transition: opacity 0.3s linear;
}
</style>
