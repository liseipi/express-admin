export class SearchMonitorModel {
  select?: String
  status?: String
  keyword?: String
}

export class AddMonitorModel {
  snID: String
  user_id?: Number
  attribution?: Number
  branch?: Number
  department?: Number
  position?: Number
  details?: string
  brand?: string
  model?: string
  status?: Number
  createdAt: Number
  updatedAt: Number
}

export class UpdateMonitorModel {
  snID: String
  user_id?: Number
  attribution?: Number
  branch?: Number
  department?: Number
  position?: Number
  details?: string
  brand?: string
  model?: string
  status?: Number
  updatedAt: Number
}

export class SaveLog {
  monitor_id: Number
  user_id: Number
  start_time?: any
  end_time?: any
}