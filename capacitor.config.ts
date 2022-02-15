const { google_client_id } = require('./env.json')

export default {
	appId: 'com.stranerd.app',
	appName: 'stranerd',
	webDir: 'dist',
	bundledWebRuntime: false,
	npmClient: 'yarn',
	plugins: {
		SplashScreen: {
			launchShowDuration: 0,
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
			serverClientId: google_client_id,
			forceCodeForRefreshToken: true
		},
		PushNotifications: {
			presentationOptions: ['badge', 'sound', 'alert']
		}
	}
}
