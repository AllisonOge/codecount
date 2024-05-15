/**
 * @module services/apiAuth
 * @description This module contains functions for authentication with Supabase
 */
import supabase from './supabase';

/**
 * getCurrentUser is a function that returns the current user
 * @throws {Error} - Will throw an error if the supabase query fails.
 * @returns {Object} - The current user
 */
export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message)

    return data?.user;
}

/**
 * signup is an async function that signs up a user
 * @param {Object} params - The parameters.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 * @throws {Error} - Will throw an error if the supabase query fails.
 * @returns {Object<any>} - user data
 */
export async function signup({ email, password }) {

    let { data, error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) throw new Error(error.message)

    return data;
}

/**
 * login is an async function that logs in a user
 * @param {Object} params - The parameters.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 * @throws {Error} - Will throw an error if the supabase query fails.
 * @returns {Object<any>} - user data
 */
export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error)
        throw new Error(error.message)

    return data;
}

/**
 * logout is an async function that logs out the current user
 * @throws {Error} - Will throw an error if the supabase query fails.
 */
export async function logout() {

    let { error } = await supabase.auth.signOut()

    if (error) throw new Error(error.message)

}
