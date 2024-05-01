import supabase from "./supabase";

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

export async function catalogCompletedUserStory({ projectId, userStoryId }) {
    const completedAt = new Date()
    // 1. check if record exist and within 24 hours 
    const threshold = new Date(completedAt.getTime() - 24 * 60 * 60 * 1000).toISOString()
    console.log("Record should exist within 24 hours ->", threshold)
    const { data: burndownChart, error } = await supabase
        .from('burndown_chart')
        .select("*")

        // Filters
        .eq('projectId', projectId)
        .eq('userStoryId', userStoryId)
        .gt('completedAt', threshold)
        .maybeSingle()

    if (error) throw new Error(error.message)
    // 2. update record if exist

    if (burndownChart) {
        const { error } = await supabase
            .from('burndown_chart')
            .update({ 'completedAt': completedAt.toISOString() })
            .eq("id", burndownChart.id)
            .select()
        if (error) throw new Error(error.message)
        console.log("catalog updated succesfully")
    } else {// 3. create record if otherwise
        const { error } = await supabase
            .from('burndown_chart')
            .insert([
                { projectId, userStoryId, completedAt },
            ])
            .select()
            if (error) throw new Error(error.message)
            console.log("catalog created succesfully")
    }
}


export async function deleteUserStory(id) {
    const { error } = await supabase.from('user_stories').delete().eq('id', id)

    if (error) throw new Error(error.message)
}
