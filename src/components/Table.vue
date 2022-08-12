<template>
  <div class="table">
    <el-table class="el-table" :data="filteredData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column
        prop="date"
        sortable
        label="Item"
        min-width="250"
        v-if="visibleColumns.includes('item')"
      >
        <template #default="scope">
          <div class="el-table__item">
            <img :src="scope.row.img" alt="product image" />
            <div>
              <div class="el-table__nowrap">{{ scope.row.name }}</div>
              <div class="el-table__strong el-table__link">
                Item ID: {{ scope.row.item_id }}
              </div>
              <div>
                <span class="el-table__strong">SKU:</span> {{ scope.row.sku }}
              </div>
              <div>
                <span class="el-table__strong">Qty:</span> {{ scope.row.qty }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="date_paid"
        sortable
        label="Date"
        width="110"
        v-if="visibleColumns.includes('date_paid')"
      />
      <el-table-column
        sortable
        label="Order Details"
        min-width="250"
        v-if="visibleColumns.includes('order')"
      >
        <template #default="scope">
          <div>
            <div class="el-table__link">Order ID: {{ scope.row.order_id }}</div>
            <div>Transaction ID: {{ scope.row.transaction_id }}</div>
            <div>Transaction price: {{ scope.row.price }}</div>
            <div>Transaction status: {{ scope.row.status }}</div>
            <div>Date paid: {{ scope.row.date_paid }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="profit"
        sortable
        label="Profit"
        min-width="120"
        v-if="visibleColumns.includes('profit')"
      />
      <el-table-column
        sortable
        label="Buyer Details"
        min-width="200"
        v-if="visibleColumns.includes('buyer')"
      >
        <template #default="scope">
          <div>
            <div>Name: {{ scope.row.buyer_name }}</div>
            <div>
              Username:
              <span class="el-table__link">{{ scope.row.buyer_username }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="shipping_date"
        sortable
        label="Shipping Date"
        min-width="200"
        v-if="visibleColumns.includes('shipping_date')"
      />
      <el-table-column label="Actions" width="110">
        <template #default="scope">
          <div class="el-table__actions">
            <el-button
              class="el-table__icon el-table__details-icon"
              @click="goToDetails(scope.row)"
              ><DetailsIcon
            /></el-button>
            <el-buttton
              class="el-table__icon el-table__trash-icon"
              @click="removeItem(scope.row)"
              ><TrashIcon
            /></el-buttton>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      layout="prev, pager, next"
      :total="searchQuery && filteredData.length || tableData.length"
      :page-size="perPage"
      class="mt-4"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TrashIcon from "@/components/icons/Trash.vue";
import DetailsIcon from "@/components/icons/Details.vue";
import axios from "axios";

export default {
  components: {
    TrashIcon,
    DetailsIcon,
  },
  props: {
    visibleColumns: {
      type: Array,
      default: () => ["item", "date_paid", "order", "buyer", "shipping_date"],
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const tableData = ref([]);

    loadData();
    async function loadData() {
      if (store.state.products.length) {
        tableData.value = store.state.products;
        return;
      }
      try {
        const { data } = await axios.get("/data.json");
        tableData.value = data;
        store.commit("setProducts", data);
      } catch (err) {
        console.log(err);
      }
    }

    const page = ref(1);
    const perPage = 4;
    const filteredData = computed(() => {
      let data = JSON.parse(JSON.stringify(tableData.value));
      const searchQuery = props.searchQuery.toLowerCase();
      if (searchQuery) {
        data = data.filter((el) => {
          const name = el.name.toLowerCase();
          const orderId = el.item_id.toString();
          if (name.includes(searchQuery) || orderId.includes(searchQuery)) {
            return el;
          }
        });
      }
      const start = (page.value - 1) * perPage;
      const end = start + perPage;
      return data.slice(start, end);
    });

    function changePage(value) {
      page.value = value;
    }

    function removeItem(item) {
      const index = tableData.value.findIndex(
        (el) => el.item_id === item.item_id
      );
      if (index > -1) tableData.value.splice(index, 1);
      store.commit("setProducts", tableData.value);
    }

    function goToDetails(item) {
      router.push({ name: "table_details", params: { id: item.item_id } });
      store.commit("setCurrentProduct", item);
    }

    return {
      goToDetails,
      changePage,
      removeItem,
      filteredData,
      tableData,
      perPage,
      page,
    };
  },
};
</script>

<style lang="scss">
$main-color: #8854dd;
$secondary-color: #504780;
$border: 1px solid rgba(80, 71, 128, 0.09);
$border-radius: 8px;
.el-table {
  border-right: $border;
  border-left: $border;
  border-top-left-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  &__strong {
    font-weight: 700;
  }
  &__link {
    color: $main-color;
  }
  &__nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 215px;
  }
  &__actions {
    display: flex;
    align-items: center;
  }
  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    img {
      margin-right: 18px;
    }
  }
  &__icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius;
    margin-left: 7px;
    border: none;
    cursor: pointer;
    &.el-table__details-icon {
      background: rgba(241, 240, 254, 0.7);
      margin-left: 0;
    }
    &.el-table__trash-icon {
      background: #8854dd;
    }
  }
  thead {
    th.el-table__cell {
      background: #f2f2fe;
      color: #504780;
      text-align: center;
      &:first-of-type {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
      }
      &:last-of-type {
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
        border-left: $border;
      }
      &.el-table-column--selection {
        // text-align: left;
        .cell {
          padding: 0;
        }
      }
    }
  }
  tbody {
    td.el-table__cell {
      color: #504780;
      font-size: 12px;
      padding: 6px 15px;
      .cell {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 20px;
      }
      &:nth-of-type(2) {
        padding-left: 0;
      }
      &:last-of-type {
        border-left: $border;
      }
    }
  }
  .el-table__cell {
    padding: 15px 15px 15px 15px; // .cell {
    //   white-space: nowrap;
    // }
  }
  .sort-caret {
    &.ascending {
      border-bottom-color: $secondary-color;
    }
    &.descending {
      border-top-color: $secondary-color;
    }
  }
  .ascending {
    .sort-caret {
      &.ascending {
        border-bottom-color: $main-color;
      }
    }
  }
  .descending {
    .sort-caret {
      &.descending {
        border-top-color: $main-color;
      }
    }
  }
}

.el-pagination {
  width: fit-content;
  box-shadow: 0px 2px 5px 0px #93aad00a;
  border: 1px solid rgba(167, 183, 210, 0.19);
  border-radius: $border-radius;
  padding: 10px;
  .btn-next,
  .btn-prev {
    background: #f4f7fa;
    border-radius: 50%;
    &:hover {
      color: #424e86;
      &:disabled {
        color: var(--el-pagination-button-disabled-color);
      }
    }
  }
  .el-pager {
    li {
      color: #424e86;
      &.is-active {
        border-radius: 50%;
        background: $main-color;
        color: #fff;
      }
    }
  }
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: $main-color;
  border-color: $main-color;
}
.table {
  .el-pagination {
    margin-top: 40px;
  }
}
</style>