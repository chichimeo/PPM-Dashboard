<template>
  <section class="section">
    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.collector.siem','SIEM') }}
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
        ref="collectorTable"
        :key="currentLocale"
        :items="collectorListFunc"
        :per-page="10"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          field="type"
          :label="$l('components.collector.type','Type')"
        />
        <data-column
          field="endpoint"
          :label="$l('components.collector.endpoint','Endpoint')"
        />
        <data-column
          :sortable="false"
          :label="$l('global.action','Action')"
          width="20%"
        >
          <template slot-scope="props">
            <button
              class="button is-primary mx-1 my-1 is-small is-light"
              @click.prevent="showSendEvent(props)"
            >
              {{ $l('components.collector.sendEvents','Send Events') }}
            </button>
            <button
              class="button is-info mx-1 my-1 is-small is-light"
              @click.prevent="showUpdateForm(props)"
            >
              {{ $l('global.edit','Edit') }}
            </button>
            <button
              class="button is-danger mx-1 my-1 is-small is-light"
              @click.prevent="deleteCollector(props)"
            >
              {{ $l('global.delete','Delete') }}
            </button>
          </template>
        </data-column>
      </data-table>
    </box>
    <modal :show.sync="collectorForm">
      <box>
        <div slot="header">
          {{ formType === 'create' ? $l('components.collector.create','Create'): $l('components.collector.updateSIEM','Update SIEM') }}
        </div>

        <div style="margin: auto; width:80%;">
          <div class="field">
            <label class="label">{{ $l('components.collector.endpoint','Endpoint') }}</label>
            <div class="control">
              <input
                v-model="form.endpoint"
                type="text"
                class="input"
                placeholder="Endpoint"
                :class="{'is-danger': endpointInvalid && form.endpointChecked}"
                @input="form.endpointChecked = true"
              >
              <p
                v-if="endpointInvalid && form.endpointChecked"
                class="help is-danger"
              >
                {{ endpointInvalid }}
              </p>
            </div>
          </div>
          <div
            v-if="endpointIsHTTP"
            class="field"
          >
            <div class="columns is-gapless mb-2">
              <label class="label column">{{ $l('components.collector.header','Header') }}</label>
              <div class="column is-narrow">
                <button
                  class="button is-primary is-small is-light"
                  @click="addHeader"
                >
                  <octicon :icon="plus" />
                </button>
              </div>
            </div>
            <div
              v-for="(data, index) in form.header"
              :key="index"
              class="control is-variable is-1 is-vcentered"
            >
              <div>
                <div class="columns margin-0">
                  <div
                    class="column is-4"
                  >
                    <input
                      v-model="data.key"
                      class="input"
                      type="text"
                      placeholder="Header"
                      :class="{'is-danger': form.headerKeyChecked[index] && headersInvalid && headersInvalid[index] && headersInvalid[index].keyError }"
                      @input="form.headerKeyChecked[index] = true"
                    >
                    <p
                      v-if="form.headerKeyChecked[index] && headersInvalid && headersInvalid[index] && headersInvalid[index].keyError"
                      class="help is-danger"
                    >
                      {{ headersInvalid[index].keyError }}
                    </p>
                  </div>
                  <div class="column">
                    <input
                      v-model="data.value"
                      class="input"
                      type="text"
                      :class="{'is-danger': form.headerValueChecked[index] && headersInvalid && headersInvalid[index]&& headersInvalid[index].valueError}"
                      @input="form.headerValueChecked[index] = true"
                    >
                    <p
                      v-if="form.headerValueChecked[index] && headersInvalid && headersInvalid[index] && headersInvalid[index].valueError"
                      class="help is-danger"
                    >
                      {{ headersInvalid[index].valueError }}
                    </p>
                  </div>
                  <div class="column is-narrow">
                    <button
                      class="button is-danger is-small is-light"
                      @click="deleteHeader(index)"
                    >
                      <octicon :icon="x" />
                    </button>
                  </div>
                </div>
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
              @click.prevent="addCollector"
            >
              {{ $l('global.submit','Submit') }}
            </button>
            <button
              v-if="formType === 'update'"
              class="button is-primary"
              @click.prevent="updateCollector"
            >
              {{ $l('global.update','Update') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="collectorForm = false"
            >
              {{ $l('global.close','Close') }}
            </button>
          </div>
        </div>
      </box>
    </modal>
    <modal :show.sync="showFormSendEvent">
      <box>
        <div slot="header">
          {{ $l('components.collector.sendEvents','Send Events') }}
        </div>

        <div style="width: 80%; padding-left: 3.5rem; margin-left: 1rem;">
          <div class="field">
            <label class="label">{{ $l('components.collector.timeRange','Time Range') }}</label>
            <div class="control">
              <date-picker
                class="range-send-event"
                :value.sync="formSendEvent.dateRange"
                range
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
              class="button is-primary"
              @click.prevent="sendEvent"
            >
              {{ $l('components.collector.send','Send') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="showFormSendEvent = false"
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
import { DataTable, DataColumn, Modal, DatePicker } from '@cyradar/ui'
import { plus, x } from 'octicons-vue'
import { mapGetters } from 'vuex'
import CollectorApi from '../api/Collector'
import { subDays } from 'date-fns'

const today = new Date()
const daysAgo7 = subDays(today, 7)

export default {
  name: 'Collector',
  components: { DataTable, DataColumn, Modal, DatePicker },
  data () {
    return {
      plus,
      x,
      collectorForm: false,
      formType: 'create',
      form: {
        type: '',
        endpoint: '',
        header: [],
        endpointChecked: false,
        headerKeyChecked: [],
        headerValueChecked: []
      },
      showFormSendEvent: false,
      formSendEvent: {
        idCollector: '',
        dateRange: [daysAgo7, today]
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentLocale'
    ]),
    endpointMatches () {
      if (!this.form) {
        return null
      }

      let patt = new RegExp(`(tcp|udp|http|https)://(.+)`)
      return patt.exec(this.form.endpoint)
    },
    endpointInvalid () {
      if (!this.form || !this.form.endpoint) {
        return this.$l('components.collector.endpointIsEmpty', 'Endpoint is empty')
      }

      if (!this.endpointMatches) {
        return this.$l('components.collector.endpointIsInvalid', 'Endpoint is invalid')
      }

      return ''
    },
    headersInvalid () {
      let exist = {}
      let errors = this.form.header.map((h, i) => {
        let output = {
        }

        if (!h.key) {
          output.keyError = this.$l('components.collector.headerIsEmpty', 'The header is empty')
        }

        if (!h.value) {
          output.valueError = this.$l('components.collector.headerIsEmpty', 'The header is empty')
        }

        if (exist[h.key.toLowerCase()]) {
          output.keyError = this.$l('components.collector.headerIsDuplicate', 'The header is duplicate')
        }

        if (!output.keyError) {
          exist[h.key.toLowerCase()] = true
        }

        if (Object.keys(output).length > 0) {
          return output
        }
        return null
      })
      let objErrors = errors.reduce((acc, val, index) => {
        if (val) {
          acc[index] = val
        }
        return acc
      }, {})
      if (Object.keys(objErrors).length) {
        return objErrors
      }

      return null
    },
    endpointIsHTTP () {
      return this.endpointMatches && (this.endpointMatches[1] === 'http' || this.endpointMatches[1] === 'https')
    },
    formInvalid () {
      if (this.endpointInvalid) {
        return true
      }

      if (this.endpointIsHTTP && this.headersInvalid) {
        return true
      }

      return false
    }
  },
  methods: {
    showCreateForm () {
      this.formType = 'create'
      this.form = {
        type: '',
        endpoint: '',
        header: [ { key: 'Authorization', value: '' } ],
        endpointChecked: false,
        headerKeyChecked: [],
        headerValueChecked: []
      }
      this.collectorForm = !this.collectorForm
    },
    addHeader () {
      this.form.header.push({ key: '', value: '' })
    },
    deleteHeader (idx) {
      this.form.header.splice(idx, 1)
      this.form.headerKeyChecked.splice(idx, 1)
      this.form.headerValueChecked.splice(idx, 1)
    },
    updateCollector () {
      for (let i = 0; i < this.form.header.length; i++) {
        this.form.headerKeyChecked.splice(i, 1, true)
        this.form.headerValueChecked.splice(i, 1, true)
      }

      if (this.formInvalid) {
        return
      }

      let listHeader = this.endpointIsHTTP ? Object.assign({}, ...this.form.header.map(o => ({ [o.key]: o.value }))) : {}
      let content = {
        _id: this.form._id,
        type: this.form.type,
        endpoint: this.form.endpoint,
        header: listHeader
      }
      CollectorApi.updateCollector(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.collectorForm = false
          this.$refs.collectorTable.loadItems()
        })
    },
    addCollector () {
      // show all error
      for (let i = 0; i < this.form.header.length; i++) {
        this.form.headerKeyChecked.splice(i, 1, true)
        this.form.headerValueChecked.splice(i, 1, true)
      }

      if (this.formInvalid) {
        return
      }

      let listHeader = this.endpointIsHTTP ? Object.assign({}, ...this.form.header.map(o => ({ [o.key]: o.value }))) : {}
      let content = {
        type: this.form.type,
        endpoint: this.form.endpoint,
        header: listHeader
      }
      CollectorApi.addCollector(this.$http, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.collectorForm = false
          this.$refs.collectorTable.loadItems()
        })
    },
    showUpdateForm (props) {
      let item = props.item

      let listHeader = []

      for (let x in item.header) {
        listHeader.push({
          key: x,
          value: item.header[x]
        })
      }

      this.form = {
        _id: item._id,
        type: item.type,
        endpoint: item.endpoint,
        header: listHeader,
        endpointChecked: false,
        headerKeyChecked: [],
        headerValueChecked: []
      }
      if (!this.endpointIsHTTP) {
        this.form.header = [{ key: 'Authentication', value: '' }]
      }
      this.formType = 'update'
      this.collectorForm = !this.collectorForm
    },
    deleteCollector (props) {
      CollectorApi.deleteCollector(this.$http, props.item._id)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.collectorTable.loadItems()
        })
    },
    collectorListFunc (filtering, sorting, paging) {
      return CollectorApi.getCollectorTable(this.$http, filtering, sorting, paging)
        .then(res => res.data)
    },
    showSendEvent (props) {
      this.formSendEvent.idCollector = props.item._id
      this.showFormSendEvent = !this.showFormSendEvent
    },
    sendEvent () {
      let content = {
        startDate: this.formSendEvent.dateRange[0].toISOString(),
        endDate: this.formSendEvent.dateRange[1].toISOString()
      }
      CollectorApi.sendEvent(this.$http, this.formSendEvent.idCollector, content)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.showFormSendEvent = false
        })
    }
  }
}
</script>
<style lang="scss">
.range-send-event {
  .dropdown {
    z-index: 9999;
    position: fixed;
  }
}
</style>
