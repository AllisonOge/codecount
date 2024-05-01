import { useQuery } from "@tanstack/react-query";
import { getUserStories } from "../../services/apiUserStories";

export function useUserStories(id) {
    const { data: userStories, isLoading: isLoadingUserStories } = useQuery({
        queryKey: ["userStories", id],
        queryFn: () => getUserStories(id),
    });

    return { userStories, isLoadingUserStories }
}