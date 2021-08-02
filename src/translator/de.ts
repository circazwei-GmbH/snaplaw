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
            email_taken: 'E-Mail wurde bereits verwendet',
            name_required: 'Name ist erforderlich',
            email_not_valid: 'Bitte geben Sie eine gültige Email-Adresse ein',
            password_length: 'Passwort muss mindestens 6 Zeichen lang sein'
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
            email_not_valid: 'Bitte geben Sie eine gültige Email-Adresse ein',
            password_length: 'Passwort muss mindestens 6 Zeichen lang sein',
            user_not_found: 'Entschuldigung, wir konnten das Konto mit dieser E-Mail nicht finden',
            password_not_valid: 'Passwort ist ungültig'
        }
    },
    verification: {
        title: 'Bestätigen Sie Ihre E-Mail',
        description: 'Bitte geben Sie den 4-stelligen Code ein, der an %{email} gesendet wurde',
        resend: {
            text: 'Code nicht erhalten?',
            link: 'Code erneut senden'
        },
        modals: {
            information: {
                text: 'Wir haben bereits einen Bestätigungscode an Ihre E-Mail gesendet.'
            },
            confirm: {
                text: 'Der Code ist bereits abgelaufen. Code noch einmal senden?',
                buttons: {
                    no: 'Nein',
                    yes: 'Ja'
                }
            }
        },
        submit: 'Bestätigen',
        errors: {
            user_not_found: 'Benutzer wurde nicht gefunden',
            code_incorrect: 'Code ist not korrekt'
        }
    },
    errors: {
        abstract: 'Leider ist etwas schiefgelaufen. Bitte versuchen Sie es später noch einmal.'
    },
}