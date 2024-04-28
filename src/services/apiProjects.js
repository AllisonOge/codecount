import supabase from "./supabase";

export async function getProjects() {

    let { data: projects, error } = await supabase
        .from('projects')
        .select('*')

    if (error) throw new Error(error.message)

    return projects;
}

export async function createProject({ title, owner, description = null, status = "in progress" }) {
    console.log({ title, owner, description, status })

    const { data, error } = await supabase
        .from('projects')
        .insert([
            { title, description, status, owner },
        ])
        .select()

    if (error) throw new Error(error.message)

    return data;
}