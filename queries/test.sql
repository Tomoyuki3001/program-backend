SELECT  instructor.id AS instructor_id, instructor.name AS instructor_name, instructor.avatar AS instructor_avatar FROM available_instructor
JOIN day
ON available_instructor.day_id = day.id
LEFT JOIN instructor
ON available_instructor.instructor_id = instructor.id
WHERE day.name = 'WEDNESDAY'
ORDER BY available_instructor.id;