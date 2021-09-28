import SweetAlert from 'sweetalert2'

type ToastArgs = {
	title: string;
	icon?: 'warning' | 'success' | 'error' | 'info';
}

export const Notify = async (args: ToastArgs) => {
	await SweetAlert.fire({
		title: args.title,
		icon: args.icon ?? 'info',
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	})
}

type AlertArgs = ToastArgs & {
	text: string;
	confirmButtonText: string;
	cancelButtonText?: string;
	showCancelButton?: boolean;
}
export const Alert = async (args: AlertArgs) => {
	const res = await SweetAlert.fire<boolean>({
		title: args.title,
		text: args.text,
		icon: args.icon ?? 'info',
		showCancelButton: args.showCancelButton ?? true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: args.confirmButtonText,
		cancelButtonText: args.cancelButtonText ?? 'Cancel'
	})
	return res.value
}
