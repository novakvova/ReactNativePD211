import { View, Text, StyleSheet } from "react-native";
import {useAppSelector} from "@/store";
import {useGetCategoriesQuery} from "@/serices/categoryService";


const CategoriesScreen = () => {

    const token = useAppSelector((state) => state.user.token);
    const {data, error} = useGetCategoriesQuery(token);
    console.log("Data in server", data);
    console.log("Data in server errors", error);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Інформація про користувача:</Text>

                <Text>Завантаження даних...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 20, marginBottom: 15, fontWeight: "bold" },
    logoutButton: {
        marginTop: 30,
        padding: 12,
        backgroundColor: "#ff4d4d",
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: { color: "white", fontWeight: "bold" },
});

export default CategoriesScreen;