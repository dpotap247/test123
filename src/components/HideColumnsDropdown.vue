<template>
  <el-dropdown :hide-on-click="false" trigger="click">
    <span class="el-dropdown-link">
      <Options />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in dropdownItems"
          :key="index"
          @click="$emit('toggleItem', item.key)"
        >
          <div class="el-dropdown-item__text">
            {{ item.label }}
          </div>
          <img
            class="el-dropdown-item__icon"
            src="/img/closed-eye.png"
            alt=""
            v-if="!visibleColumns.includes(item.key)"
          />
          <img
            class="el-dropdown-item__icon"
            src="/img/open-eye.png"
            alt=""
            v-else
          />
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import Options from "@/components/icons/Options.vue";

export default {
  components: {
    Options,
  },
  props: {
    dropdownItems: {
      type: Array,
      default: () => [],
    },
    visibleColumns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.el-dropdown-menu {
  width: 200px;
  color: #504780;
  .el-dropdown-item {
    &__icon {
      width: 20px;
    }
    &__text {
      width: 180px;
      margin-right: 5px;
      color: #504780;
      font-family: var(--el-font-family);
    }
  }
}
</style>
