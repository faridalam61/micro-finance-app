import { baseApi } from "../../api/baseApi";

const ledgerApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createLedger: builder.mutation({
            query:(payload)=>({
                url:'/ledger',
                method:'POST',
                body:payload
            })
        }),

        getAllLedger : builder.query({
            query: ()=>({
                url: '/ledger',
                method:'GET'
            })
        }),

      
   
    })
})


export const {useCreateLedgerMutation, useGetAllLedgerQuery } = ledgerApi;