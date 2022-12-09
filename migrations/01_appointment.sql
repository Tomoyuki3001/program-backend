CREATE TABLE appointment 
    (id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student(id),
    spot_id INTEGER REFERENCES available_instructor(id)
    );