import pool from "../config/db.js";

// ===========================
// Get All Tasks
// ===========================

export const getAllTasksDB = async (userId) => {

    const result = await pool.query(

        `
        SELECT *
        FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,

        [userId]

    );

    return result.rows;

};


// ===========================
// Get Task By ID
// ===========================

export const getTaskByIdDB = async (id, userId) => {

    const result = await pool.query(

        `
        SELECT *
        FROM tasks
        WHERE id = $1
        AND user_id = $2
        `,

        [
            id,
            userId
        ]

    );

    return result.rows[0];

};


// ===========================
// Create Task
// ===========================

export const createTaskDB = async (

    userId,
    title,
    description,
    priority,
    deadline,
    estimatedHours

) => {

    const result = await pool.query(

        `
        INSERT INTO tasks
        (
            user_id,
            title,
            description,
            priority,
            deadline,
            estimated_hours
        )

        VALUES($1,$2,$3,$4,$5,$6)

        RETURNING *
        `,

        [

            userId,
            title,
            description || null,
            priority || "Medium",
            deadline || null,
            estimatedHours || null

        ]

    );

    return result.rows[0];

};


// ===========================
// Update Task
// ===========================

export const updateTaskDB = async (

    id,
    userId,
    title,
    description,
    priority,
    status,
    deadline,
    estimatedHours

) => {

    const result = await pool.query(

        `
        UPDATE tasks

        SET

            title = $1,

            description = $2,

            priority = $3,

            status = $4,

            deadline = $5,

            estimated_hours = $6,

            updated_at = CURRENT_TIMESTAMP

        WHERE id = $7
        AND user_id = $8

        RETURNING *

        `,

        [

            title,
            description,
            priority,
            status,
            deadline,
            estimatedHours,
            id,
            userId

        ]

    );

    return result.rows[0];

};


// ===========================
// Update Status
// ===========================

export const updateTaskStatusDB = async (

    id,
    userId,
    status

) => {

    const result = await pool.query(

        `
        UPDATE tasks

        SET

            status = $1,

            updated_at = CURRENT_TIMESTAMP

        WHERE id = $2
        AND user_id = $3

        RETURNING *

        `,

        [

            status,
            id,
            userId

        ]

    );

    return result.rows[0];

};


// ===========================
// Delete Task
// ===========================

export const deleteTaskDB = async (

    id,
    userId

) => {

    const result = await pool.query(

        `
        DELETE FROM tasks

        WHERE id = $1
        AND user_id = $2

        RETURNING *

        `,

        [

            id,
            userId

        ]

    );

    return result.rows[0];

};


// ===========================
// Get Pending Tasks
// ===========================

export const getPendingTasksDB = async (

    userId

) => {

    const result = await pool.query(

        `
        SELECT *

        FROM tasks

        WHERE

            user_id = $1

            AND status = 'Pending'

        ORDER BY deadline ASC

        `,

        [

            userId

        ]

    );

    return result.rows;

};