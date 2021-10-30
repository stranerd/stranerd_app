import { ref } from 'vue'

export const openChat = ref(true)

export const handleOpenChat = () => {
	openChat.value = true
}

export const handleCloseChat = () => {
	openChat.value = false
}