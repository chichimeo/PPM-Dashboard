<template>
  <div id="visualization" />
</template>
<script>
import { Timeline } from 'vis-timeline/standalone'
import 'vis-timeline/styles/vis-timeline-graph2d.css'

export default {
  name: 'TimeLine',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    data () {
      return this.items
    }
  },
  mounted () {
    let container = document.getElementById('visualization')
    if (this.data) {
      console.log(this.data)
      let timeline = new Timeline(container, this.data, this.options)
      timeline.on('select', function (properties) {
        console.log(properties.items)
      })
    }
  }
}
</script>
