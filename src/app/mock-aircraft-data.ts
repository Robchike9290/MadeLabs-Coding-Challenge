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
  logDate: Date,
  logHours: number | null,
  intervalMonths: number | null,
  intervalHours: number | null,
  intervalMonthsNextDueDate?: Date | null,
  intervalHoursNextDueDate?: Date | null,
  nextDue?: Date | null
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

function addDays(date: Date, days: number) {
  var result: Date = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

for (let i: number = 0; i < tasks.length; i++) {
  let task: Task = tasks[i];
  let today: Date = new Date(2018, 6, 19);
  let currentHours: number = 550;
  let dailyHours: number = 0.7;

  let daysRemainingByHoursInterval: number | null = null;
  let intervalHoursNextDueDate: Date | null = null;
  let intervalMonthsNextDueDate: Date | null = null;
  let nextDue: Date | null = null;

  if (task.intervalMonths) {
    intervalMonthsNextDueDate = new Date(task.logDate.setMonth(task.logDate.getMonth() + task.intervalMonths));
  }

  if (task.logHours && task.intervalHours && currentHours && dailyHours) {
    daysRemainingByHoursInterval = Math.round(((task.logHours + task.intervalHours) - currentHours) / dailyHours);
    intervalHoursNextDueDate = addDays(today, daysRemainingByHoursInterval);
  }

  tasks[i].intervalMonthsNextDueDate = intervalMonthsNextDueDate;
  tasks[i].intervalHoursNextDueDate = intervalHoursNextDueDate;

  if (intervalHoursNextDueDate && intervalMonthsNextDueDate) {
    let intervalHoursNumber: number | null = intervalHoursNextDueDate.getTime();
    let intervalMonthsNumber: number | null = intervalMonthsNextDueDate.getTime();
    nextDue = intervalMonthsNumber < intervalHoursNumber ? intervalMonthsNextDueDate : intervalHoursNextDueDate;
  } else if (intervalHoursNextDueDate) {
    nextDue = intervalHoursNextDueDate;
  } else if (intervalMonthsNextDueDate) {
    nextDue = intervalMonthsNextDueDate;
  }

  tasks[i].nextDue = nextDue;
}

export const TASKS: Task[] = tasks;