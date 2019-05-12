import { Gender } from "../gender/GenderType"

export type IDCard = {
  gender: Gender,
  code: number,
  date: Date,
  key: string
}
