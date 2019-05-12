import { Gender } from "./GenderType"

export default function isFemale(gender: Gender): boolean {
  return gender === Gender.Male
}
