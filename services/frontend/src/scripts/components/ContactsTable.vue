<template>
  <div>
    Company: All<el-button circle size="mini" icon="el-icon-arrow-down"></el-button>
    <el-table
      :data="results"
      :default-sort="{prop: 'lastname', order: 'ascending' }"
    >
      <el-table-column
        prop="firstname"
        sortable
        label="First"
      ></el-table-column>
      <el-table-column
        prop="lastname"
        sortable
        label="Last"
      ></el-table-column>
      <el-table-column
        prop="phone"
        sortable
        label="phone"
      ></el-table-column>
      <el-table-column
        prop="email"
        sortable
        label="Email"
      ></el-table-column>
      <el-table-column
        prop="role"
        sortable
        label="Role"
      ></el-table-column>
      <el-table-column
        prop="likelyhood"
        sortable
        label="%"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {

  }
})
export default class ContactsTable extends Vue {
  @Prop()
  private msg!: string;

  private results: any[] = [];

  private mounted() {
    console.log("fetch data")
    window["stitchDb"].listContacts().then(x => {
      console.log("got data", x)
      this.results = x;
    });
  }
}
</script>
