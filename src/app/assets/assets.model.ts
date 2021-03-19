export class SearchAssetsModel {
  select?: String
  status?: String
  keyword?: String
}

export class AddAssetsModel {
  snID: String
  user_id?: Number
  attribution?: Number
  branch?: Number
  department?: Number
  position?: Number
  cpu_info?: String
  disk?: String
  gpu_info?: String
  ip_address?: String
  mac_address?: String
  motherboard_info?: String
  ram?: String
  remarks?: String
  status?: Number
  createdAt: Number
  updatedAt: Number
}

export class EditAssetsModel {
  snID: String
  user_id?: Number
  attribution?: Number
  branch?: Number
  department?: Number
  position?: Number
  cpu_info?: String
  disk?: String
  gpu_info?: String
  ip_address?: String
  mac_address?: String
  motherboard_info?: String
  ram?: String
  remarks?: String
  status?: Number
  updatedAt: Number
}

export class SaveLog {
  desktop_id: Number
  user_id: Number
  start_time?: any
  end_time?: any
}