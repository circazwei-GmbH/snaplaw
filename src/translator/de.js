export default {
  welcome: {
    headline: "Wilkommen bei Snaplaw",
    sign_in: "Einloggen",
    sign_up: "Anmelden",
  },
  sign_up: {
    headline: "Anmelden",
    name_field: "Name",
    email_field: "E-Mail",
    password_field: "Passwort",
    submit: "Erstellen",
    alternative: "oder melden Sie sich mit ein",
    to_login: "Haben Sie bereits ein Konto?",
    log_in: "Einloggen",
    errors: {
      email_taken: "E-Mail wurde bereits verwendet",
      name_required: "Name ist erforderlich",
      email_not_valid: "Bitte geben Sie eine gültige Email-Adresse ein",
      password_length: "Passwort muss mindestens 6 Zeichen lang sein",
    },
  },
  sign_in: {
    headline: "Einloggen",
    email_field: "E-Mail",
    password_field: "Passwort",
    forgot_password: "Passwort vergessen?",
    alternative: "Oder loggen Sie sich ein mit",
    to_sign_up: "Haben Sie noch kein Konto?",
    sign_up: "Anmelden",
    errors: {
      email_not_valid: "Bitte geben Sie eine gültige Email-Adresse ein",
      password_length: "Passwort muss mindestens 6 Zeichen lang sein",
      user_not_found:
        "Entschuldigung, wir konnten das Konto mit dieser E-Mail nicht finden",
      password_not_valid: "Passwort ist ungültig",
    },
  },
  verification: {
    title: "Bestätigen Sie Ihre E-Mail",
    description:
      "Bitte geben Sie den 4-stelligen Code ein, der an %{email} gesendet wurde",
    resend: {
      text: "Code nicht erhalten?",
      link: "Code erneut senden",
    },
    modals: {
      information: {
        text: "Wir haben bereits einen Bestätigungscode an Ihre E-Mail gesendet.",
      },
      confirm: {
        text: "Der Code ist bereits abgelaufen. Code noch einmal senden?",
        buttons: {
          no: "Nein",
          yes: "Ja",
        },
      },
    },
    submit: "Bestätigen",
    errors: {
      user_not_found: "Benutzer wurde nicht gefunden",
      code_incorrect: "Code ist not korrekt",
    },
  },
  forgot_password: {
    title: "Passwort vergessen",
    description:
      "Geben Sie unten Ihre registrierte E-Mail-Adresse ein, um Anweisungen zum Zurücksetzen des Passworts zu erhalten",
    input: "E-Mail",
    send: "Senden",
    errors: {
      email_not_valid: "Bitte geben Sie eine gültige Email-Adresse ein",
      email_not_fount:
        "Entschuldigung, wir konnten das Konto mit dieser E-Mail nicht finden",
    },
  },
  change_password: {
    title: "Ein neues Passwort erstellen",
    description:
      "Ihr neues Passwort muss sich von den zuvor verwendeten Passwörtern unterscheiden",
    fields: {
      new_password: "Neues Passwort",
      confirm_password: "Neues Passwort bestätigen",
    },
    save: "Speichern",
    errors: {
      password_length: "Passwort muss mindestens 6 Zeichen lang sein",
      confirm_password: "Passwörter stimmen nicht überein.",
      new_password_are_same_as_old:
        "Ihr neues Passwort muss sich von den zuvor verwendeten Passwörtern unterscheiden",
    },
  },
  errors: {
    abstract:
      "Leider ist etwas schiefgelaufen. Bitte versuchen Sie es später noch einmal.",
    galary_permission:
      "Es gibt keinen Zugang zur Galerie. Überprüfen Sie Ihre Berechtigungen in den Einstellungen.",
    camera_permission:
      "Es gibt keinen Zugang zur Kamera. Überprüfen Sie Ihre Berechtigungen in den Einstellungen.",
  },
  my_profile: {
    tab_name: "Einstellungen",
    headline: "Mein Profil",
    verified_gray: "Sie wurden von",
    verified_black: "Personen bestätigt",
    buttons_text: {
      my_profile: "Mein Profil",
      language: "Sprache",
      notifications: "Benachrichtigungen",
      invite_friends: "Freunde einladen",
      private_policy: "Datenschutz",
      change_password: "Passwort ändern",
      sign_out: "Ausloggen",
      delete_profile: "Profil löschen",
    },
  },
  change_language: {
    title: "Sprache",
    languages: {
      english: "Englisch",
      germany: "Deutsch",
    },
  },
  edit_profile: {
    title: "Mein Profil",
    delete: "Löschen",
    buttons_text: {
      edit: "Editieren",
      cancel: "Abbrechen",
      save: "Speichern",
    },
    placeholders: {
      name: "Vorname",
      lastName: "Nachname",
      dateOfBirth: "Geburtsdatum",
      email: "E-Mail",
      phone: "Nummer",
      address: "Adresse (Straße, Stadt)",
      postCode: "Postleitzahl",
    },
  },
  upload_files: {
    camera: "Kamera",
    gallary: "Galerie",
  },
  homepage: {
    tab_name: "Vertrag erstellen",
    description: "Bitte wählen Sie den Vertragstyp aus",
    search: "Suche",
    contract_types: {
      purchase: "Kaufvertrag",
      work: "Werkvertrag",
      rental: "Mietvertrag",
      free: "Freiformvertrag",
      car: "Autokaufvertrag",
    },
  },
  my_contracts: {
    tab_name: "Meine Verträge",
  },
  menu: {
    cancel: "Abbrechen",
  },
  notifications: {
    title: "Benachrichtigungen",
  },
};
