/**
 * @module project/useDeleteProject
 * @description This module contains the useDeleteProject hook
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject as deleteProjectApi } from "../../services/apiProjects";
import toast from "react-hot-toast";

/**
 * useDeleteProject is a custom hook that uses the useMutation hook
 * @param {Number} id - The id of the project to be deleted
 * @returns {Object} - deleteProject function and isDeleting boolean
 */
export function useDeleteProject(id) {
    const queryClient = useQueryClient()
    const { mutate: deleteProject, isLoading: isDeleting } = useMutation({
        mutationFn: deleteProjectApi,
        onSuccess: () => {
            toast.success("Project deleted successfully")
            queryClient.invalidateQueries(["projects", id])
        },
        onError: err => toast.error(err.message)
    })

    return { deleteProject, isDeleting }
}
