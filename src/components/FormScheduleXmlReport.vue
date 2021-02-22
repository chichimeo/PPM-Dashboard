<template>
  <div>
    <div class="field">
      <label class="label">{{ $l('components.formScheduleXmlReport.types','Types') }}</label>
      <div class="control">
        <v-select
          v-model="payload.categories"
          :multiple="true"
          :placeholder="$l('global.all','All')"
          :options="categoryOptions"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">{{ $l('components.formScheduleXmlReport.priorities','Priorities') }}</label>
      <div class="control">
        <v-select
          v-model="payload.priorities"
          :multiple="true"
          :placeholder="$l('global.all','All')"
          :options="['low', 'medium', 'high', 'critical']"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">{{ $l('components.formScheduleXmlReport.group','Group') }}</label>
      <div class="control">
        <v-select
          v-model="selectedGroup"
          :placeholder="$l('global.all','All')"
          label="name"
          :options="groupOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import GroupApi from '@/api/Group'
import EventApi from '@/api/Event'

export default {
  name: 'FormScheduleXmlReport',
  components: { vSelect },
  props: {
    payload: {
      type: Object,
      default: () => {
        return {
          groupId: '',
          categories: [],
          priorities: []
        }
      }
    }
  },
  data () {
    return {
      selectedGroup: null,
      groupOptions: [],
      categoryOptions: []
    }
  },
  watch: {
    selectedGroup: {
      handler: function (val, oldVal) {
        this.payload.groupId = val._id || ''
      },
      deep: true
    }
  },
  mounted () {
    this.fetchCategories()
    this.fetchGroups()
      .then(() => {
        if (this.payload.groupId) {
          this.selectedGroup = this.groupOptions.find(e => e._id === this.payload.groupId)
        }
      })
  },
  methods: {
    fetchCategories () {
      EventApi.getEventFrequency(this.$http, { kind: 'category' })
        .then(res => res.data)
        .then(data => data.map(e => { return e.label }))
        .then(data => {
          this.categoryOptions = data
        })
    },
    fetchGroups () {
      return GroupApi.getGroupList(this.$http)
        .then(data => {
          let listGroup = data
          listGroup.unshift({ _id: '', name: 'All', agentMacs: [] })
          this.groupOptions = listGroup
        })
    }
  }
}

</script>
