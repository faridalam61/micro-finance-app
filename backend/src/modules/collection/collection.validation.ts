import z from 'zod'

const createCollectionValidation = z.object({
    body: z.object({
        customerId : z.string(),
        description: z.string(),
        amount: z.number(),
        balance: z.number()
    })
})


const updateCollectionValidation = z.object({
    body: z.object({
        customerId : z.string().optional(),
        description: z.string().optional(),
        amount: z.number().optional(),
        balance: z.number().optional()
    })
})


export const collectionValidationSchema = {
    createCollectionValidation, updateCollectionValidation
}