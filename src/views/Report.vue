<template>
  <section class="section">
    <box>
      <div slot="header">
        {{ $l('components.report.reportExport','Report Export') }}
      </div>

      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.report.group','Group') }}</label>
            <div class="control">
              <v-select
                v-model="selectedGroup"
                :options="groupOptions"
                label="name"
                :clearable="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.report.timeRange','Time Range') }}</label>
            <div class="control">
              <date-picker
                :value.sync="dateRange"
                range
              />
            </div>
          </div>
        </div>

        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.report.reportType','Report Type') }}</label>
            <div class="control">
              <v-select
                v-model="reportType"
                :options="['PDF', 'XML']"
                :clearable="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.report.users','Users') }}</label>
            <div class="control">
              <v-select
                v-model="form.clients"
                :options="userOptions"
                multiple
                taggable
              />
            </div>
          </div>
        </div>

        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.report.maliciousHosts','Malicious Hosts') }}</label>
            <div class="control">
              <v-select
                v-model="form.maliciousHosts"
                :options="hostOptions"
                :close-on-select="false"
                multiple
                taggable
              />
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.report.priorities','Priorities') }}</label>
            <div class="control">
              <v-select
                v-model="form.priorities"
                :options="priorityOptions"
                :close-on-select="false"
                multiple
                taggable
              />
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">{{ $l('components.report.categories','Categories') }}</label>
            <div class="control">
              <v-select
                v-model="form.categories"
                :options="categoryOptions"
                :close-on-select="false"
                multiple
                taggable
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="reportType == 'PDF'">
          <button
            class="button is-info"
            type="button"
            @click.prevent="previewPDFReport"
          >
            {{ $l('components.report.preview','Preview') }}
          </button>
          <button
            class="button is-primary"
            style="margin-left:.5rem;"
            type="button"
            @click.prevent="downloadPDFReport"
          >
            {{ $l('global.download','Download') }}
          </button>
        </div>

        <div v-if="reportType == 'XML'">
          <button
            class="button is-info"
            type="button"
            @click.prevent="previewXMLReport"
          >
            {{ $l('components.report.preview','Preview') }}
          </button>
          <button
            class="button is-primary"
            style="margin-left:.5rem;"
            type="button"
            @click.prevent="showConfigModal"
          >
            {{ $l('global.submit','Submit') }}
          </button>
        </div>
      </div>
    </box>

    <modal
      content-width="60vw"
      :show.sync="showConfig"
    >
      <box>
        <div slot="header">
          {{ $l('components.report.confirmation','Confirmation') }}
        </div>
        <div>
          <tabs :theme="$_ui_theme_tabs">
            <tab :title="$l('components.configurationInfo.organizationInfo','Organization Info')">
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.organizationID','Organization ID') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.organization.id"
                        type="text"
                        class="input"
                        placeholder="Organization ID"
                      >
                    </div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.organizationName','Organization Name') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.organization.name"
                        type="text"
                        class="input"
                        placeholder="Organization Name"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.organizationAddress','Organization Address') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.organization.address"
                        type="text"
                        class="input"
                        placeholder="Organization Address"
                      >
                    </div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.email','Email') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.organization.email"
                        type="text"
                        class="input"
                        placeholder="Email"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.telephone','Telephone') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.organization.telephone"
                        type="text"
                        class="input"
                        placeholder="Telephone"
                      >
                    </div>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.fax','Fax') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.organization.fax"
                        type="text"
                        class="input"
                        placeholder="Fax"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.website','Website') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.organization.website"
                        type="text"
                        class="input"
                        placeholder="Website"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </tab>
          </tabs>
          <tabs :theme="$_ui_theme_tabs">
            <tab :title="$l('components.configurationInfo.endpoint','Endpoint')">
              <div class="cloumns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">{{ $l('components.report.reportEndpoint','Report Endpoint') }}</label>
                    <div class="control">
                      <input
                        v-model="formConfig.envelopeEndpoint"
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
        </div>

        <div
          slot="footer"
          class="field is-grouped is-grouped-right"
        >
          <div class="control">
            <button
              class="button is-primary"
              @click.prevent="confirmAndSumbit"
            >
              {{ $l('components.report.confirmSubmit','Confirm & Submits') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="showConfig = false"
            >
              {{ $l('global.cancel','Cancel') }}
            </button>
          </div>
        </div>
      </box>
    </modal>

    <modal
      :show.sync="showPDFReport"
      class="report-preview"
      content-width="70vw"
    >
      <box style="height: 90vh;">
        <div slot="header">
          {{ $l('components.report.pdfReport','PDF Report') }}
        </div>
        <iframe
          v-if="pdf"
          :src="`${pdf}`"
          width="100%"

          style="border: none; height: calc(100% - 6px);"
        >
          {{ $l('components.report.noSupportPDF','This browser does not support PDFs. Please download the PDF to view it:') }} <a :href="`${pdf}`" :download="`Report`">{{ $l('components.report.downloadPDF','Download PDF') }}</a>
        </iframe>
        <div
          slot="footer"
          class="field is-grouped is-grouped-right"
        >
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="showPDFReport = false"
            >
              {{ $l('global.close','Close') }}
            </button>
          </div>
        </div>
      </box>
    </modal>

    <modal
      :show.sync="showXMLReport"
      content-width="70vw"
    >
      <box style="height: 80vh;">
        <div slot="header">
          {{ $l('components.report.xmlReport','XML Report') }}
        </div>

        <snippet
          language="json"
          :code="xmlBeautify(xmlReport)"
          style="max-height: 100%; margin: 0;"
        />
        <input
          id="rawXML"
          type="hidden"
          :value="xmlReport"
        >

        <div
          slot="footer"
          class="field is-grouped is-grouped-right"
        >
          <div class="control">
            <button
              class="button is-primary"
              @click.prevent="copyXMLToClipboard"
            >
              {{ $l('components.report.copyToClipboard','Copy to Clipboard') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="showXMLReport = false"
            >
              {{ $l('global.close','Close') }}
            </button>
          </div>
        </div>
      </box>
    </modal>

    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.report.schedulesReport','Schedules Report') }}
          </div>
          <div class="column is-narrow">
            <button
              class="button is-primary is-small"
              @click.prevent="showCreateForm"
            >
              <octicon :icon="plus" />&ensp;{{ $l('global.add','Add') }}
            </button>
          </div>
        </div>
      </div>
      <data-table
        ref="scheduleTable"
        :key="currentLocale"
        :items="scheduleListFunc"
        :per-page="10"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          field="taskName"
          :label="$l('components.report.task','Task')"
        />
        <data-column
          field="dummyStatus"
          :label="$l('components.report.status','Status')"
        >
          <template slot-scope="props">
            <span
              v-if="props.item.status === 0"
              class="tag is-info"
            >
              {{ $l('components.report.waiting','Waiting') }}
            </span>
            <span
              v-else-if="props.item.status === 1"
              class="tag is-danger"
              :title="props.item.error"
            >
              {{ $l('components.report.failed','Failed') }}
            </span>
            <span
              v-else-if="props.item.status === 2"
              class="tag is-success"
            >
              {{ $l('components.report.done','Done') }}
            </span>
            <span v-else>
              {{ props.item.status }}
            </span>
          </template>
        </data-column>
        <data-column
          field="dummyNextExec"
          :label="$l('components.report.nextExecutation','Next executation')"
          :render="renderNextRun"
        />
        <data-column
          field="dummyRepeat"
          :label="$l('components.report.repeating','Repeating')"
          :render="renderRepeating"
        />
        <data-column
          field="dummyEnd"
          :label="$l('components.report.endding','Endding')"
          :render="renderEndding"
        />
        <data-column
          :sortable="false"
          :label="$l('components.report.action','Action')"
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
              @click.prevent="deleteScheduleReport(props)"
            >
              {{ $l('global.delete','Delete') }}
            </button>
          </template>
        </data-column>
      </data-table>
    </box>
    <box v-show="showScheduleForm">
      <div slot="header">
        <span v-if="form.type === 'create'">
          {{ $l('components.report.newScheduleTask','New Schedule Task') }}
        </span>
        <span v-if="form.type === 'update'">
          <span v-if="form.taskName === 'mail-report'">
            {{ $l('components.report.updateMailReportTask','Update Mail Report Task') }}
          </span>

          <span v-if="form.taskName === 'threat-notify'">
            {{ $l('components.report.updateThreatNotifyTask','Update Threat Notify Task') }}
          </span>

          <span v-if="form.taskName === 'xml-report'">
            {{ $l('components.report.updateXMLReportTask','Update XML Report Task') }}
          </span>
        </span>
      </div>

      <form-schedule-report
        :key="dummyTimestamp"
        :item="formScheduleReport"
        :show="showScheduleForm"
      />

      <div style="margin: .5rem auto; width: 60%;">
        <button
          v-if="formScheduleReport.type === 'create'"
          type="button"
          class="button is-primary"
          style="margin-right:10px"
          @click.prevent="addScheduleReport"
        >
          {{ $l('global.add','Add') }}
        </button>
        <button
          v-if="formScheduleReport.type === 'update'"
          type="button"
          class="button is-primary"
          style="margin-right:10px"
          @click.prevent="updateScheduleReport"
        >
          {{ $l('global.update','Update') }}
        </button>
        <button
          type="button"
          class="button is-info"
          @click.prevent="showScheduleForm = false"
        >
          {{ $l('global.cancel','Cancel') }}
        </button>
      </div>
    </box>
  </section>
</template>
<script>
import { plus } from 'octicons-vue'
import { Modal, Tabs, Tab, Snippet, DatePicker, DataTable, DataColumn } from '@cyradar/ui'
import XMLBeautify from 'xml-beautify'
import GroupApi from '@/api/Group'
import EventApi from '@/api/Event'
import ConfigApi from '@/api/Config'
import ReportApi from '@/api/Report'
import { subDays } from 'date-fns'
import vSelect from 'vue-select'
import Format from 'date-fns/format'
import ScheduleApi from '@/api/Schedule'
import { mapGetters } from 'vuex'
import FormScheduleReport from '../components/FormScheduleReport'

const today = new Date()
const daysAgo7 = subDays(today, 7)

export default {
  name: 'Report',
  components: { DatePicker, Modal, Snippet, Tabs, Tab, vSelect, DataTable, DataColumn, FormScheduleReport },
  data () {
    return {
      plus,
      dateRange: [daysAgo7, today],
      metadata: {
        startDate: null,
        endDate: null
      },
      reportType: 'XML',
      form: {
        startDate: null,
        endDate: null,
        maliciousHosts: [],
        clients: [],
        agentMacs: [],
        categories: [],
        priorities: []
      },
      formConfig: {
        groupName: '',
        organization: { },
        envelopeEndpoint: ''
      },
      selectedGroup: { name: 'All', agentMacs: [] },
      groupOptions: [],
      hostOptions: [],
      userOptions: [],
      categoryOptions: [],
      priorityOptions: ['low', 'medium', 'high', 'critical'],
      pdf: null,
      xmlReport: '',
      showPDFReport: false,
      showXMLReport: false,
      showConfig: false,
      showScheduleForm: false,
      dummyTimestamp: (new Date()).getTime(),
      formScheduleReport: {
        type: 'create',
        taskName: 'mail-report',
        nextRun: new Date(),
        unit: 'weeks',
        interval: '1',
        occurrences: -1,
        payload: {
          to: [],
          cc: [],
          bcc: []
        }
      },
      taskName: ['xml-report', 'mail-report']
    }
  },
  computed: {
    ...mapGetters([
      'currentLocale'
    ])
  },
  watch: {
    dateRange (val) {
      this.form.startDate = val[0].toISOString()
      this.form.endDate = val[1].toISOString()

      this.metadata = {
        startDate: val[0].toISOString(),
        endDate: val[1].toISOString()
      }
    },
    metadata () {
      this.fetch()
    },
    selectedGroup (val, oldVal) {
      if (val.name === 'All') {
        this.formConfig.groupName = ''
        this.form.agentMacs = []
        return
      }
      this.formConfig.groupName = val.name
      this.form.agentMacs = val.agentMacs.length === 0 ? [''] : val.agentMacs
    }
  },
  methods: {
    previewPDFReport () {
      this.pdf = null
      this.showPDFReport = true
      ReportApi.getPDFReport(this.$http, this.form)
        .then(data => {
          let blob = new Blob([data], { type: 'application/pdf' })
          let url = window.URL.createObjectURL(blob)
          this.pdf = url

          window.open(this.pdf)
        })
    },
    xmlBeautify (rawXML) {
      if (!rawXML) {
        return ''
      }
      return new XMLBeautify().beautify(rawXML)
    },
    previewXMLReport () {
      this.xmlReport = ''
      ReportApi.getXMLReport(this.$http, this.form)
        .then(res => {
          let data = res.data
          this.xmlReport = data
          this.showXMLReport = true
        })
    },
    showConfigModal () {
      this.fetchConfiguration()
      this.showConfig = true
    },
    confirmAndSumbit () {
      this.showConfig = false
      this.updateConfiguration()
        .then(this.submitXMLReport())
    },
    submitXMLReport () {
      this.xmlReport = ''
      ReportApi.submitXMLReport(this.$http, this.form)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
        })
    },
    copyXMLToClipboard () {
      let rawXMLElm = document.querySelector('#rawXML')
      rawXMLElm.setAttribute('type', 'text')
      rawXMLElm.select()

      try {
        let successful = document.execCommand('copy')
        let msg = successful ? 'successful' : 'unsuccessful'
        alert('Raw XML report was copied ' + msg + ' to clipboard')
      } catch (err) {
        alert('Unable to copy')
      }

      // unselect the range
      rawXMLElm.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    downloadPDFReport () {
      ReportApi.getPDFReport(this.$http, this.form)
        .then(data => {
          let blob = new Blob([data], { type: 'application/pdf' })
          let link = document.createElement('a')
          document.body.appendChild(link)
          link.href = window.URL.createObjectURL(blob)
          link.download = `CyRadar EDR Report.pdf`
          link.click()
          document.body.removeChild(link)
        })
    },
    updateConfiguration () {
      return ConfigApi.updateConfig(this.$http, this.formConfig)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 5000
          })
        })
    },
    fetch () {
      this.fetchIPs()
      this.fetchClients()
      this.fetchCategories()
      this.fetchGroups()
    },
    fetchConfiguration () {
      let grName = ''
      if (this.selectedGroup.name !== 'All') {
        grName = this.selectedGroup.name
      }
      ConfigApi.getConfig(this.$http, { groupName: grName })
        .then(res => {
          if (!res.data) {
            return
          }
          let config = res.data
          if (config.groupName !== this.selectedGroup.name && this.selectedGroup.name !== 'All') {
            config.groupName = this.selectedGroup.name
          }
          this.formConfig = config
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
    fetchIPs () {
      EventApi.getEventFrequency(this.$http, { kind: 'host', ...this.metadata })
        .then(res => res.data)
        .then(data => data.map(e => { return e.label }))
        .then(data => {
          this.hostOptions = data
        })
    },
    fetchClients () {
      EventApi.getEventFrequency(this.$http, { kind: 'computerName', ...this.metadata })
        .then(res => res.data)
        .then(data => data.map(e => { return e.label }))
        .then(data => {
          this.userOptions = data
        })
    },
    fetchCategories () {
      EventApi.getEventFrequency(this.$http, { kind: 'category', ...this.metadata })
        .then(res => res.data)
        .then(data => data.map(e => { return e.label }))
        .then(data => {
          this.categoryOptions = data
        })
    },
    renderNextRun (_, item) {
      if (item.occurrences > 0 && item.executed >= item.occurrences) {
        return 'Done'
      }
      if (item.status === 1) {
        return 'None'
      }
      return Format(item.nextRun, 'DD/MM/YYYY HH:mm')
    },
    renderRepeating (_, item) {
      if (!item.unit) {
        return 'No'
      }
      return 'Every' + ' ' + item.interval + ' ' + item.unit
    },
    renderEndding (_, item) {
      if (item.occurrences < 0) {
        return 'Never'
      }
      return 'After' + ' ' + item.executed + '/' + item.occurrences + ' occurrences'
    },
    scheduleListFunc (filtering, sorting, paging) {
      return ScheduleApi.getScheduleVueTable(this.$http, filtering, sorting, paging, { taskName: this.taskName })
        .then(res => res.data)
    },
    updateScheduleReport () {
      let content = {
        _id: this.formScheduleReport._id,
        taskName: this.formScheduleReport.taskName,
        unit: this.formScheduleReport.unit,
        interval: parseInt(this.formScheduleReport.interval),
        occurrences: parseInt(this.formScheduleReport.occurrences),
        nextRun: this.formScheduleReport.nextRun,
        payload: this.formScheduleReport.payload
      }
      ScheduleApi.updateSchedule(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.showScheduleForm = false
          this.$refs.scheduleTable.loadItems()
          this.resetForm()
        })
    },
    addScheduleReport () {
      let content = {
        taskName: this.formScheduleReport.taskName,
        unit: this.formScheduleReport.unit,
        interval: parseInt(this.formScheduleReport.interval),
        occurrences: parseInt(this.formScheduleReport.occurrences),
        nextRun: this.formScheduleReport.nextRun,
        payload: this.formScheduleReport.payload
      }
      ScheduleApi.addSchedule(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.showScheduleForm = false
          this.$refs.scheduleTable.loadItems()
          this.resetForm()
        })
    },
    deleteScheduleReport (props) {
      ScheduleApi.deleteSchedule(this.$http, props.item._id)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.scheduleTable.loadItems()
        })
    },
    showCreateForm () {
      this.formScheduleReport = {
        type: 'create',
        taskName: 'mail-report',
        nextRun: new Date(),
        unit: 'weeks',
        interval: '1',
        occurrences: -1
      }
      this.dummyTimestamp = (new Date()).getTime()
      this.showScheduleForm = !this.showScheduleForm
    },
    showUpdateForm (props) {
      let item = props.item
      this.formScheduleReport = {
        type: 'update',
        _id: item._id,
        taskName: item.taskName ? item.taskName : '',
        nextRun: item.nextRun ? new Date(item.nextRun) : new Date(),
        interval: item.interval ? item.interval : 1,
        occurrences: item.occurrences ? item.occurrences : -1,
        unit: item.unit ? item.unit : 'weeks',
        payload: {
          groupId: item.payload.groupId ? item.payload.groupId : '',
          categories: item.payload.categories ? item.payload.categories : [],
          priorities: item.payload.priorities ? item.payload.priorities : [],
          to: item.payload.to ? item.payload.to : [],
          cc: item.payload.cc ? item.payload.cc : [],
          bcc: item.payload.bcc ? item.payload.bcc : []
        }
      }
      this.dummyTimestamp = (new Date()).getTime()
      this.showScheduleForm = !this.showScheduleForm
    },
    resetForm () {
      this.form = {
        type: 'create',
        taskName: 'mail-report',
        nextRun: new Date(),
        unit: 'weeks',
        interval: '1',
        occurrences: -1,
        payload: {
          to: [],
          cc: [],
          bcc: []
        }
      }
    }
  }
}
</script>

<style src="vue-select/dist/vue-select.css"></style>
