import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../store/modules/contract/constants";
import { CONDITION_VALUE } from "../store/modules/contract/purchase/product-condition";
import { CONFIRMATION_FIELDS } from "../store/modules/contract/purchase/confirmation";

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
    modals: {
      save: {
        message: "Möchten Sie die vorgenommenen Änderungen speichern?",
        confirm: "Bestätigen",
        cancel: "Abbrechen",
      },
      cancel: {
        message:
          "Sie haben die ungespeicherten Änderungen. Sind Sie sicher, sie wollen weitergehen?",
        yes: "Ja",
        no: "Nein",
      },
      sign_out: {
        message: "Sind Sie sicher, dass Sie die App verlassen wollen?",
        yes: "Ja",
        no: "Nein",
      },
    },
    error: "Das Feld kann nicht leer sein",
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
  purchase_contract: {
    user_data: "BENUTZERDATEN",
  },
  my_contracts: {
    tab_name: "Meine Verträge",
    lists: {
      finalized: "Abgeschlossen",
      in_progress: "In Bearbeitung",
    },
    empty_list: "Sie haben noch keine Verträge",
    actions: {
      edit: "Vertrag editieren",
      delete: "Vertrag löschen",
      see_partner: "Vertragspartner sehen",
      delete_partner: "Vertragspartner löschen",
      invite_partner: "Benutzer einladen",
      view_pdf: "Ansehen",
      decline: "Ablehnen",
    },
    delete_modal: {
      message: "Sind Sie sicher, dass Sie den Kontakt löschen möchten?",
      yes: "Ja",
      no: "Nein",
    },
    delete_partner: {
      message: "Sind Sie sicher, dass Sie den Kontakt löschen möchten?",
      yes: "Ja",
      no: "Nein",
    },
  },
  menu: {
    cancel: "Abbrechen",
  },
  notifications: {
    title: "Benachrichtigungen",
    title_second: "Sie haben die folgenden Benachrichtigungen",
    empty_list: "Sie haben noch keine Benachrichtigungen.",
    read_button: "Lesen",
    messages: {
      invited:
        "Sie wurden gerade zum Vertrag%{contract} von %{partner} eingeladen",
      rejected:
        "Einladung zum Vertrag%{contract} wurde von %{partner} abgelehnt",
      accepted_invite:
        "Einladung zum Vertrag %{contract} wurde von %{partner} angenommen",
      accepted_invite_success:
        "Der Vertrag ist zu Meinen Kontakten hinzugefügt, ^in Progress-Tab^.",
      invite_to_contract_rejected:
        "Sie wurden gerade aus dem Vertrag %{contract} von %{partner} gelösch",
      accept_invite_error:
        "Ihre Aktion ist nicht mehr nötig. Entweder ist der Vertrag schon akzeptiert oder Sie sind vom Besitzer aus dem Vertrag gelöscht.",
      removed_from_contract:
        "Sie wurden gerade aus dem Vertrag %{contract} von %{partner} gelösch",
      contractor_left: "%{partner} hat den Vertrag %{contract} verlassen",
    },
    modal_buttons: {
      accept: "Akzeptieren",
      cancel: "Abbrechen",
      ok: "Ok",
    },
  },
  contracts: {
    [CONTRACT_TYPES.PURCHASE]: {
      title: "Kaufvertrag",
      [CONTRACT_SCREEN_TYPES.USER_DATA]: {
        title: "Benutzerdaten",
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
        title: "Produktdaten",
        placeholders: {
          subject: "Kaufgegenstand",
          producer: "Hersteller",
          designation: "Typebezeichnung",
          serial: "Seriennummer",
        },
        switchTitle: "Bitte geben Sie an, ob eine Seriennummer vorhanden ist",
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]: {
        title: "Zustand des Artikels",
        checkboxes: {
          [CONDITION_VALUE.NEW]: "Neu",
          [CONDITION_VALUE.HIGH_QUALITY]: "Neuwertig",
          [CONDITION_VALUE.USED]: "Gebraucht",
          [CONDITION_VALUE.DEFECTIVE]: "Defekt",
        },
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
        title: "additionale Information",
        titleTwo: "Bitte geben Sie die Beschreibung des Artikels an",
        titleThree: "Bitte fügen Sie eine Beschreibung des Zubehörs hinzu",
        placeholder: "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        button: "Datei hochladen",
        checkbox: "Folgendes Zubehör wird mitverkauft",
      },
      [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
        title: "Besätigung",
        confirmation: {
          [CONFIRMATION_FIELDS.FIRST]:
            "Der Verkäufer versichert, dass der oben beschriebene Artikel in seinem alleinigen Eigentum steht, nicht gestohlen ist und frei von Rechten Dritter ist.",
          [CONFIRMATION_FIELDS.SECOND]:
            "Die Käuferdaten wurden überprüft und stimmen überein.",
          [CONFIRMATION_FIELDS.SELLER_DETAIL]:
            "Die Verkäuferdaten wurden überprüft und stimmen überein.",
        },
        partner_text: "Bitte überprüfen Sie seine Identität mit einem Pass.",
      },
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        title: "Bezahlung",
        product_price: "1. Bitte geben Sie den Preis des Artikels an",
        payment_method: "2. Bitte Zahlungsart wählen",
        fields: {
          cost: "Cost",
          name: "Name des Karteninhabers",
          card: "Kartennummer",
        },
        checkboxes: {
          cash: "Bar",
          paypal: "Paypal",
          transfer: "Überweisung",
        },
        partner_text: "Der Verkäufer hat sich für Barzahlung entschieden.",
      },
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "Vertrag unterzeichnen",
        signature: "1. Bitte Ihre Unterschift eingeben",
        invite: "2. Bitte Benutzer einladen",
      },
    },
    confirmation_modal: {
      message: "Wollten Sie die Vertragserstellung wirklich abbrechen?",
      buttons: {
        ok: "Ja",
        cancel: "Nein",
      },
    },
    buttons: {
      next: "Weiter",
      back: "Zurück",
      cancel: "Abbrechen",
      view: "Vertrag anschauen",
    },
    pdf_view: {
      edit: "Editieren",
      save: "Speichern",
      cancel: "Abbrechen",
      additional_media: "Additionale Information",
      accessories_media: "Zubehör",
    },
    messages: {
      found_in_pregress_folder:
        "Vergessen Sie bitte nicht, den Kunden einzuladen. Den Vertrag finden Sie im ^In Bearbeitung^ Ordner.",
    },
    validation: {
      field_empty: "Das Feld kann nicht leer sein",
      product_condition: "Klären Sie bitte den Produktzustand",
    },
  },
  sign_form: {
    title: "Vertrag mit dem Finger unterschreiben",
    buttons: {
      cancel: "Abbrechen",
      create: "Erstellen",
      clear: "Löschen",
    },
    description: {
      first: "Indem ich auf ",
      second:
        " klicke, stimme ich zu, dass die Unterschrift die elektronische Darstellung meiner Unterschrift für alle Zwecke ist, wenn ich sie auf Dokumenten verwende.",
    },
  },
  ok: "OK",
  invite_page: {
    title: "Einladen",
    invitation:
      "Geben Sie die E-Mail-Adresse des Partners ein und laden Sie ihn zum Vertrag ein",
    error: "Bitte geben Sie eine gültige Email-Adresse ein",
    self_invite_error: "Sie können sich selbst nicht einladen.",
    successed: "Der Nutzer ist erfolgreich eingeladen",
  },
};
