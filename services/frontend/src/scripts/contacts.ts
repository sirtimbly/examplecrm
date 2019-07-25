import Vue from "vue";
import Table from "element-ui/lib/table";
import TableColumn from "element-ui/lib/table-column";
import Button from "element-ui/lib/button";
import ContactsTable from "./components/ContactsTable.vue";

Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);

const app = new Vue({
  el: "#contactlist",
  render: h => h(ContactsTable)
});
