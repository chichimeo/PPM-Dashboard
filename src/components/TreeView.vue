<template>
  <div class="tree-category">
    <div class="tree-category__header">
      <div
        v-if="!isRoot"
        class="tree-category__dash"
      />
      <div
        v-if="isFolder"
        class="tree-category__checkbox"
        @click="toggle"
      >
        <div class="square-with-icon">
          <octicon :icon="headerCheckbox" />
        </div>
      </div>
      <span
        :class="['tree-category__label', {'tree-category__label--highlight': model[trackBy]===selected}] "
        @click="emitDetail"
      >
        {{ model[label] }}
      </span>
    </div>
    <ul
      v-show="open"
      v-if="isFolder"
      :class="['tree-category__container', { 'tree-category__container--root': isRoot }]"
    >
      <tree-view
        v-for="child in model.children"
        :key="child[trackBy]"
        :selected="selected"
        :model="child"
        :label="label"
        @updateDetail="emitChildDetail"
      />
    </ul>
  </div>
</template>
<script>
import { diffAdded, diffRemoved } from 'octicons-vue'

export default {
  name: 'TreeView',
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    selected: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'name'
    },
    trackBy: {
      type: String,
      default: '_id'
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      open: true
    }
  },
  computed: {
    headerCheckbox: function () {
      return this.open ? diffRemoved : diffAdded
    },
    isFolder: function () {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    emitDetail () {
      this.$emit('updateDetail', this.model)
    },
    emitChildDetail (val) {
      this.$emit('updateDetail', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@hiendv/bem-sass";

$tree-font-size: 1.2rem;

.tree-category {
  font-size: $tree-font-size;
  @include e("header") {
    display: flex;
    align-items: center;
  }

  @include e("dash") {
    border-top: .0625rem dashed #337ab7;
    height: $tree-font-size / 2;
    margin-top: $tree-font-size / 2;
    min-width: 2rem;
    margin-right: $tree-font-size / 3;
  }

  @include e("checkbox") {
    cursor: pointer;
    margin-right: $tree-font-size / 3;
  }

  @include e("label") {
    cursor: pointer;
  }

  @include  e("label--highlight") {
    background-color: #d8ebf8;
  }

  @include e("container") {
    border-left: 1px dashed #337ab7;
    margin-left: 2rem + $tree-font-size / 3 + $tree-font-size / 2;
    padding-top: 0.75rem;

    @include m("root") {
      margin-left:  $tree-font-size / 2;
    }
  }

  .square-with-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $tree-font-size;
    height: $tree-font-size;
    color:#337ab7;
    svg {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
