-- CREATE TABLE singleDays
--     (id SERIAL PRIMARY KEY,
--     name TEXT
--     );
CREATE TABLE available_instructor
    (id SERIAL PRIMARY KEY, 
    instructor_id INTEGER REFERENCES instructor(id), 
    day_id INTEGER REFERENCES singleDays(id),
    time TEXT
    );

