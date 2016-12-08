import { Expression } from './expression'
import build from './build'

export default class Retrieve extends Expression {
  constructor (json) {
    super(json)
    this.dataType = json.dataType
    this.templateId = json.templateId
    this.codeProperty = json.codeProperty
    this.codes = build(json.codes)
    this.dateProperty = json.dateProperty
    this.dateRange = build(json.dateRange)
  }

  exec (ctx) {
    let records = ctx.findRecords(this.templateId)
    if (this.codes) {
      const valueSet = this.codes.exec(ctx)
      records = records
        .filter(r => valueSet.hasCode(r.getCode(this.codeProperty)))
        .map(r => r)
    }
    if (this.dateRange) {
      const range = this.dateRange.exec(ctx)
      records = records
        .filter(r => range.includes(r.getDateOrInterval(this.dateProperty)))
        .map(r => r)
    }

    return records
  }
}
