class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }
  filter() {
    const { page, limit, sort, fields, ...queryObj } = this.queryString
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte?|lte?)\b/g,
      match => `$${match}`
    )
    this.query.find(JSON.parse(queryStr))
    return this
  }
  sort() {
    if (this.queryString.sort) {
      this.query.sort(this.queryString.sort.split(',').join(' '))
    } else {
      this.query.sort('-createdAt')
    }
    return this
  }
  limitFields() {
    if (this.queryString.fields) {
      this.query.select(this.queryString.fields.split(',').join(' '))
    } else {
      this.query.select('-__v')
    }
    return this
  }
  paginate() {
    const page = +this.queryString.page || 1
    const limit = +this.queryString.limit || 100
    this.query.skip((page - 1) * limit).limit(limit)
    return this
  }
}

export default APIFeatures
