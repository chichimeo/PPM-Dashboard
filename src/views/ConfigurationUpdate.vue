<template>
  <section class="section">
    <box>
      <div slot="header">
        {{ $l('components.configurationUpdate.offlineUpdate','Offline Update') }}
      </div>
      <div class="columns">
        <div class="column is-half">
          <tabs :theme="$_ui_theme_tabs">
            <tab :title="$l('components.configurationUpdate.agent','Agent')">
              <form id="agentUpload">
                <div class="field">
                  <label class="label">{{ $l('components.configurationUpdate.agentUpdateFile','Agent Update File') }}</label>
                  <div class="file is-boxed has-name">
                    <label class="file-label">
                      <input
                        type="file"
                        class="file-input"
                        name="agentUpdateFile"
                        @change="onAgentFileChange"
                      >
                      <span class="file-cta">
                        <span class="file-icon">
                          <octicon
                            :scale="2"
                            :icon="cloudUpload"
                          />
                        </span>
                        <span class="file-label">
                          {{ $l('components.configurationUpdate.chooseAFile','Choose a file...') }}
                        </span>
                      </span>
                      <span class="file-name">
                        {{ agentFilenName ? agentFilenName : $l('components.configurationUpdate.noFileChosen','No file chosen') }}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  :class="['button', 'is-primary', {'is-loading': isLoading}]"
                  @click.prevent="uploadAgent"
                >
                  {{ $l('global.update','Update') }}
                </button>
              </form>
            </tab>
          </tabs>
        </div>

        <div class="column is-half">
          <tabs :theme="$_ui_theme_tabs">
            <tab :title="$l('components.configurationUpdate.database','Database')">
              <form id="dbUpload">
                <div class="field">
                  <label class="label">{{ $l('components.configurationUpdate.dashboardUpdateFile','Dashboard Update File') }}</label>
                  <div class="file is-boxed has-name">
                    <label class="file-label">
                      <input
                        type="file"
                        class="file-input"
                        name="dbUpdateFile"
                        @change="onDBFileChange"
                      >
                      <span class="file-cta">
                        <span class="file-icon">
                          <octicon
                            :scale="2"
                            :icon="cloudUpload"
                          />
                        </span>
                        <span class="file-label">
                          {{ $l('components.configurationUpdate.chooseAFile','Choose a file...') }}
                        </span>
                      </span>
                      <span class="file-name">
                        {{ dbFileName ? dbFileName : $l('components.configurationUpdate.noFileChosen','No file chosen') }}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  :class="['button', 'is-primary', {'is-loading': isLoading}]"
                  @click.prevent="uploadDb"
                >
                  {{ $l('global.update','Update') }}
                </button>
              </form>
            </tab>
          </tabs>
        </div>
      </div>
    </box>
  </section>
</template>

<script>
import { Tabs, Tab } from '@cyradar/ui'
import { cloudUpload } from 'octicons-vue'
import UpdateApi from '@/api/Update'

export default {
  name: 'ConfigurationUpdate',
  components: { Tabs, Tab },
  data () {
    return {
      cloudUpload,
      isLoading: false,
      agentFilenName: '',
      dbFileName: ''
    }
  },
  methods: {
    onAgentFileChange (event) {
      let fileData = event.target.files[0]
      this.agentFilenName = fileData.name
    },
    onDBFileChange (event) {
      let fileData = event.target.files[0]
      this.dbFileName = fileData.name
    },
    uploadAgent () {
      let formData = new FormData(document.getElementById('agentUpload'))

      this.isLoading = true

      UpdateApi.updateAgent(this.$http, formData)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message || 'Success',
            duration: 10000
          })
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    uploadDb () {
      let formData = new FormData(document.getElementById('dbUpload'))

      this.isLoading = true

      UpdateApi.updateDb(this.$http, formData)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message || 'Success',
            duration: 10000
          })
        })
        .finally(_ => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style>

</style>
