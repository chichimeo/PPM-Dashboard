<template>
  <section class="section">
    <div
      class="columns"
      style="margin: 0;"
    >
      <div
        class="column"
        style="padding-left: 0; padding-top: 0;"
      >
        <box class="widget widget--green">
          <div
            style="cursor: pointer;"
            @click="$router.push({ name: 'agent' })"
          >
            <div class=" has-text-centered">
              <p class="heading">
                {{ $l('components.overview.protectedUsers','Protected Users') }}
              </p>
              <p class="title">
                {{ count.agent }}
              </p>
            </div>
          </div>
        </box>
      </div>
      <div
        class="column"
        style="padding-top: 0;"
      >
        <box class="widget widget--blue">
          <div
            style="cursor: pointer;"
            @click="$router.push({ name: 'threat' })"
          >
            <div class="has-text-centered">
              <p class="heading">
                {{ $l('components.overview.detectedThreats','Detected Threats') }}
              </p>
              <p class="title">
                {{ count.event }}
              </p>
            </div>
          </div>
        </box>
      </div>
      <div
        class="column"
        style="padding-top: 0;"
      >
        <box class="widget widget--pink">
          <div
            style="cursor: pointer;"
            @click="$router.push({ name: 'threat', query: { filter: 'high' } })"
          >
            <div class="has-text-centered">
              <p class="heading">
                {{ $l('components.overview.highPriorityThreats','High Priority Threats') }}
              </p>
              <p class="title">
                {{ count.priority.high }}
              </p>
            </div>
          </div>
        </box>
      </div>
      <div
        class="column"
        style="padding-right: 0; padding-top: 0;"
      >
        <box class="widget widget--purple">
          <div
            style="cursor: pointer;"
            @click="$router.push({ name: 'threat', query: { filter: 'critical' } })"
          >
            <div class="has-text-centered">
              <p class="heading">
                {{ $l('components.overview.criticalThreats','Critical Threats') }}
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
      <tabs :theme="$_ui_theme_tabs">
        <tab :title="$l('components.overview.recentThreatEvents','Recent Threat Events')">
          <line-chart
            canvas-height="270px"
            :picker="true"
            :data="redData"
            :timestamp="redDataFetchedAt"
            :choices="categories"
            unit="day"
            @toggled="toggleCategory"
          >
            <div slot="right">
              <date-picker
                :value.sync="dateRange"
                range
              />
              <div class="container has-text-centered">
                <img src="../assets/logo-sm.png">
              </div>
              <div class="container has-text-centered">
                <p class="title is-size-1">
                  {{ count.event }}
                </p>
              </div>
              <div class="container has-text-centered">
                <p class="heading is-size-5">
                  {{ $l('components.overview.detectedThreats','Detected Threats') }}
                </p>
              </div>
            </div>
          </line-chart>
        </tab>
      </tabs>
    </box>

    <div class="columns">
      <div class="column is-half">
        <box style="margin: 0; height: 100%;">
          <tabs :theme="$_ui_theme_tabs">
            <tab :title="$l('components.overview.topInfectedGroups','Top Infected Groups')">
              <bar-chart
                :data="groupData"
                :timestamp="groupDataFetchedAt"
                :legend-title="$l('components.overview.groups','Groups')"
                @limited="groupDataFetchedAt = new Date()"
              />
            </tab>
            <tab :title="$l('components.overview.topInfectedClients','Top Infected Clients')">
              <bar-chart
                :data="clientData"
                :timestamp="clientDataFetchedAt"
                :legend-title="$l('components.overview.clients','Clients')"
                @limited="clientDataFetchedAt = new Date()"
              />
            </tab>
          </tabs>
        </box>
      </div>

      <div class="column is-half">
        <box style="margin: 0; height: 100%;">
          <tabs :theme="$_ui_theme_tabs">
            <tab :title="$l('components.overview.category','Category')">
              <doughnut-chart
                :data="categoryData"
                :timestamp="categoryDataFetchedAt"
              />
            </tab>
          </tabs>
        </box>
      </div>
    </div>
  </section>
</template>
<script>
import { DatePicker, Tabs, Tab } from '@cyradar/ui'
import DoughnutChart from 'components/DoughnutChart'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import { Colors } from '../utils'
import AgentApi from '@/api/Agent'
import EventApi from '@/api/Event'
import { subDays } from 'date-fns'

const today = new Date()
const daysAgo7 = subDays(today, 7)

