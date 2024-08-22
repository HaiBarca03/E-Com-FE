import { useMutation } from '@tanstack/react-query'

export const useMutationHooks = (funCb) => {
    const mutation = useMutation({
        mutationFn: funCb
    })
    return mutation
}