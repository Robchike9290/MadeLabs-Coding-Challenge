export interface Aircraft {
  aircraftId: number,
  dailyHours: number,
  currentHours: number
}

export const AIRCRAFT: Aircraft[] = [
  {
    aircraftId: 1,
    dailyHours: 0.7,
    currentHours: 550
  },
  {
    aircraftId: 2,
    dailyHours: 1.1,
    currentHours: 200
  }
]

export interface Task {
  itemNumber: number,
  description: string,
  logDate: Date | string,
  logHours: number | null,
  intervalMonths: number | null,
  intervalHours: number | null,
  intervalMonthsNextDueDate?: Date | null,
  intervalHoursNextDueDate?: Date | null,
  nextDue?: Date | string | null
}

let tasks: Task[] = [
  {
    itemNumber: 1,
    description: "Item 1",
    logDate: new Date("2018-04-07T00:00:00"),
    logHours: null,
    intervalMonths: null,
    intervalHours: null
  },
  {
    itemNumber: 2,
    description: "Item 2",
    logDate: new Date("2018-04-07T00:00:00"),
    logHours: 100,
    intervalMonths: 12,
    intervalHours: 500
  },
  {
    itemNumber: 3,
    description: "Item 3",
    logDate: new Date("2018-06-01T00:00:00"),
    logHours: 150,
    intervalMonths: null,
    intervalHours: 400
  },
  {
    itemNumber: 4,
    description: "Item 4",
    logDate: new Date("2018-06-01T00:00:00"),
    logHours: 150,
    intervalMonths: 6,
    intervalHours: null
  }
];

export const TASKS: Task[] = tasks;