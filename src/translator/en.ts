export default {
    welcome: {
        headline: 'Welcome to Snaplaw',
        sign_in: 'Sign in',
        sign_up: 'Sign up'
    },
    sign_up: {
        headline: 'Sign up',
        name_field: 'Name',
        email_field: 'Email',
        password_field: 'Password',
        submit: 'Create',
        alternative: 'or sign up with ',
        to_login: 'Already have an account?',
        log_in: 'Log in',
        errors: {
            email_taken: 'Email has already been taken',
            name_required: 'Name is required',
            email_not_valid: 'Please enter a valid email',
            password_length: 'Password must be at least 6 characters'
        }
    },
    sign_in: {
        headline: 'Sign in',
        email_field: 'Email',
        password_field: 'Password',
        forgot_password: 'Forgot password?',
        alternative: 'Or sign in with',
        to_sign_up: 'Don’t have any account?',
        sign_up: 'Sign up',
        errors: {
            email_not_valid: 'Please enter a valid email',
            password_length: 'Password must be at least 6 characters',
            user_not_found: 'Sorry, we couldn\'t find account with this email',
            password_not_valid: 'Password is invalid'
        }
    },
    verification: {
        title: 'Verify you email',
        description: 'Please enter the 4 digit code sent to %{email}',
        resend: {
            text: 'Didn’t receive the code?',
            link: 'Resend code'
        },
        submit: 'Verify',
        modal: {
            text: 'We have just sent a verification code to your email'
        },
        errors: {
            user_not_found: 'User is not found',
            code_incorrect: 'Code is incorrect'
        }
    },
    errors: {
        abstract: 'Something went wrong. Try again later.'
    },
    my_profile: {
        headline: 'My Profile',
        verified_gray: 'You have been verified by',
        verified_black: 'people',
        buttons_text: {
            my_profile: 'My profile',
            language: 'Language',
            notifications: 'Notifications',
            invite_friends: 'Invite friends',
            private_policy: 'Privacy Policy',
            change_password: 'Change password',
            sign_out: 'Sign out',
            delete_profile: 'Delete profile'
        }
    }
}