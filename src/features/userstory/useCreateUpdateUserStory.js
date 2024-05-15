/**
 * @module project/useCreateUpdateUserStory
 * @description This module contains the useCreateUpdateUserStory hook
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateUserStory as createUpdateUserStoryApi } from "../../services/apiUserStories";
import { catalogCompletedUserStory } from '../../services/apiBurnDown';
import toast from "react-hot-toast";

/**
 * useCreateUpdateUserStory is a custom hook that uses the useMutation hook
 * @param {Number} projectId - The id of the project to be updated
 * @returns {Object} - createUpdateUserStory function and isCreatingUpdating boolean
 */
export function useCreateUpdateUserStory(projectId) {
    const queryClient = useQueryClient()
    const { mutate: createUpdateUserStory, isLoading: isCreatingUpdating } = useMutation({
        mutationFn: async ({ data, id }) => {
            // catalog completed user stories
            if (data?.status == "done" && id) {
                const userStoryId = id
                catalogCompletedUserStory({ projectId, userStoryId })
            }
            return await createUpdateUserStoryApi({ data, id })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userStories", projectId])
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { createUpdateUserStory, isCreatingUpdating }
}
