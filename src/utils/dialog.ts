import { Toast } from '@capacitor/toast'
import { Dialog } from '@capacitor/dialog'

type ToastArgs = {
	title: string
}

export const Notify = async (args: ToastArgs) => {
	await Toast.show({
		text: args.title,
		position: 'top',
		duration: 'long'
	})
}

type AlertArgs = ToastArgs & {
	text: string
	confirmButtonText: string
	cancelButtonText?: string
}

export const Alert = async (args: AlertArgs) => {
	const { value } = await Dialog.confirm({
		title: args.title,
		message: args.text,
		okButtonTitle: args.confirmButtonText,
		cancelButtonTitle: args.cancelButtonText ?? 'Cancel'
	})
	return value
}
