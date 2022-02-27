const { google_client_ids } = require('./env.json')

export default {
	appId: 'com.stranerd.app',
	appName: 'Stranerd',
	webDir: 'dist',
	bundledWebRuntime: false,
	npmClient: 'yarn',
	plugins: {
		SplashScreen: {
			launchAutoHide: false,
			backgroundColor: '#ffffffff',
			androidSplashResourceName: 'splash',
			androidScaleType: 'CENTER_CROP',
			showSpinner: true,
			androidSpinnerStyle: 'large',
			iosSpinnerStyle: 'small',
			spinnerColor: '#999999',
			splashFullScreen: true,
			splashImmersive: true,
			layoutName: 'launch_screen',
			useDialog: true
		},
		GoogleAuth: {
			scopes: ['profile', 'email'],
			serverClientId: google_client_ids.web,
			androidClientId: google_client_ids.web,
			iosClientId: google_client_ids.ios,
			forceCodeForRefreshToken: true
		},
		PushNotifications: {
			presentationOptions: ['badge', 'sound', 'alert']
		}
	}
}
