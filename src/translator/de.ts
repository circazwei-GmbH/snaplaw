export default {
    welcome: {
        headline: 'Wilkommen bei Snaplaw',
        sign_in: 'Einloggen',
        sign_up: 'Anmelden'
    },
    sign_up: {
        headline: 'Anmelden',
        name_field: 'Name',
        email_field: 'E-Mail',
        password_field: 'Passwort',
        submit: 'Erstellen',
        alternative: 'oder melden Sie sich mit ein',
        to_login: 'Haben Sie bereits ein Konto?',
        log_in: 'Einloggen',
        errors: {
            email_taken: 'Email already taken',
            name_required: 'Name is required',
            email_not_valid: 'Enter valid email',
            password_length: 'Password should be at least 6 chars'
        }
    },
    sign_in: {
        headline: 'Einloggen',
        email_field: 'E-Mail',
        password_field: 'Passwort',
        forgot_password: 'Passwort vergessen?',
        alternative: 'Oder loggen Sie sich ein mit',
        to_sign_up: 'Haben Sie noch kein Konto?',
        sign_up: 'Anmelden',
        errors: {
            email_not_valid: 'Enter valid email',
            password_length: 'Password should be at least 6 chars',
            user_not_found: 'Sorry, we can’t find account with this email',
            password_not_valid: 'Password not valid'
        }
    },
    verification: {
        title: 'Bestätigen Sie Ihre E-Mail',
        description: 'Bitte geben Sie den 4-stelligen Code ein, der an %{email} gesendet wurde',
        resend: {
            text: 'Code nicht erhalten?',
            link: 'Code erneut senden'
        },
        submit: 'Bestätigen',
        errors: {
            user_not_found: 'User not found',
            code_incorrect: 'Code incorrect'
        }
    },
    errors: {
        abstract: 'Something went wrong. Service unavaliable. Try again later'
    }
}