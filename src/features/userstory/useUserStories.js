/**
 * @module userstory/useUserStories
 * @description This module contains the useUserStories hook
 */
import { useQuery } from "@tanstack/react-query";
import { getUserStories } from "../../services/apiUserStories";

/**
 * useUserStories is a custom hook that uses the useQuery hook
 * @param {Number} id - The id of the user story to be fetched
 * @returns {Object} - userStories and isLoadingUserStories
 */
export function useUserStories(id) {
    const { data: userStories, isLoading: isLoadingUserStories } = useQuery({
        queryKey: ["userStories", id],
        queryFn: () => getUserStories(id),
    });

    return { userStories, isLoadingUserStories }
}
