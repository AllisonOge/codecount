import supabase from "./supabase";

export async function getUserStories(id) {

    let { data: userStories, error } = await supabase
        .from('user_stories')
        .select('*')
        // .select({
        //     'user_stories.*': '*',
        //     'auth.users.id': 'assigned' 
        // })
        .eq("projectId", id)
        // .join('auth.users', {
        //     // Define the join condition
        //     on: 'user_stories.assigned:auth.users.id', // Adjust this according to your schema
        //   });
    if (error) throw new Error(error.message);

    return userStories;
}
