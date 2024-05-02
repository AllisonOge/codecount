import { isEqual, startOfDay } from "date-fns";
import supabase from "./supabase";

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
