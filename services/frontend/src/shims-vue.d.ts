declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

interface JQuery {
  flightIndicator(type: string): any;
}

interface JQueryStatic {
  flightIndicator(selector: string, type: string): any;
}
