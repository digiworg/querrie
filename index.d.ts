declare namespace querrie {
  function queryFilters(params: any, properties: string[] | string): any;
  function querySelectors(params: any, properties: string[] | string): any;
  function querySorter(params: any): any;
}

export = querrie;