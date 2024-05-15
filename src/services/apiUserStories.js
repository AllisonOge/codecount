/**
 * @module services/apiUserStories
 * @description This module provides functions to manage user stories, including retrieving, creating, updating, and deleting user stories.
 */
import supabase from "./supabase";

/**
 * getuserStories retrieves all user stories for a given project.
 * @param {number} id - The ID of the project.
 * @returns {Array<Object>} An array of user story objects.
 * @throws Will throw an error if the supabase query fails.
 */
export async function getUserStories(id) {

    const { data: userStories, error } = await supabase
        .from('user_stories')
        .select('*')
        // TODO: fix issues with join statements
        // .select('user_stories.*, users.*')
        // .innerJoin('users',
        //     'user_stories."assignedId"',
        //     'users.id')
        .eq('projectId', id)
        .order('id', { ascending: true })


    if (error) throw new Error(error.message);

    // console.log(userStories)

    return userStories;
}

/**
 * createUpdateUserStory creates or updates a user story.
 * @param {Object} params - The parameters.
 * @param {Object} params.data - The data for the user story.
 * @param {string} params.data.title - The title of the user story.
 * @param {number} params.data.effortEstimate - The effort estimate for the user story.
 * @param {string} params.data.startDate - The start date of the user story.
 * @param {string} params.data.endDate - The end date of the user story.
 * @param {string} params.data.status - The status of the user story.
 * @param {number} params.data.projectId - The ID of the project the user story belongs to.
 * @param {number} params.data.assignedId - The ID of the user assigned to the user story.
 * @param {number} [params.id] - The ID of the user story to update (if updating).
 * @returns {Object} The created or updated user story object.
 * @throws Will throw an error if the supabase query fails.
 */
export async function createUpdateUserStory({ data, id }) {
    const { title, effortEstimate, startDate, endDate, status, projectId, assignedId } = data
    let query = supabase.from('user_stories')

    if (!id)
        query = query.insert([{
            title,
            effortEstimate,
            startDate,
            endDate,
            status,
            projectId,
            assignedId
        }])
    else
        query = query.update({
            title,
            effortEstimate,
            startDate,
            endDate,
            status,
            assignedId
        }).eq('id', id)

    const { data: results, error } = await query.select().single()

    if (error) throw new Error(error.message)

    return results
}

/**
 * deleteUserStory deletes a user story by its ID.
 * @param {number} id - The ID of the user story.
 * @throws Will throw an error if the supabase query fails.
 */
export async function deleteUserStory(id) {
    const { error } = await supabase.from('user_stories').delete().eq('id', id)

    if (error) throw new Error(error.message)
}
