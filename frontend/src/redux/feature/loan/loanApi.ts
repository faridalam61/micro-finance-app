import { baseApi } from "../../api/baseApi";

const loanApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createLoan: builder.mutation({
            query:(payload)=>({
                url:'/loan',
                method:'POST',
                body:payload
            })
        }),

        getAllLoan : builder.query({
            query: ()=>({
                url: '/loan',
                method:'GET'
            })
        }),

        getSingleLoan : builder.query({
            query:(id:string)=>({
                url: `/loan/${id}`,
                method:'GET'
            })
        }),
        updateLoan: builder.mutation({
            query: ({id,payload})=>({
                url:`/loan/${id}`,
                method:'PATCH',
                body:payload
            })
        }),

        deleteLoan: builder.mutation({
            query:(id:string)=>({
                url: `/loan/${id}`,
                method:'DELETE'
            })
        })
    })
})


export const {useCreateLoanMutation, useGetAllLoanQuery, useGetSingleLoanQuery,useUpdateLoanMutation, useDeleteLoanMutation} = loanApi;