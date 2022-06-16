import { EventEntity } from '../entities/event'

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
	announcementId: string | null
}

export type EventDataType = EventTimetableType | EventOneOffType

export const isEventTimetable = (event: EventEntity): event is Omit<EventEntity, 'data'> & { data: EventTimetableType } => event.data?.type === EventType.timetable
export const isEventOneOff = (event: EventEntity): event is Omit<EventEntity, 'data'> & { data: EventOneOffType } => event.data?.type === EventType.oneOff

export const getCronOrder = (val: any) => {
	const { day = 0, hour = 0, minute = 0 } = val ?? {}
	return `${day.toString().padStart(2, '0')}${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`
}
