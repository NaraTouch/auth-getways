
exports.success = (msg, stCode, res) => {
    return {
        message: msg,
        code: stCode,
        data: res
    };
};

exports.error = (msg, stCode, err) => {
    return {
        message: msg,
        code: stCode,
        error: err
    };
};

exports.msg_success = () => {
    return 'Success.';
}
exports.msg_invalid_cred = () => {
    return 'Invalid credentials.';
}
exports.msg_already_exist = () => {
    return 'Already exist.';
}
exports.msg_validate = () => {
    return 'Error validation.';
}
exports.msg_wrong_pass_user = () => {
    return 'Wrong password and email.';
}
exports.msg_required = () => {
    return 'required.';
}
exports.msg_not_found = () => {
    return 'Error not found.';
}
exports.msg_server_error = () => {
    return 'Server error.';
}
