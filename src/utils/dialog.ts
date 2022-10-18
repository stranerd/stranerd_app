import { Toast } from '@capacitor/toast'
import { Dialog } from '@capacitor/dialog'
import SweetAlert from 'sweetalert2'
import { isWeb } from '@utils/constants'

type ToastArgs = {
	title: string
}

export const Notify = async (args: ToastArgs) => {
	isWeb ? await SweetAlert.fire({
		title: args.title,
		icon: 'info',
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	}) : await Toast.show({
		text: args.title,
		position: 'top',
		duration: 'short'
	})
}

type AlertArgs = ToastArgs & {
	confirmButtonText: string
	cancelButtonText?: string
}

export const Alert = async (args: AlertArgs) => {
	const { value } = await Dialog.confirm({
		title: '',
		message: args.title,
		okButtonTitle: args.confirmButtonText,
		cancelButtonTitle: args.cancelButtonText ?? 'Cancel'
	})
	return value
}
