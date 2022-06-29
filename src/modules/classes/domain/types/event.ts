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
export type EventTimetableType = {
	type: EventType.timetable
	start: Cron
	end: Cron
	lecturer: string
}
export type EventOneOffType = {
	type: EventType.oneOff
	scheduledAt: number
	announcementId: string | null
}

export type EventDataType = EventTimetableType | EventOneOffType

export const getCronOrder = (val: any) => {
	const { day = 0, hour = 0, minute = 0 } = val ?? {}
	return `${day.toString().padStart(2, '0')}${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`
}
