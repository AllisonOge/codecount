/**
 * @module apiBurnDown
 * @description This module contains the functions for cataloging completed user stories and getting work done per day
 */
import { isEqual, startOfDay } from "date-fns";
import supabase from "./supabase";

/**
 * catalogCompleteUserStory catalogs a completed user story for a given project.
 * @param {Object} params - The parameters.
 * @param {number} params.projectId - The ID of the project.
 * @param {number} params.userStoryId - The ID of the user story.
 * @throws Will throw an error if the supabase query fails.
 */
export async function catalogCompletedUserStory({ projectId, userStoryId }) {
    const completedAt = new Date()
    // 1. check if record exist and within 24 hours 
    const threshold = new Date(completedAt.getTime() - 24 * 60 * 60 * 1000).toISOString()
    // console.log("Record should exist within 24 hours ->", threshold)
    const { data: workdonePerDay, error } = await supabase
        .from('workdone')
        .select("*")

        // Filters
        .eq('projectId', projectId)
        .eq('userStoryId', userStoryId)
        .gt('completedAt', threshold)
        .maybeSingle()

    if (error) throw new Error(error.message)
    // 2. update record if exist

    if (workdonePerDay) {
        const { error } = await supabase
            .from('workdone')
            .update({ 'completedAt': completedAt.toISOString() })
            .eq("id", workdonePerDay.id)
            .select()
        if (error) throw new Error(error.message)
        console.log("catalog updated succesfully")
    } else {// 3. create record if otherwise
        const { error } = await supabase
            .from('workdone')
            .insert([
                { projectId, userStoryId, completedAt },
            ])
            .select()
        if (error) throw new Error(error.message)
        console.log("catalog created succesfully")
    }
}

/**
 * getWorkdonePerDay retrieves the work done per day for a given project.
 * @param {number} id - The ID of the project.
 * @returns {Array<Object>} An array of objects representing the work done per day.
 * @throws Will throw an error if the supabase query fails.
 */
export async function getWorkdonePerDay(id) {

    let { data: workdone, error } = await supabase
        .from('workdone')
        .select(`
      *,
      user_stories (
        id,
        effortEstimate
      )
    `)
        .eq("projectId", id)

    if (error) throw new Error(error.message)

    const workdonePerDay = workdone.map(w => ({
        day: w.completedAt,
        userStories: [w.user_stories]
    })).reduce((acc, cur) => {
        const existingDay = acc.find(us => isEqual(startOfDay(us.day), startOfDay(cur.day)));

        if (existingDay) {
            existingDay.userStories.push(...cur.userStories);
        } else {
            acc.push(cur);
        }

        return acc;
    }, []).map(w => ({
        ...w, count: w.userStories.length
    }));

    // console.log("WorkdonePerDay ->", workdonePerDay)

    return workdonePerDay
}
