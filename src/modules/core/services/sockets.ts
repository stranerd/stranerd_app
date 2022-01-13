import io, { Socket } from 'socket.io-client'
import { getTokens } from '@utils/tokens'
import { apiBases } from '@utils/environment'
import { Listeners, StatusCodes } from '@modules/core'

let socket = null as Socket<any, any> | null
const getSocketBaseAndPath = () => {
	const stranerdBase = apiBases.STRANERD
	const splitOnDoubleSlash = stranerdBase.split('//')
	const http = splitOnDoubleSlash[0]
	const minusHttp = splitOnDoubleSlash[1]
	const minusDomain = [null, ...minusHttp.split('/').slice(1), null].join('/')
	const path = minusDomain + 'socket.io'
	const domain = [http, minusHttp.split('/')[0]].join('//')
	return { path, domain }
}

export enum EmitTypes {
	created = 'created',
	updated = 'updated',
	deleted = 'deleted'
}

type SocketReturn = { code: StatusCodes, message: string, channel: string }

export async function listenOnSocket<Model> (channel: string, listeners: Listeners<Model>) {
	const { accessToken } = await getTokens()
	// @ts-ignore
	if (!socket || (!socket.auth.token && accessToken)) {
		socket = io(getSocketBaseAndPath().domain, {
			path: getSocketBaseAndPath().path,
			auth: {
				token: accessToken,
				app: 'stranerd'
			}
		})
	}

	let finalChannel = ''
	socket.emit('join', { channel }, (res: SocketReturn) => {
		finalChannel = res.channel
		// eslint-disable-next-line no-console
		if (res.code !== StatusCodes.Ok) return
		socket?.on(finalChannel, async (data: { channel: string, type: EmitTypes, data: Model }) => {
			if (finalChannel !== data.channel) return
			await listeners[data.type]?.(data.data)
		})
	})
	return () => {
		try {
			socket?.emit('leave', { channel: finalChannel }, (_: SocketReturn) => {
				return _
			})
		} catch (e) {
			return e
		}
	}
}

export async function closeSocket () {
	socket?.disconnect()
}
