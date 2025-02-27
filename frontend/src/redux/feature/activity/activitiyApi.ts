import { baseApi } from "../../api/baseApi";

const activityApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createActivity: builder.mutation({
            query:(payload)=>({
                url:'/activity',
                method:'POST',
                body:payload
            })
        }),

       getAllActivity: builder.mutation({
            query:(payload)=>({
                url:'/activity',
                method:'GET',
                body:payload
            })
        })
        
       
    })
})


export const {useCreateActivityMutation,useGetAllActivityMutation} = activityApi;