import { HttpClient } from '@modules/core'
import { definePlugin } from '@app/plugins/index'
import { useAuth } from '@app/composable/auth/auth'

export const ipAddressGetter = definePlugin(async () => {
	const geopluginApiSite = 'https://ssl.geoplugin.net/json.gp?k=5c113cbeb772aab6'
	const res = await new HttpClient('').get<{}, any>(geopluginApiSite, {}).catch(() => null)
	if (!res) return

	const {
		geoplugin_query: ip,
		geoplugin_city: city,
		geoplugin_regionName: state,
		geoplugin_regionCode: stateCode,
		geoplugin_countryName: country,
		geoplugin_countryCode: countryCode,
		geoplugin_continentName: continent,
		geoplugin_continentCode: continentCode,
		geoplugin_latitude: latitude,
		geoplugin_longitude: longitude,
		geoplugin_timezone: timezone,
		geoplugin_currencyCode: currencyCode,
		geoplugin_currencySymbol: currencySymbol
	} = res

	useAuth().setUserLocation({
		ip, latitude, longitude,
		city, state, stateCode, country, countryCode, continent,
		continentCode, currencyCode, currencySymbol, timezone
	})
})
