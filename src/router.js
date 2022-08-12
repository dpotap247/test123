import { createWebHistory, createRouter } from "vue-router"
import empty from "@/views/empty.vue"
import table from "@/views/table.vue"
import details from "@/views/details.vue"

const routes = [
  {
    path: '/',
    redirect: '/table'
  },
  {
    path: "/table",
    name: "table",
    component: table,
  },
  {
    path: "/table/:id",
    name: "table_details",
    component: details,
  },
  {
    path: "/help",
    name: "help",
    component: empty,
  },
  {
    path: "/box",
    name: "box",
    component: empty,
  },
  {
    path: "/faq",
    name: "faq",
    component: empty,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router