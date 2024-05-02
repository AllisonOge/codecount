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

export async function deleteUserStory(id) {
    const { error } = await supabase.from('user_stories').delete().eq('id', id)

    if (error) throw new Error(error.message)
}
