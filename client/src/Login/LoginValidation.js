function Validation(values) {
    let error = {}
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.userid === "") {
        error.userid = "User ID should not be empty"
    } else {
        error.userid = ""
    }
    if (values.password === "") {
        error.password = "Password should not be empty"
    } else if (!password_pattern.test(values.password)) {
        error.password = "password Didn't match"
    } else {
        error.password = ""
    }
    return error;
}

export default Validation;