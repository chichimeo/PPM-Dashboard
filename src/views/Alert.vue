<template>
  <section class="section">
    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.alert.alerts','Alerts') }}
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
          field="payload.to"
          :label="$l('components.alert.recipients','Recipients')"
        >
          <template slot-scope="props">
            <span
              v-for="( item, index ) in props.item.payload.to"
              :key="index"
              class="tag is-info"
              style="margin: 2px 5px 2px 0px;"
            >
              {{ item }}
            </span>
          </template>
        </data-column>
        <data-column
          field="dummyStatus"
          :label="$l('components.alert.status','Status')"
          width="20%"
        >
          <template slot-scope="props">
            <span
              v-if="props.item.status === 0"
              class="tag is-info"
            >
              {{ $l('components.alert.waiting','Waiting') }}
            </span>
            <span
              v-else-if="props.item.status === 1"
              class="tag is-danger"
              :title="props.item.error"
            >
              {{ $l('components.alert.failed','Failed') }}
            </span>
            <span
              v-else-if="props.item.status === 2"
              class="tag is-success"
            >
              {{ $l('components.alert.done','Done') }}
            </span>
            <span v-else>
              {{ props.item.status }}
            </span>
          </template>
        </data-column>
        <data-column
          :sortable="false"
          :label="$l('components.alert.action','Action')"
          width="20%"
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
              @click.prevent="deleteAlert(props)"
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
          {{ $l('components.alert.newThreatNotifyTask','New Threat Notify Task') }}
        </span>
        <span v-if="form.type === 'update'">
          {{ $l('components.alert.updateThreatNotifyTask', 'Update Threat Notify Task') }}
        </span>
      </div>

      <div v-show="showScheduleForm">
        <div
          v-if="form.type === 'create'"
          style="margin: auto; width: 60%;"
        >
          <form-schedule-threat-notify
            :key="dummyTimestamp"
            :payload="form.payload"
          />
        </div>
        <div
          v-if="form.type === 'update'"
          style="margin: auto; width: 60%;"
        >
          <form-schedule-threat-notify :payload="form.payload" />
        </div>
      </div>

      <div style="margin: .5rem auto; width: 60%;">
        <button
          v-if="form.type === 'create'"
          type="button"
          class="button is-primary"
          style="margin-right:10px"
          @click.prevent="addAlert"
        >
          {{ $l('global.add','Add') }}
        </button>
        <button
          v-if="form.type === 'update'"
          type="button"
          class="button is-primary"
          style="margin-right:10px"
          @click.prevent="updateAlert"
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
import ScheduleApi from '@/api/Schedule'
import { mapGetters } from 'vuex'
import FormScheduleThreatNotify from '../components/FormScheduleThreatNotify'
import { addMinutes } from 'date-fns'

export default {
  name: 'Alert',
  components: { DataTable, DataColumn, FormScheduleThreatNotify },
  data () {
    return {
      plus,
      showScheduleForm: false,
      dummyTimestamp: (new Date()).getTime(),
      taskName: ['threat-notify'],
      form: {
        type: 'create',
        unit: 'minutes',
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
    showUpdateForm (props) {
      let item = props.item
      this.form = {
        type: 'update',
        _id: item._id,
        taskName: item.taskName ? item.taskName : '',
        interval: item.interval ? item.interval : 1,
        nextRun: item.nextRun ? new Date(item.nextRun) : new Date(),
        occurrences: item.occurrences ? item.occurrences : -1,
        unit: item.unit ? item.unit : 'minutes',
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
    showCreateForm () {
      this.form = {
        type: 'create',
        taskName: 'threat-notify',
        unit: 'minutes',
        interval: '1',
        occurrences: -1,
        payload: {
          to: [],
          cc: [],
          bcc: []
        }
      }
      this.dummyTimestamp = (new Date()).getTime()
      this.showScheduleForm = !this.showScheduleForm
    },
    scheduleListFunc (filtering, sorting, paging) {
      return ScheduleApi.getScheduleVueTable(this.$http, filtering, sorting, paging, { taskName: this.taskName })
        .then(res => res.data)
    },
    addAlert () {
      let content = {
        taskName: 'threat-notify',
        unit: this.form.unit,
        interval: parseInt(this.form.interval),
        occurrences: parseInt(this.form.occurrences),
        nextRun: addMinutes(new Date(), 5),
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
    updateAlert () {
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
    deleteAlert (props) {
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
    resetForm () {
      this.form = {
        type: 'create',
        taskName: 'threat-notify',
        unit: 'minutes',
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
