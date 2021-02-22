<template>
  <div class="tree-view">
    <ul>
      <tree-node
        v-if="!isEmpty"
        :node="model"
        :selection="selection"
        :expanded="true"
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
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue'

export default {
  name: 'TreeView',
  components: { TreeNode },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    selection: {
      type: Object,
      default: () => {}
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
  computed: {
    isEmpty () {
      return this.node && this.node.constructor === Object && Object.keys(this.node).length === 0
    }
  },
  methods: {
    onUpdateSelection (val) {
      this.$emit('update:selection', val)
    }
  }

}
</script>

<style lang="scss">

$tree-font-size: 1rem;
$tree-line-height: $tree-font-size * 1.5;

.tree-view {
  font-size: $tree-font-size;
  min-height: $tree-line-height;

  > ul > li > .tree-node__header::after,
  > ul > li::after,
  > ul > li:before {
    border: 0
  }

  > ul {
    padding-left: 0
  }

  li {
    margin: 0;
    padding: 0.3rem;
    position: relative;
    list-style: none;
  }

  ul ul {
    padding-left: 1.5rem;
    padding-top: 0.6rem;
  }

  li span,
  li i,
  li a {
    line-height: $tree-line-height;
    vertical-align: middle;
  }
}

.tree-node {
  &:after,
  &:before {
    content: '';
    left: -1.1rem;
    position: absolute;
    right: auto;
  }

  &:before {
    border-left: 1px solid #999;
    height: 100%;
    top: -($tree-line-height/2 + 0.4rem);
    width: 1px;
  }

  &:last-child::before {
    height: $tree-line-height + 0.3rem + 0.6rem;
  }

  &__header {
    width: 100%;
    border-radius: 2px;
    display: inline-block;
    position: relative;

    &:hover {
      cursor: pointer;
      background-color: #e9ecef;
    }

    svg {
      vertical-align: baseline;
    }

    div {
      display: inline-block;
      max-width: 90%;
      padding: 0.2rem 0.3rem;
      text-decoration: none;
      vertical-align: middle;
    }

    &--open:after {
      content: '';
      left: -0.95rem;
      position: absolute;
      right: auto;
      border-right: 1px solid #999;
      height: 50%;
      top: calc(50% + 0.5rem);
      width: 1.4rem;
    }

    &:after,
    &:before {
      content: '';
      left: -1.4rem;
      position: absolute;
      right: auto;
    }

    &:before {
      border-left: 1px solid #999;
      height: 100%;
      top: -50%;
      width: 1px;
    }

    &:after {
      border-top: 1px solid #999;
      height: 1px;
      top: 50%;
      width: 1.4rem;
    }
  }

  &__header--active {
    background-color: #3273dc !important;
    color: #fff;
  }
}

.dashboard.is-dark {
  .tree-node {
    &__header {
      &:hover {
        background-color: #353945;
      }
    }
  }
}

</style>
