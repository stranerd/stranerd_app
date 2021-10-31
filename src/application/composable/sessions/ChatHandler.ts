import { ref } from "vue";
import { useRouter } from "vue-router";

export const openChat = ref(true)

export const handleOpenChat = () => {
	openChat.value = true
}

export const handleCloseChat = () => {
	openChat.value = false
}