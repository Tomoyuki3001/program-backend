require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getAllOfInstructors = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query(
      `
  SELECT instructor.id, instructor.name, instructor.avatar FROM instructor;`
    )
    .then(async (result) => {
      const instructorsArray = result.rows;
      return res.json(instructorsArray);
    });
};
const getAllOfAppointments = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query(
      `
      SELECT appointment.id AS appointment_id, available_instructor.time, student.id AS student_id, instructor.name as instructor,singleDays.name as day FROM appointment
      JOIN available_instructor ON available_instructor.id = appointment.spot_id
      JOIN singleDays ON singleDays.id = available_instructor.day_id
      JOIN student ON student.id = appointment.student_id
      JOIN instructor ON instructor.id = available_instructor.instructor_id
      WHERE appointment.student_id = ${req.body.student};`
    )
    .then(async (result) => {
      const appointmentsArray = result.rows;
      return res.json(appointmentsArray);
    });
};

const getInstructorAvailability = (req, res) => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  pool
    .query(
      `SELECT available_instructor.id, available_instructor.instructor_id, available_instructor.day_id, singleDays.name, available_instructor.time FROM available_instructor
      JOIN instructor ON instructor.id = available_instructor.instructor_id
      JOIN singleDays ON singleDays.id = available_instructor.day_id
      LEFT JOIN appointment ON available_instructor.id = appointment.spot_id
      WHERE available_instructor.instructor_id = ${req.body.instructor} AND appointment.spot_id IS null;`
    )
    .then((result) => result.rows)
    .then((availableInstructor) => {
      const day = {
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
      };
      availableInstructor.forEach((element) => {
        day[element.name].push({ spot_id: element.id, time: element.time });
      });
      res.json(day);
    })
    .catch((err) => console.log("err", err))
    .finally(() => pool.end());
};

const bookNewTimeSpot = (req, res) => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  pool
    .query(
      `INSERT INTO appointment (student_id, spot_id) VALUES (${req.body.student},${req.body.spotId});`
    )
    .then(() => getInstructorAvailability(req, res))
    .catch((err) => console.log("err", err))
    .finally(() => pool.end());
};

const cancelSpot = (req, res) => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  pool
    .query(
      `
      DELETE FROM appointment WHERE appointment.id = ${req.body.id};`
    )
    .then(() => getAllOfAppointments(req, res))
    .catch((err) => console.log("err", err))
    .finally(() => pool.end());
};

module.exports = {
  getInstructorAvailability,
  getAllOfInstructors,
  getAllOfAppointments,
  bookNewTimeSpot,
  cancelSpot,
};
