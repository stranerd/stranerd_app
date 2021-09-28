import { defineNuxtMiddleware } from 'vue'
import { useMenuModal } from '@app/hooks/core/modals'
import { analytics } from '@modules/core'
import { isClient } from '@utils/environment'

export default defineNuxtMiddleware(({ route }) => {
	useMenuModal().closeAll()
	analytics.logEvent('page_view', {
		page_path: route.fullPath
	})
	if (isClient()) window.scrollTo({ top: 0, left: 0 })
})
