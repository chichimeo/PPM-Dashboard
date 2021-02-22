<template>
  <div>
    <div class="field">
      <label class="label">To</label>
      <div class="control">
        <v-select
          v-model="payload.to"
          :close-on-select="false"
          multiple
          taggable
          :options="[]"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">CC</label>
      <div class="control">
        <v-select
          v-model="payload.cc"
          :close-on-select="false"
          multiple
          taggable
          :options="[]"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">BCC</label>
      <div class="control">
        <v-select
          v-model="payload.bcc"
          :close-on-select="false"
          multiple
          taggable
          :options="[]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: 'FormScheduleMailReport',
  components: { vSelect },
  props: {
    payload: {
      type: Object,
      default: () => {
        return {
          to: [],
          cc: [],
          bcc: []
        }
      }
    }
  }
}

</script>
