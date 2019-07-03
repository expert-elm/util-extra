export const enum DateFormat { Date, Time, DateTime }

export default function toLocalString(date: Date, type: DateFormat = DateFormat.DateTime): string {
  const offsec: number = date.getTimezoneOffset() / 60 * -1 * 60 * 60 * 1000
  const [datestr, _timestr]: [string, string] = new Date(date.getTime() + offsec).toISOString().split('T') as [string, string]
  const timestr = _timestr.substr(0, 8)
  switch(type) {
    case DateFormat.Date: return datestr
    case DateFormat.Time: return timestr
    case DateFormat.DateTime: return datestr + ' ' + timestr
    default: throw new Error(`Unknown type "${type}"`)
  }
}
