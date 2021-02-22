<template>
  <li class="tree-node">
    <div
      :class="['tree-node__header', {'tree-node__header--active': node[trackBy] === selection[trackBy]}] "
      @click="$emit('update:selection', node)"
    >
      <i
        v-if="isParent"
        :class="{'tree-node__header--open': node.isOpen}"
        @click.stop="toggle(node)"
      >
        <octicon :icon="node.isOpen ? diffRemoved : diffAdded" />
      </i>
      <div>
        <slot
          v-if="isParent"
          name="iconFolder"
        />
        {{ node[label] }}
      </div>
    </div>
    <ul
      v-if="node[childrenProp] && node[childrenProp].length"
      v-show="node.isOpen"
    >
      <tree-node
        v-for="(item, index) in node[childrenProp]"
        :key="index"
        :node="item"
        :selection="selection"
        :expanded="expanded"
        :label="label"
        :track-by="trackBy"
        :children-prop="childrenProp"
        @update:selection="onUpdateSelection"
      >
        <template slot="iconFolder">
          <slot name="iconFolder" />
        </template>
      </tree-node>
    </ul>
  </li>
</template>

<script>
import { diffAdded, diffRemoved } from 'octicons-vue'

export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      default: () => {}
    },
    selection: {
      type: Object,
      default: () => {}
    },
    expanded: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: 'name'
    },
    trackBy: {
      type: String,
      default: '_id'
    },
    childrenProp: {
      type: String,
      default: 'children'
    }
  },
  data () {
    return {
      diffAdded,
      diffRemoved
    }
  },
  computed: {
    isParent () {
      return this.node.children && this.node.children.length
    }
  },
  mounted () {
    if (this.isParent) {
      this.$set(this.node, 'isOpen', this.expanded)
    }
  },
  methods: {
    onUpdateSelection (val) {
      this.$emit('update:selection', val)
    },
    toggle (node) {
      if (node.hasOwnProperty('isOpen')) {
        node.isOpen = !node.isOpen
        return
      }

      this.$set(node, 'isOpen', true)
    }
  }
}
</script>
