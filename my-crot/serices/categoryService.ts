import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from '@/utils/createBaseQuery'
import {ILogin, ILoginResponse, IRegister} from '@/interfaces/account'
import { serialize } from 'object-to-formdata';
import {ICategoryItem} from "@/interfaces/category";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: createBaseQuery('categories'),
    tagTypes: ['Category'],

    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                }
            },
        }),



    })
})

export const { useGetCategoriesQuery } = categoryApi;