import {SafeAreaProvider} from "react-native-safe-area-context";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    View
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useState} from "react";
import FormField from "@/components/FormField";
import {useRegisterMutation} from "@/serices/accountService";
import {jwtParse} from "@/utils/jwtParser";
import LoadingOverlay from "@/components/LoadingOverlay";
import {useAppDispatch} from "@/store";
import {saveToSecureStore} from "@/utils/secureStore";
import {setCredentials} from "@/store/slices/userSlice";
import {IUser} from "@/interfaces/account";
import {useRouter} from "expo-router";
import * as ImagePicker from 'expo-image-picker'
import {Ionicons} from "@expo/vector-icons";
import {getFileFromUriAsync} from "@/utils/getFileFromUriAsync";

const RegisterScreen = () => {

    const router = useRouter(); // Ініціалізуємо роутер

    const [form, setForm] = useState({firstName: "", lastName: "", email: "", password: ""});

    const [image, setImage] = useState<string|null>(null);

    const [register, {isLoading, error}] = useRegisterMutation();

    const dispatch = useAppDispatch(); // Використовуємо dispatch з Redux

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
    }

    const handleSubmit = async () => {
        try {
            if(image) {
                const file = await getFileFromUriAsync(image);
                //Очікує завершення результату від сервера
                const data = await register({
                    ...form,
                    //@ts-ignore
                    image: file
                }).unwrap();

                await saveToSecureStore('authToken', data.token)
                dispatch(setCredentials({ user: jwtParse(data.token) as IUser, token: data.token }));

                // Перенаправляємо користувача на сторінку профілю
                router.replace("/profile");
            }

        }
        catch {
            console.log("Login error");
        }

    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permissionResult.granted) {
            alert("Для вибору фото дай доступ до файлів");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images', // замість ImagePicker.MediaTypeOptions.Images
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if(!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView className={"flex-1"}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className={"flex-1"}>
                        <ScrollView
                            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
                        >
                            <LoadingOverlay visible={isLoading} />
                            <View className="w-full flex justify-center items-center my-6"
                                  style={{minHeight: Dimensions.get("window").height - 100}}>

                                <Text className={"text-3xl font-bold mt-4 mb-6 text-black"}>
                                    Реєстрація
                                </Text>

                                {error ?
                                    <View
                                        className="p-4 mb-4 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                                        role="alert">
                                        <Text className="font-semibold">Дані вказано не вірно!</Text>
                                    </View>
                                    : null
                                }

                                <FormField
                                    title={"Прізвище"}
                                    value={form.lastName}
                                    handleChangeText={(value: string) => handleChange("lastName", value)}
                                    placeholder={"Вкажіть прізвище"}
                                />

                                <FormField
                                    title={"Ім'я"}
                                    value={form.firstName}
                                    handleChangeText={(value: string) => handleChange("firstName", value)}
                                    placeholder={"Вкажіть ім'я"}
                                />

                                <FormField
                                    title={"Пошта"}
                                    value={form.email}
                                    handleChangeText={(value: string) => handleChange("email", value)}
                                    placeholder={"Вкажіть пошту"}
                                    keyboardType="email-address"
                                />

                                <FormField
                                    title={"Пароль"}
                                    value={form.password}
                                    handleChangeText={(value: string) => handleChange("password", value)}
                                    placeholder={"Вкажіть пароль"}
                                    secureTextEntry={true}
                                />

                                <View className={"space-y-2 w-full"}>
                                    <TouchableOpacity onPress={pickImage} className={"mt-4 p-4 bg-blue-400 rounded-xl"}>
                                        <View className="flex flex-row items-center justify-center gap-2">
                                            <Text className="text-center text-white font-psemibold">Pick an Image</Text>
                                            <Ionicons name="image" size={24} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                    {image && (
                                        <View className="w-full flex justify-center items-center">
                                            <Image source={{ uri: image }} className="w-40 h-40 rounded-full" />
                                        </View>
                                    )}
                                </View>

                                {/* Кнопка "Вхід" */}
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    className="w-full bg-blue-500 p-4 rounded-lg mt-4"
                                >
                                    <Text className="text-white text-center text-lg font-bold">
                                        Реєстрація
                                    </Text>
                                </TouchableOpacity>

                                {/* Кнопка "Реєструватися" */}
                                <TouchableOpacity
                                    onPress={() => router.replace("/login")}
                                    className="w-full bg-gray-300 p-4 rounded-lg mt-2"
                                >
                                    <Text className="text-black text-center text-lg font-medium">
                                        Акаунт уже є. Вхід
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>

                </SafeAreaView>

            </SafeAreaProvider>
        </>
    )
}

export default RegisterScreen;