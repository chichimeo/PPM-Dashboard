<template>
  <section class="section">
    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.schedule.schedules','Schedules') }}
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
          :label="$l('components.schedule.task','Task')"
        />
        <data-column
          field="dummyStatus"
          :label="$l('components.schedule.status','Status')"
        >
          <template slot-scope="props">
            <span
              v-if="props.item.status === 0"
              class="tag is-info"
            >
              {{ $l('components.schedule.waiting','Waiting') }}
            </span>
            <span
              v-else-if="props.item.status === 1"
              class="tag is-danger"
              :title="props.item.error"
            >
              {{ $l('components.schedule.failed','Failed') }}
            </span>
            <span
              v-else-if="props.item.status === 2"
              class="tag is-success"
            >
              {{ $l('components.schedule.done','Done') }}
            </span>
            <span v-else>
              {{ props.item.status }}
            </span>
          </template>
        </data-column>
        <data-column
          field="dummyNextExec"
          :label="$l('components.schedule.nextExecutation','Next executation')"
          :render="renderNextRun"
        />
        <data-column
          field="dummyRepeat"
          :label="$l('components.schedule.repeating','Repeating')"
          :render="renderRepeating"
        />
        <data-column
          field="dummyEnd"
          :label="$l('components.schedule.endding','Endding')"
          :render="renderEndding"
        />
        <data-column
          :sortable="false"
          :label="$l('components.schedule.action','Action')"
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
              @click.prevent="deleteSchedule(props)"
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
          {{ $l('components.schedule.newScheduleTask','New Schedule Task') }}
        </span>
        <span v-if="form.type === 'update'">
          <span v-if="form.taskName === 'mail-report'">
            {{ $l('components.schedule.updateMailReportTask','Update Mail Report Task') }}
          </span>

          <span v-if="form.taskName === 'threat-notify'">
            {{ $l('components.schedule.updateThreatNotifyTask','Update Threat Notify Task') }}
          </span>

          <span v-if="form.taskName === 'xml-report'">
            {{ $l('components.schedule.updateXMLReportTask','Update XML Report Task') }}
          </span>
        </span>
      </div>

      <form-schedule
        :key="dummyTimestamp"
        :item="form"
        :show="showScheduleForm"
      />

      <div style="margin: .5rem auto; width: 60%;">
        <button
          v-if="form.type === 'create'"
          type="button"
          class="button is-primary"
          style="margin-right:10px"
          @click.prevent="addSchedule"
        >
          {{ $l('global.add','Add') }}
        </button>
        <button
          v-if="form.type === 'update'"
          type="button"
          class="button is-primary"
          style="margin-right:10px"
          @click.prevent="updateSchedule"
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
import { DataTable, DataColumn } from '@cyradar/ui'
import { plus } from 'octicons-vue'
import FormSchedule from '@/components/FormSchedule'
import Format from 'date-fns/format'
import ScheduleApi from '@/api/Schedule'
import { mapGetters } from 'vuex'

export default {
  name: 'Schedule',
  components: { FormSchedule, DataTable, DataColumn },
  data () {
    return {
      plus,
      showScheduleForm: false,
      dummyTimestamp: (new Date()).getTime(),
      form: {
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
  },
  computed: {
    ...mapGetters([
      'currentLocale'
    ])
  },
  methods: {
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
    showCreateForm () {
      this.form = {
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
      this.form = {
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
    },
    updateSchedule () {
      let content = {
        _id: this.form._id,
        taskName: this.form.taskName,
        unit: this.form.unit,
        interval: parseInt(this.form.interval),
        occurrences: parseInt(this.form.occurrences),
        nextRun: this.form.nextRun,
        payload: this.form.payload
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
    addSchedule () {
      let content = {
        taskName: this.form.taskName,
        unit: this.form.unit,
        interval: parseInt(this.form.interval),
        occurrences: parseInt(this.form.occurrences),
        nextRun: this.form.nextRun,
        payload: this.form.payload
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
    deleteSchedule (props) {
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
    scheduleListFunc (filtering, sorting, paging) {
      return ScheduleApi.getScheduleVueTable(this.$http, filtering, sorting, paging)
        .then(res => res.data)
    }
  }
}

</script>
<style src="vue-select/dist/vue-select.css"></style>
