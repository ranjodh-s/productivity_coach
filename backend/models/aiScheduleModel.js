import pool from "../config/db.js";

export async function saveAIPlanDB(userId, plan) {

    const today = new Date().toISOString().split("T")[0];

    await pool.query(

        `
        INSERT INTO ai_schedule
        (
            user_id,
            generated_date,
            plan
        )

        VALUES ($1, $2, $3)

        ON CONFLICT (user_id, generated_date)

        DO UPDATE
        SET
            plan = EXCLUDED.plan,
            updated_at = CURRENT_TIMESTAMP
        `,

        [
            userId,
            today,
            JSON.stringify(plan)
        ]

    );

}

export async function getTodayPlanDB(userId) {

    const today = new Date().toISOString().split("T")[0];

    const result = await pool.query(

        `
        SELECT plan
        FROM ai_schedule
        WHERE user_id = $1
        AND generated_date = $2
        `,

        [
            userId,
            today
        ]

    );

    if (result.rows.length === 0) {

        return null;

    }

    return result.rows[0].plan;

}