export type UserType = {
  user_id: string
  account_type: string
  created_at: string
  username: string
}

export type PigTypes = {
  pig_id: number
  pig_tag: string
  assigned_farmer: string
  building: string
  pen: string
  pig_type: string
  created_at: string
  short_desc: string
  user_id: string
  date_breed: string
  farrowing_date: string
  buff_id: number
  buff_name: string
  buff_type: string
}

export type PigBuffTypes = {
  buff_id: number
  buff_name: string
  buff_type: string
  created_at: string
  user_id: string
}

export type SchedulePigsTypes = {
  sched_id: number
  sched_name: string
  pig_id: number
  sched_date: string
  created_at: string
  user_id: string
}

export type AssignedFarmerTypes = {
  farmer_id: number
  farmer_name: string

  created_at: string
  user_id: string
  number_assigned: number
}

export type NotificationTypes = {
  farrowing_date: string
  pig_tag: string
  date_breed: string
  remarks: string
}
