module.exports = {
  /**
   * This function is used for filtering an object that will be used for querying
   * specific data.
   *
   * @param params contains req.query object.
   * @param properties contains a set of properties coming from a specific class.
   * e.g. properties = Object.keys(user)
   */
  queryFilters: (params, properties) => {
    // Declaration spot.
    let filters = {};
    let fieldsArray = Object.keys(params);

    // Filters properties and assigns them correct filters.
    properties.map((property) => {
      fieldsArray.map((field) => {
        if (field === property) {
          params[property].includes("{") && params[property].includes("}") 
            ? filters[property] = JSON.parse(params[property])
            : filters[property] = params[property];
        }
      });
    });

    // Returning filters.
    return filters;
  },

  /**
   * This function is used for generating an object as output that will be used
   * into a mongoose query for selecting only a specific set of fields.
   *
   * @param params contains req.query object.
   * @param properties contains a set of properties coming from a specific class.
   * e.g. properties = Object.keys(user)
   */
  querySelectors: (params, properties) => {
    // Checking the various cases of querySelectors.
    return (params.include && params.exclude) ||
      (!params.include && !params.exclude)
      ? {}
      : params.include
      ? getSelectors(params.include, 1)
      : getSelectors(params.exclude, 0);

    /**
     * This function is used for filtering a given query param and then
     * for setting it to the value, given as param, for each field.
     *
     * @param fields
     * @param value
     */
    function getSelectors(fields, value) {
      // Declaration spot.
      let selectors = {};

      // Splitting fields as they come in a form like "username,password,email".
      let fieldsArray = fields.split(",");

      // Filtering fields from properties array.
      let filteredFields = properties.filter((property) =>
        fieldsArray.includes(property)
      );

      // Setting the value for each selector.
      filteredFields.map((property) => (selectors[property] = value));

      // Returning selectors.
      return selectors;
    }
  },

  /**
   * This function is used to order documents based on certain fields.
   *
   * @param params contains req.query.sort.
   */
  querySorter: (params) => {
    if (params.sort) {
      let sortFields = params.sort.split(",");
      let sorter = sortFields.join(" ");
      return sorter;
    }

    return {};
  }
};
