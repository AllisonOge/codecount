import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserStory as deleteUserStoryApi } from "../../services/apiUserStories";
import toast from "react-hot-toast";

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