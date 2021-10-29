import { ref } from "vue";

export const openChat = ref(false)

export const handleOpenChat = () => {
	openChat.value = true
}

export const handleCloseChat = () => {
	openChat.value = false
}