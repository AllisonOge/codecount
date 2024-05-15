/**
 * @module project/useUpdateProject
 * @description This module contains the useUpdateProject hook
 */

import { useMutation } from "@tanstack/react-query";
import { updateProject as updateProjectApi } from "../../services/apiProjects";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


/**
 * useUpdateProject is a custom hook that uses the useMutation hook
 * @param {Number} id - The id of the project to be updated
 * @returns {Object} - updateProject function and isUpdating boolean
 */
export function useUpdateProject(id) {
    const queryClient = useQueryClient()
    const { mutate: updateProject, isLoading: isUpdating } = useMutation({
        mutationFn: updateProjectApi,
        onSuccess: () => {
            toast.success('Project updated successfully')
            queryClient.invalidateQueries({
                queryKey: ['project', id]
            })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { updateProject, isUpdating }
}
