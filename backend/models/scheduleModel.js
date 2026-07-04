import pool from "../config/db.js";


// =====================================
// Save Complete Schedule
// =====================================

export const saveScheduleDB = async (userId, schedule) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        // Remove old schedule
        await client.query(

            `
            DELETE FROM daily_schedule
            WHERE user_id = $1
            `,

            [userId]

        );

        // Insert new schedule
        for (const item of schedule) {

            await client.query(

                `
                INSERT INTO daily_schedule
                (
                    user_id,
                    activity,
                    start_time,
                    end_time
                )

                VALUES($1,$2,$3,$4)
                `,

                [
                    userId,
                    item.activity,
                    item.startTime,
                    item.endTime
                ]

            );

        }

        await client.query("COMMIT");

        return schedule;

    }

    catch (err) {

        await client.query("ROLLBACK");

        throw err;

    }

    finally {

        client.release();

    }

};


// =====================================
// Get Schedule
// =====================================

export const getScheduleDB = async (userId) => {

    const result = await pool.query(

        `
        SELECT *

        FROM daily_schedule

        WHERE user_id = $1

        ORDER BY start_time ASC
        `,

        [userId]

    );

    return result.rows;

};


// =====================================
// Update Activity
// =====================================

export const updateScheduleDB = async (

    id,
    userId,
    activity,
    startTime,
    endTime

) => {

    const result = await pool.query(

        `
        UPDATE daily_schedule

        SET

            activity = $1,

            start_time = $2,

            end_time = $3

        WHERE

            id = $4

            AND user_id = $5

        RETURNING *

        `,

        [

            activity,
            startTime,
            endTime,
            id,
            userId

        ]

    );

    return result.rows[0];

};


// =====================================
// Delete Activity
// =====================================

export const deleteScheduleDB = async (

    id,
    userId

) => {

    const result = await pool.query(

        `
        DELETE FROM daily_schedule

        WHERE

            id = $1

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