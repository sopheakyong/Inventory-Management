module.exports = function(type) {
    var content = {
        'registration': {
            from: '"Project App" <noresponse@Project.app>',
            to: '{recipient}',
            subject: 'Account Registration',
            html: `Greeting from Project Team, <br /><br />You are receiving this email because you
                recently requested a verification code from Angkorian Inc during your identity verification process. <br /><br /><b>Verification code</b>: {rc}
                <br />
            `
        },
        'verification': {
            from: '"Project App" <noresponse@abc.app>',
            to: '{recipient}',
            subject: 'Account Verification',
            html: `Greeting from Project Team, <br /><br />You are receiving this email because you've
                recently registered an account with Project App Co. Ltd. To complete your account verification process, you are required to confirm verification code. <br /><br /><b>Verification code</b>: {rc}
                <br />
                Expired in: 30 minutes

            `
        },
        'resetpassword': {
            from: '"Project App" <noresponse@abc.app>',
            to: '{recipient}',
            subject: 'Password Reset',
            html: `Greeting from Project Team, <br /><br />You are receiving this email because you
                recently requested a verification code from  App Co. Ltd during your password reset process. <br /><br />
            `
        },
        'refreshcode': {
            from: '"Project App" <noresponse@abc.app>',
            to: '{recipient}',
            subject: 'Registration code re-generation',
            html: `Greeting from Project Team, <br /><br />You are receiving this email because you
                recently requested to refresh a verification code from Project App Co. Ltd. <br /><br /><b>Your new verification code</b>: {rc}
                <br />
                Expired in: 30 minutes
            `
        }
        ,
        'verified': {
            from: '"Project App" <noresponse@abc.app>',
            to: '{recipient}',
            subject: 'Your account has been verified',
            html: `Thanks from Project Team, <br /><br />You are a part of Project family. <br /><br /><b>You can now log in and access user features in Project App.
                <br />
            If you have any question, you can contact us using Live Chat in the app.
            `
        }
    }

    return content[type];
};
