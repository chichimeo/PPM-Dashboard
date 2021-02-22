<template>
  <div v-show="show">
    <div style="margin: auto; width: 60%;">
      <div class="field">
        <label class="label">{{ $l('components.formSchedule.nextExecution','Next Execution') }}</label>
        <div class="control">
          <date-picker
            :value.sync="item.nextRun"
            time
          />
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $l('components.formSchedule.repeatInterval','Interval Repeat') }}</label>
        <div class="control">
          <div
            style="width: 100%; display: inline-flex;"
            class="select"
          >
            <input
              v-model.number="item.interval"
              type="number"
              class="input"
            >
            <select
              v-model="item.unit"
              style="width: 100%; margin-left: 10px;"
            >
              <option
                v-for="option in repeatOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $l('components.formSchedule.ends','Ends') }}</label>
        <div class="control">
          <div class="buttons has-addons">
            <button
              :class="['button', {'is-info': item.occurrences < 0 }]"
              @click.prevent="item.occurrences = -1"
            >
              {{ $l('components.formSchedule.never','Never') }}
            </button>
            <button
              :class="['button', {'is-info': item.occurrences > 0 }]"
              @click.prevent="item.occurrences = 1"
            >
              {{ $l('components.formSchedule.occurrences','Occurrences') }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="item.occurrences > 0"
        class="field"
      >
        <label class="label">{{ $l('components.formSchedule.occurrences','Occurrences') }}</label>
        <input
          v-model.number="item.occurrences"
          type="number"
          class="input"
        >
      </div>
    </div>

    <div
      v-if="item.type === 'create'"
      style="margin: auto; width: 60%;"
    >
      <tabs
        ref="taskType"
        :theme="$_ui_theme_tabs"
      >
        <tab :title="$l('components.formSchedule.mailReport','Mail Report')">
          <form-schedule-mail-report
            :key="dummyTimestamp"
            :payload="item.payload"
          />
        </tab>
        <tab :title="$l('components.formSchedule.xmlReport','XML Report')">
          <form-schedule-xml-report
            :key="dummyTimestamp"
            :payload="item.payload"
          />
        </tab>
      </tabs>
    </div>

    <div
      v-if="item.type === 'update'"
      style="margin: auto; width: 60%;"
    >
      <div v-if="item.taskName === 'mail-report'">
        <form-schedule-mail-report :payload="item.payload" />
      </div>

      <div v-if="item.taskName === 'xml-report'">
        <form-schedule-xml-report :payload="item.payload" />
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, Tab, DatePicker } from '@cyradar/ui'
import FormScheduleMailReport from './FormScheduleMailReport.vue'
import FormScheduleXmlReport from './FormScheduleXmlReport.vue'

export default {
  name: 'FormSchedule',
  components: { DatePicker, Tabs, Tab, FormScheduleMailReport, FormScheduleXmlReport },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {
          nextRun: new Date(),
          unit: 'weeks',
          interval: '1',
          occurrences: -1
        }
      }
    }
  },
  data () {
    return {
      isMounted: false,
      dummyTimestamp: (new Date()).getTime(),
      priorityOptions: ['low', 'medium', 'high', 'critical'],
      options: {
        mailReport: {
          name: 'mail-report',
          payload: {
            to: [],
            cc: [],
            bcc: []
          }
        },
        xmlReport: {
          name: 'xml-report',
          payload: {
            groupId: '',
            categories: [],
            priorities: []
          }
        }
      }
    }
  },
  computed: {
    selectedTitle () {
      if (!this.isMounted || !this.show || !this.$refs.taskType) {
        return ''
      }
      return this.$refs.taskType.active
    },
    selectedTaskName () {
      return this.item.taskName
    },
    repeatOptions () {
      return [
        { value: 'minutes', label: this.$l('components.formSchedule.minutes', 'Minutes') },
        { value: 'hours', label: this.$l('components.formSchedule.hours', 'Hours') },
        { value: 'days', label: this.$l('components.formSchedule.days', 'Days') },
        { value: 'weeks', label: this.$l('components.formSchedule.weeks', 'Weeks') },
        { value: 'months', label: this.$l('components.formSchedule.months', 'Months') }
      ]
    }
  },
  watch: {
    selectedTitle (val, oldVal) {
      if (this.item.type === 'update') {
        return
      }

      switch (val) {
        case 0:
          this.dummyTimestamp = (new Date()).getTime()
          this.item.taskName = this.options.mailReport.name
          break
        case 1:
          this.dummyTimestamp = (new Date()).getTime()
          this.item.taskName = this.options.xmlReport.name
          break
        default:
          break
      }
    },
    selectedTaskName (val, oldVal) {
      if (this.item.type === 'create') {
        switch (val) {
          case 'mail-report':
            this.item.payload = this.options.mailReport.payload
            break
          case 'xml-report':
            this.item.payload = this.options.xmlReport.payload
            break
          default:
            this.item.payload = this.options.mailReport.payload
            break
        }
      }
    },
    show (val, oldVal) {
      if (this.item.type === 'create') {
        this.item.payload = this.options.mailReport.payload
      }
    }
  },
  mounted () {
    this.isMounted = true
    if (this.item.type === 'create') {
      switch (this.item.taskName) {
        case 'mail-report':
          this.item.payload = this.options.mailReport.payload
          break
        case 'xml-report':
          this.item.payload = this.options.xmlReport.payload
          break
        default:
          this.item.payload = this.options.mailReport.payload
          break
      }
    }
  }
}

</script>

<style src="vue-select/dist/vue-select.css"></style>
