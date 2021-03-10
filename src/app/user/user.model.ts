export class AddUserModel {
  name: String
  name_en: String
  position?: Number
  attribution?: Number
  branch?: Number
  department?: Number
}

export class SearchUserModel{
  select?: String
  keyword?: String
}