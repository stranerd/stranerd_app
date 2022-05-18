export enum EventType {
	timetable = 'timetable',
	oneOff = 'oneOff'
}

export type Cron = {
	day: number
	hour: number
	minute: number
	tz: string
}
type EventTimetableType = {
	type: EventType.timetable
	start: Cron
	end: Cron
	lecturer: string
}
type EventOneOffType = {
	type: EventType.oneOff
	scheduledAt: number
}

export type EventDataType = EventTimetableType | EventOneOffType
