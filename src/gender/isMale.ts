import { Gender } from "./GenderType"

export default function isMale(gender: Gender): boolean {
  return gender === Gender.Male
}
