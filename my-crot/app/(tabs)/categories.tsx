import {View, Text, StyleSheet, SafeAreaView, FlatList} from "react-native";
import {useAppSelector} from "@/store";
import {useGetCategoriesQuery} from "@/serices/categoryService";
import LoadingOverlay from "@/components/LoadingOverlay";
import React from "react";
import CategoryCard from "@/components/category/CategoryCard";


const CategoriesScreen = () => {

    const token = useAppSelector((state) => state.user.token);
    const {data: categories, error, isLoading} = useGetCategoriesQuery(token);

    console.log("Data in server", categories);
    console.log("Data in server errors", error);
    console.log("Data in server isLoading", isLoading);


    return (
        <SafeAreaView className="flex-1 bg-primary px-4 mt-6">
            <Text className="text-xl font-bold mb-4 text-gray-900 mt-6">Категорії:</Text>
            <LoadingOverlay visible={isLoading} />
            {categories && (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10, paddingBottom: 200 }}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View className="w-[49%] pb-5">
                            <CategoryCard category={item} />
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};



export default CategoriesScreen;