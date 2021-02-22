<template>
  <div>
    <div class="field">
      <label class="label">{{ $l('components.formScheduleThreatNotidy.types','Types') }}</label>
      <div class="control">
        <v-select
          v-model="payload.categories"
          :placeholder="$l('global.all','All')"
          :multiple="true"
          :options="categoryOptions"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">{{ $l('components.formScheduleThreatNotidy.priorities','Priorities') }}</label>
      <div class="control">
        <v-select
          v-model="payload.priorities"
          :placeholder="$l('global.all','All')"
          :multiple="true"
          :options="['low', 'medium', 'high', 'critical']"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">To</label>
      <div class="control">
        <v-select
          v-model="payload.to"
          :multiple="true"
          :taggable="true"
          :options="[]"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">CC</label>
      <div class="control">
        <v-select
          v-model="payload.cc"
          :multiple="true"
          :taggable="true"
          :options="[]"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">BCC</label>
      <div class="control">
        <v-select
          v-model="payload.bcc"
          :multiple="true"
          :taggable="true"
          :options="[]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import EventApi from '@/api/Event'

export default {
  name: 'FormScheduleThreatNotify',
  components: { vSelect },
  props: {
    payload: {
      type: Object,
      default: () => {
        return {
          to: [],
          cc: [],
          bcc: [],
          categories: [],
          priorities: []
        }
      }
    }
  },
  data () {
    return {
      categoryOptions: []
    }
  },
  mounted () {
    this.fetchCategories()
  },
  methods: {
    fetchCategories () {
      EventApi.getEventFrequency(this.$http, { kind: 'category' })
        .then(res => res.data)
        .then(data => data.map(e => { return e.label }))
        .then(data => {
          this.categoryOptions = data
        })
    }
  }
}
</script>
