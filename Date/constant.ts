export const enum DateConstant {
  MillisecondsOfSecond = 1000,
  SecondsOfMinute = 60,
  MinutesOfHour = 60,
  HoursOfDay = 24,
  MonthsOfYear = 12,
  DaysOfWeek = 7,
  DaysOfYear = 365,
  DaysOfLeapYear = DaysOfYear + 1,
  WeeksOfMonth = 4,
  WeeksOfYear = 52,
  QuartersOfYear = 4,
  Seconds = MillisecondsOfSecond,
  MinutsSeconds = MillisecondsOfSecond * SecondsOfMinute,
  HourSeconds = MinutsSeconds * MinutesOfHour,
  DaySeconds = HourSeconds * HoursOfDay,
  WeekDaySeconds = DaySeconds * DaysOfWeek
}

export const enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export const enum TimezoneFormat {
  Hour,
  ISO8601,
  RFC2822
}

export const enum Quarter {
  First,
  Second,
  Third,
  Fourth
}

export const enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export const enum Midday {
  AM,
  PM
}

export const WeekDayNames: { [K in WeekDay]: string } = {
  [WeekDay.Sunday]: 'Sunday',
  [WeekDay.Monday]: 'Monday',
  [WeekDay.Tuesday]: 'Tuesday',
  [WeekDay.Wednesday]: 'Wednesday',
  [WeekDay.Thursday]: 'Thursday',
  [WeekDay.Friday]: 'Friday',
  [WeekDay.Saturday]: 'Saturday'
}

export const MonthNames: { [K in Month]: string } = {
  [Month.January]: 'January',
  [Month.February]: 'February',
  [Month.March]: 'March',
  [Month.April]: 'April',
  [Month.May]: 'May',
  [Month.June]: 'June',
  [Month.July]: 'July',
  [Month.August]: 'August',
  [Month.September]: 'September',
  [Month.October]: 'October',
  [Month.November]: 'November',
  [Month.December]: 'December'
}

export const MiddayNames: { [K in Midday]: string } = {
  [Midday.AM]: 'AM',
  [Midday.PM]: 'PM'
}
