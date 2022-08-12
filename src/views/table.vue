<template>
  <div class="table">
    <div class="table__header">
      <div class="header__text">
        <h2>Manage your Orders</h2>
        <span
          >Manage your orders from the past 90 days - send messages, add
          tracking numbers, and more.</span
        >
      </div>
      <div class="header__actions">
        <el-input
          class="header__input"
          v-model="searchQuery"
          placeholder="Search ItemID..."
          :prefix-icon="SearchIcon"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><SearchIcon /></el-icon>
          </template>
        </el-input>
        <HideColumnsDropdown
          :dropdownItems="dropdownItems"
          :visibleColumns="visibleColumns"
          @toggleItem="toogleTableColumns"
        />
      </div>
    </div>
    <div class="table__content">
      <Table :visibleColumns="visibleColumns" :searchQuery="searchQuery" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Table from "@/components/Table.vue";
import SearchIcon from "@/components/icons/Search.vue";
import HideColumnsDropdown from "@/components/HideColumnsDropdown.vue";

export default {
  components: {
    Table,
    SearchIcon,
    HideColumnsDropdown,
  },
  setup() {
    const dropdownItems = [
      {
        key: "date_paid",
        label: "Date",
      },
      {
        key: "order",
        label: "Order",
      },
      {
        key: "buyer",
        label: "Buyer",
      },
      {
        key: "shipping_date",
        label: "Shipping date",
      },
    ];

    const visibleColumns = ref([
      "item",
      "date_paid",
      "order",
      "buyer",
      "shipping_date",
    ]);

    function toogleTableColumns(key) {
      const index = visibleColumns.value.findIndex((el) => el === key);
      if (index > -1) {
        visibleColumns.value.splice(index, 1);
      } else {
        visibleColumns.value.push(key);
      }
    }
    const searchQuery = ref("");

    return {
      searchQuery,
      visibleColumns,
      dropdownItems,
      toogleTableColumns,
    };
  },
};
</script>

<style lang="scss">
$main-color: #8854dd;
$secondary-color: #504780;
.table {
  &__header {
    display: flex;
    justify-content: space-between;
    .header {
      &__text {
        text-align: left;
        h2 {
          font-weight: 700;
          font-size: 21px;
          line-height: 152%;
          color: $main-color;
        }
        span {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 100%;
          display: block;
          margin-top: 4px;
          color: #504780CC;
        }
      }
      &__actions {
        display: flex;
        align-items: center;
      }
      &__input {
        height: 40px;
        width: 207px;
        border-radius: 8px;
        margin-right: 7px;
        .el-input__wrapper {
          background: #f8f8fc;
          border: none;
          box-shadow: none;
        }
        input {
          color: $main-color;
          &::placeholder {
            color: $main-color;
          }
        }
      }
    }
  }
  &__content {
    margin-top: 31px;
  }
}
</style>