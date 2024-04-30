import supabase from "./supabase";

export async function getProjects(id) {

    let { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner', id)

    if (error) throw new Error(error.message)

    return projects;
}

export async function getProject(id) {
    let { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .limit(1)
        .single()

    if (error) throw new Error(error.message)

    return project;
}

export async function updateProject({ data, id }) {
    const { title, description, status } = data
    console.log(data, id)
    const { error } = await supabase
        .from('projects')
        .update({
            title,
            description,
            status
        })
        .eq('id', id)

    if (error) throw new Error(error.message)
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

export async function deleteProject(id) {

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

    if (error) throw new Error(error.message)
}
