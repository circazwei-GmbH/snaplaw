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
        log_in: 'Sign in',
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
        modals: {
            information: {
                text: 'We have just sent a verification code to your email'
            },
            confirm: {
                text: 'The code has already expired. Send the code again?',
                buttons: {
                    no: 'No',
                    yes: 'Yes'
                }
            }
        },
        errors: {
            user_not_found: 'User is not found',
            code_incorrect: 'Code is incorrect'
        }
    },
    forgot_password: {
        title: 'Forgot password',
        description: 'Enter your registered email below to receive password reset instruction',
        input: 'Email',
        send: 'Send',
        errors: {
            email_not_valid: 'Please enter a valid email',
            email_not_fount: 'Sorry, we couldn\'t find account with this email'
        }
    },
    change_password: {
        title: 'Create new password',
        description: 'Your new password must be different from the previously used password',
        fields: {
            new_password: 'New password',
            confirm_password: 'Confirm new password'
        },
        save: 'Save',
        errors: {
            password_length: 'Password must be at least 6 characters',
            confirm_password: 'Passwords don\'t match.',
            new_password_are_same_as_old: 'Your new password must be different from the previously used passwords'
        }
    },
    errors: {
        abstract: 'Something went wrong. Try again later.',
        galary_permission: 'There is no access to the gallery. Check your permissions in settings.',
        camera_permission: 'There is no access to the camera. Check your permissions in settings.'
    },
    my_profile: {
        tab_name: 'Settings',
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
    },
    change_language: {
        title: 'Language',
        languages: {
            english: 'English',
            germany: 'German'
        }
    },
    edit_profile: {
        title: 'My Profile',
        delete: 'Delete'
    },
    upload_files: {
        camera: 'Camera',
        gallary: 'Gallery'
    },
    homepage: {
        tab_name: 'Create contract',
        description: 'Please select the type of contract you need',
        search: 'Search',
        contract_types: {
            purchase: 'Purchase contract',
            work: 'Work contract',
            rental: 'Rental contract',
            free: 'Free-form contract',
            car: 'Car sales contract'
        }
    },
    my_contracts: {
        tab_name: 'My contracts'
    },
    menu: {
        cancel: 'Cancel'
    }
}