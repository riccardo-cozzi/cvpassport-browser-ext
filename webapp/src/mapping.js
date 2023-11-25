const database_schema = {
    "title": "title",
    "firstName": "first_name",
    "middleName": "middle_name",
    "surname": "last_name",
    "age": "age",
    "gender": "gender",
    "homeAddress": "home_address",
    "workAddress": "work_address",
    "phoneNumber": "phone_number",
    "emailAddress": "email_address",
    "socialSecurityNumber": "social_security_number",
    "nationality": "nationality",
    "otherVisa": "other_visa",
    "visaSponsorship": "visa_sponsorship",
    "disability": "disability",
    "veteranStatus": "veteran_status",
    "sexualOrientation": "sexual_orientation",
    "ethnicity": "ethnicity",
    "religion": "religion",
    "previousPositionAtCompany": "previous_position_at_company",
    "familiarsWorkingThere": "familiars_working_there",
    "education": "education",
    "typeOfSchool": "type_of_school",
    "program": "program",
    "degree": "degree",
    "enrollmentDate": "enrollment_date",
    "graduationDate": "graduation_date",
    "graduationGrade": "graduation_grade",
    "certifications": "certifications",
    "language1": "language_1",
    "language1Reading": "language_1_reading",
    "language1Writing": "language_1_writing",
    "language1Speaking": "language_1_speaking",
    // Add other languages in a similar manner
    "skillsAndQualifications": "skills_and_qualifications",
    "extracurricularActivities": "extracurricular_activities",
    "employmentHistory": "employment_history",
    "employer": "employer",
    "industry": "industry",
    "jobTitle": "job_title",
    "contract": "contract",
    "responsibilitiesAchievements": "responsibilities_achievements",
    "startEmploymentDate": "start_employment_date",
    "endEmploymentDate": "end_employment_date",
    "isCurrentJob": "is_current_job",
    "noticePeriod": "notice_period",
    "salaryExpectations": "salary_expectations",
    "currency": "currency"
};

export function map_data_to_schema(data) {
    let mapped_data = {};
    for (let key in data) {
        if (data[key] !== "")
            mapped_data[database_schema[key]] = data[key];
    }
    return mapped_data;
}

export function map_schema_to_data(data) {
    console.log("data", data);
    // invert the dictionary to get the value-key
    let mapped_data = {};
    let inverted_database_schema = {};
    for (let key in database_schema) {
        inverted_database_schema[database_schema[key]] = key;
    }
    for (let key in data) {
        if (data[key] !== "")
            mapped_data[inverted_database_schema[key]] = data[key];
    }
    return mapped_data;
}