import { baseApi } from "../../api/baseApi";

const collectionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createCollection: builder.mutation({
            query:(payload)=>({
                url:'/collection',
                method:'POST',
                body:payload
            })
        }),

        getAllCollection : builder.query({
            query: ()=>({
                url: '/collection',
                method:'GET'
            })
        }),

        getSingleCollection : builder.query({
            query:(id:string)=>({
                url: `/collection/${id}`,
                method:'GET'
            })
        }),
        updateCollection: builder.mutation({
            query: ({id,payload})=>({
                url:`/collection/${id}`,
                method:'PATCH',
                body:payload
            })
        }),

        deleteCollection: builder.mutation({
            query:(id:string)=>({
                url: `/collection/${id}`,
                method:'DELETE'
            })
        })
    })
})


export const {useCreateCollectionMutation,useGetAllCollectionQuery,useGetSingleCollectionQuery,useUpdateCollectionMutation,useDeleteCollectionMutation} = collectionApi;