export default {
  name: 'Overview',
  components: { DoughnutChart, LineChart, BarChart, DatePicker, Tabs, Tab },
  data () {
    return {
      redRawData: {},
      redDataFetchedAt: null,
      categories: [],
      groupData: {},
      groupDataFetchedAt: null,
      clientData: {},
      clientDataFetchedAt: null,
      categoryData: {},
      categoryDataFetchedAt: null,
      colors: Colors,
      dateRange: [daysAgo7, today],
      metadata: {
        startDate: daysAgo7.toISOString(),
        endDate: today.toISOString()
      },
      count: {
        event: 0,
        agent: 0,
        priority: {
          low: 0,
          medium: 0,
          high: 0,
          critical: 0
        }
      }
    }
  },
  computed: {
    redData () {
      let labels = Object.keys(this.redRawData)
      let datasets = this.categories.filter(set => !set.disabled).map((category, index) => {
        category.label = category.name
        category.data = labels.map(label => {
          let count = 0

          for (let item of this.redRawData[label]) {
            if (item.label === '') {
              item.label = 'others'
            }
            if (item.label === category.name) {
              count = item.data
              break
            }
          }

          return count
        })

        return category
      })
      return {
        datasets,
        labels
      }
    }
  },
  watch: {
    dateRange (val) {
      this.metadata = {
        startDate: val[0].toISOString(),
        endDate: val[1].toISOString()
      }
    },
    metadata () {
      this.fetch()
    },
    redData () {
      this.redDataFetchedAt = new Date()
    }
  },
  methods: {
    fetch () {
      this.fetchEventCount()
      this.fetchAgentCount()
      this.fetchEventPriorityFrequency()
      this.fetchEventCategory()
      this.fetchEventClient()
      this.fetchEventByGroup()
      this.fetchEventDateFrequency()
    },
    fetchEventCount () {
      EventApi.getEventCount(this.$http, this.metadata)
        .then(res => res.data)
        .then(data => {
          this.count.event = data.count
        })
    },
    fetchAgentCount () {
      AgentApi.getAgentCount(this.$http, this.metadata)
        .then(res => res.data)
        .then(data => {
          this.count.agent = data.count
        })
    },
    fetchEventPriorityFrequency () {
      EventApi.getEventFrequency(this.$http, { kind: 'priority', ...this.metadata })
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
    fetchEventDateFrequency () {
      EventApi.getEventDateFrequency(this.$http, this.metadata)
        .then(res => res.data)
        .then(data => {
          this.categories = []
          data.categories.forEach((e, i) => {
            let disabled = false
            if (e === '') {
              e = 'others'
              disabled = true
            }
            this.categories.push({
              name: e,
              disabled: disabled,
              backgroundColor: this.colors.default[i],
              borderColor: this.colors.default[i],
              pointBackgroundColor: this.colors.lighter[i],
              pointHoverBackgroundColor: this.colors.lighter[i],
              pointHoverBorderColor: this.colors.darker[i]
            })
          })
          this.redRawData = data.chart
        })
    },
    fetchEventClient () {
      this.clientDataFetchedAt = null
      EventApi.getEventFrequency(this.$http, { kind: 'computerName', ...this.metadata })
        .then(res => res.data)
        .then(body => {
          this.clientData = {
            data: body.map(e => { return e.data }),
            labels: body.map(e => {
              if (e.label === '') {
                return 'Others'
              }
              return e.label
            })
          }
        })
        .then(() => {
          this.clientDataFetchedAt = new Date()
        })
    },
    fetchEventByGroup () {
      this.groupDataFetchedAt = null
      EventApi.getEventFrequency(this.$http, { kind: 'group', ...this.metadata })
        .then(res => res.data)
        .then(body => {
          this.groupData = {
            data: body.map(e => { return e.data }),
            labels: body.map(e => {
              if (e.label === '') {
                return 'Non-Group'
              }
              return e.label
            })
          }
        })
        .then(() => {
          this.groupDataFetchedAt = new Date()
        })
    },
    fetchEventCategory () {
      this.categoryDataFetchedAt = null
      EventApi.getEventFrequency(this.$http, { kind: 'malwareName', ...this.metadata })
        .then(res => res.data)
        .then(body => {
          this.categoryData = {
            data: body.map(e => { return e.data }),
            labels: body.map(e => {
              if (e.label === '') {
                return 'Others'
              }
              return e.label
            })
          }
        })
        .then(() => {
          this.categoryDataFetchedAt = new Date()
        })
    },
    toggleCategory (index) {
      if (!this.categories[index]) {
        return
      }

      let category = this.categories[index]
      category.disabled = !category.disabled

      this.categories.splice(index, 1, category)
    }
  }
}
</script>
