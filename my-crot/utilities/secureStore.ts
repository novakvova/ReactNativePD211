import * as SecureStore from 'expo-secure-store'

export const saveToSecureStore = (key: string, value: string) => {
    SecureStore.setItem(key, value)
}

export const getValueForSecureStore = (key: string) => {
    return SecureStore.getItem(key)
}

export const removeFromSecureStore = async (key: string) => {
    await SecureStore.deleteItemAsync(key)
}
