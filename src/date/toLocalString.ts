export const enum Type { Date, Time, DateTime }

export default function toLocalString(date: Date, type: Type = Type.DateTime): string {
  const offsec: number = date.getTimezoneOffset() / 60 * -1 * 60 * 60 * 1000
  const [datestr, _timestr]: [string, string] = new Date(date.getTime() + offsec).toISOString().split('T') as [string, string]
  const timestr = _timestr.substr(0, 8)
  switch(type) {
    case Type.Date: return datestr
    case Type.Time: return timestr
    case Type.DateTime: return datestr + ' ' + timestr
    default: throw new Error(`Unknown type "${type}"`)
  }
}
