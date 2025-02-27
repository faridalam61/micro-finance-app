import { baseApi } from "../../api/baseApi";

const customerApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createcustomer: builder.mutation({
            query:(payload)=>({
                url:'/customer',
                method:'POST',
                body:payload
            })
        }),

        getAllcustomer : builder.query({
            query: ()=>({
                url: '/customer',
                method:'GET'
            })
        }),

        getSinglecustomer : builder.query({
            query:(id:string)=>({
                url: `/customer/${id}`,
                method:'GET'
            })
        }),
        updatecustomer: builder.mutation({
            query: ({id,payload})=>({
                url:`/customer/${id}`,
                method:'PATCH',
                body:payload
            })
        }),

        deletecustomer: builder.mutation({
            query:(id:string)=>({
                url: `/customer/${id}`,
                method:'DELETE'
            })
        })
    })
})


export const {useCreatecustomerMutation, useGetAllcustomerQuery, useGetSinglecustomerQuery,useUpdatecustomerMutation,useDeletecustomerMutation} = customerApi;