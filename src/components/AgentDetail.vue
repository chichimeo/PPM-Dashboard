<template>
  <div class="agent-detail">
    <div class="columns is-multiline">
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.ip','IP') }}</label>
        <span>{{ detailAgent.ip }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.agentIP','Agent IP') }}</label>
        <span>{{ detailAgent.agentIP }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.mac','Mac') }}</label>
        <span>{{ detailAgent.mac }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.macNetwork','Mac Network') }}</label>
        <span>{{ detailAgent.macNetwork }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.computerName','computer Name') }}</label>
        <span>{{ detailAgent.computerName }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.operatingSystem','Operating System') }}</label>
        <span>{{ detailAgent.os }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.userName','Username') }}</label>
        <span>{{ (detailAgent.username ? detailAgent.username.join(', ') : '&nbsp;') }}</span>
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
          v-else-if="outdated"
          class="tag is-danger"
        >
          {{ detailAgent.version }}
        </span>
        <span v-else>
          {{ detailAgent.version }}
        </span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.installTime','Time Install') }}</label>
        <span>{{ renderTime(detailAgent.timeInstall) }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.lastUpdate','Last Update') }}</label>
        <span>{{ renderTime(detailAgent.lastUpdate) }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.autoProtect','Auto Protect') }}</label>
        <span>{{ detailAgent.autoProtect }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.enableFirewall','Enable Firewall') }}</label>
        <span>{{ detailAgent.enableFirewall }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.lastConnection','Last Connection') }}</label>
        <span>{{ renderTime(detailAgent.lastConnection) }}</span>
      </div>
      <div class="column is-6">
        <label class="label">{{ $l('components.agents.vulnerabilities','Vulnerabilities') }}</label>
        <span>{{ (detailAgent.vulnerabilities ? detailAgent.vulnerabilities.join(', ') : '&nbsp;') }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Format from 'date-fns/format'

export default {
  props: {
    detailAgent: {
      type: Object,
      default: () => {
        return {
          agentIP: '',
          autoProtect: true,
          computerName: '',
          enableFirewall: false,
          groupKey: '',
          ip: '',
          lastConnection: new Date(),
          lastUpdate: new Date(),
          mac: '',
          macNetwork: '',
          os: '',
          timeInstall: new Date(),
          uninstalled: false,
          username: [],
          version: '',
          vulnerabilities: []
        }
      }
    },
    outdated: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    renderTime (time) {
      return Format(time, 'DD/MM/YYYY HH:mm')
    } }
}
</script>
<style lang="scss">
  .agent-detail {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    background: #f0f1fa;
  }
  .dashboard.is-dark .agent-detail {
    background: #1f2128;
  }
</style>
