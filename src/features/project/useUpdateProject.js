import { useMutation } from "@tanstack/react-query";
import { updateProject as updateProjectApi } from "../../services/apiProjects";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

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
