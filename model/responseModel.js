
exports.success = (msg, stCode, res) => {
    return {
        message: msg,
        error: false,
        code: stCode,
        data: res
    };
};

exports.error = (msg, stCode, err) => {
    return {
        message: msg,
        error: true,
        code: stCode,
        error: err
    };
};

exports.validation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors
    };
}

exports.msg_success = () => {
    return 'Success.';
}

exports.msg_invalid_cred = () => {
    return 'Invalid Credentials.';
}

exports.msg_already_exist = () => {
    return 'Already Exist.';
}