<template>
  <div class="details">
    <div class="details__back" @click="$router.push({ name: 'table' })">
      <img src="/img/back.png" alt="" />
      Back to table
    </div>
    <div class="details__content">
      <div class="content__img">
        <img src="/img/table-img.png" alt="" />
      </div>
      <div class="content__details">
        <h2 style="max-width: 500px; line-height: 120%;">
          {{ data.name }}
        </h2>
        <div class="content__main-info details__small">
          <div class="details__strong">ITEM ID: {{ data.item_id }}</div>
          <div class="details__strong">SKU: {{ data.sku }}</div>
          <div class="details__strong">QTY: {{ data.qty }}</div>
        </div>
        <table class="vertical-table" cellspacing="0">
          <tr>
            <th>Order ID</th>
            <td>{{ data.order_id }}</td>
          </tr>
          <tr>
            <th>Transaction ID</th>
            <td>{{ data.transaction_id }}</td>
          </tr>
          <tr>
            <th>Transaction price</th>
            <td>{{ data.price }}</td>
          </tr>
          <tr>
            <th>Transaction status</th>
            <td>{{ data.status }}</td>
          </tr>
          <tr>
            <th>Date paid</th>
            <td>{{ data.date_paid }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const data = computed(() => {
      return (
        store.state.currentProduct ||
        store.state.products.find((el) => el.item_id === route.params.id)
      );
    });

    return {
      data,
    };
  },
};
</script>



<style lang="scss">
$main-color: #8854dd;
$secondary-color: #504780;
$border: 1px solid rgba(80, 71, 128, 0.09);
$border-radius: 8px;
.vertical-table {
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  border-top: $border;
  th {
    background: #f2f2fe;
  }
  td {
    border-right: $border;
  }
  th,
  td {
    padding: 8px 16px;
    border-bottom: $border;
  }
  tr {
    &:first-of-type {
      th {
        border-top-left-radius: $border-radius;
      }
      td {
        border-top-right-radius: $border-radius;
      }
    }
    &:last-of-type {
      th {
        border-bottom-left-radius: $border-radius;
      }
      td {
        border-bottom-right-radius: $border-radius;
      }
    }
  }
}
.details {
  &__back {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    img {
      width: 14px;
      margin-right: 4px;
    }
  }
  &__header {
    text-align: left;
  }
  &__strong {
    font-weight: 700;
  }
  &__small {
    font-size: 14px;
  }
  &__content {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    .content {
      &__img {
        border-radius: $border-radius;
        width: 500px;
        max-width: 50%;
        height: 500px;
        background:  rgba(80, 71, 128, 0.09);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__details {
        text-align: left;
        margin-left: 70px;
        margin-top: 50px;
        & > div {
          margin-bottom: 15px;
          padding: 6px 0;
          width: fit-content;
        }
      }
      &__main-info {
        display: flex;
        margin: 6px 0 12px;
        & > div {
          margin-right: 24px;
          font-size: 13px;
          color: $main-color;
        }
      }
    }
  }
  table {
    font-size: 14px;
    color: $secondary-color;
    thead {
        th .cell {
        white-space: nowrap;
        }
    }
  }
}
</style>