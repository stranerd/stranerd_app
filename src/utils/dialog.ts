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
	const { value } = isWeb ? await SweetAlert.fire<boolean>({
		title: args.title,
		text: args.title,
		icon: 'info',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: args.confirmButtonText,
		cancelButtonText: args.cancelButtonText ?? 'Cancel'
	}) : await Dialog.confirm({
		title: args.title,
		message: args.title,
		okButtonTitle: args.confirmButtonText,
		cancelButtonTitle: args.cancelButtonText ?? 'Cancel'
	})
	return value
}
