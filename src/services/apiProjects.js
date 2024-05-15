/**
 * @module apiProjects
 * @description This module contains the functions for managing projects.
 */
import supabase from "./supabase";

/**
 * getProjects retrieves all projects owned by a specific user.
 * @param {number} id - The ID of the owner.
 * @returns {Array<Object>} An array of project objects.
 * @throws Will throw an error if the supabase query fails.
 */
export async function getProjects(id) {

    let { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner', id)

    if (error) throw new Error(error.message)

    return projects;
}

/**
 * getProject retrieves a single project by its ID.
 * @param {number} id - The ID of the project.
 * @returns {Object} The project object.
 * @throws Will throw an error if the supabase query fails.
 */
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

/**
 * updateProject updates a project with new data.
 * @param {Object} params - The parameters.
 * @param {Object} params.data - The new data for the project.
 * @param {number} params.id - The ID of the project to update.
 * @throws Will throw an error if the supabase query fails.
 */
export async function updateProject({ data, id }) {
    const { title, description, status } = data
    // console.log(data, id)
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

/**
 * creatProject creates a new project.
 * @param {Object} params - The parameters.
 * @param {string} params.title - The title of the project.
 * @param {number} params.owner - The ID of the owner.
 * @param {string} [params.description=null] - The description of the project.
 * @param {string} [params.status="in progress"] - The status of the project.
 * @returns {Array<Object>} An array containing the created project object.
 * @throws Will throw an error if the supabase query fails.
 */
export async function createProject({ title, owner, description = null, status = "in progress" }) {

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
