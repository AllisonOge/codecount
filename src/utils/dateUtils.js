/**
 * @module dateUtils
 * @description This module contains utility functions for date manipulation
 */

import { parseISO, formatISO } from "date-fns";

/**
 * formatDate - Format the date to a readable format
 * @param {string} isoFormat - ISO formatted date
 * @returns {string} - Formatted date
 * 
 * @example
 * const isoFormat = "2021-08-01T00:00:00.000Z";
 * const result = formatDate(isoFormat); // "2021-08-01"
 */
export function formatDate(isoFormat) {
    if (isoFormat == "") return;
    const parsedDate = parseISO(isoFormat);
    return formatISO(parsedDate, { representation: "date" });
  }
  