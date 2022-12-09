CREATE TABLE instructor 
    (id SERIAL PRIMARY KEY, 
    name TEXT, 
    avatar TEXT,
    day_id INTEGER REFERENCES day(id)
    );
CREATE TABLE meeting 
    (id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student(id),
    instructor_id INTEGER REFERENCES instructor(id),
    appointment_id INTEGER REFERENCES appointment(id)
    );