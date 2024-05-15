/**
 * @module project/useDeleteUserStory
 * @description This module contains the useDeleteUserStory hook
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserStory as deleteUserStoryApi } from "../../services/apiUserStories";
import toast from "react-hot-toast";

/**
 * useDeleteUserStory is a custom hook that uses the useMutation hook
 * @param {Number} id - The id of the user story to be deleted
 * @returns {Object} - deleteUserStory function and isDeleting boolean
 */
export function useDeleteUserStory(id) {
    const queryClient = useQueryClient()
    const { mutate: deleteUserStory, isLoading: isDeleting } = useMutation({
        mutationFn: deleteUserStoryApi,
        onSuccess: () => {
            toast.success("Record deleted successfully")
            queryClient.invalidateQueries(["userStories", id])
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { deleteUserStory, isDeleting }
}