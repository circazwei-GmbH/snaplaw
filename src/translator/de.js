import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../store/modules/contract/constants";
import { CONDITION_VALUE } from "../store/modules/contract/purchase/product-condition";
import { CONFIRMATION_FIELDS } from "../store/modules/contract/confirmation";
import { MEMBER_TYPE_VALUE } from "../store/modules/contract/carSales/member-type";
import { CONTRACT_ROLE } from "../store/modules/contract/contract-roles";
import { PAYMENT_INFO_FIELDS } from "../store/modules/contract/carSales/payment-info";
import { SECONDARY_ROOMS_FIELDS } from "../store/modules/contract/secondary-rooms-data";
import { USABLE_SPACES_FIELDS } from "../store/modules/contract/usable-spaces-data";
import { COMMON_ROOMS_FIELDS } from "../store/modules/contract/common-rooms-data";
import { DIRECT_SUPPLY_FIELDS } from "../store/modules/contract/direct-supply-data";
import { ADDITIONAL_INFO_RENTAL_FIELDS } from "../store/modules/contract/additional-info-rental-data";
import { RENTAL_PROPERTY_FIELDS } from "../store/modules/contract/rental-property-data";
import { RENTAL_PERIOD_FIELDS } from "../store/modules/contract/rental-period-data";
import { PAYMENT_METHODS } from "../store/modules/contract/payment";
import { DEPOSIT_TYPES } from "../store/modules/contract/deposit-data";
import { USER_DATA_FIELDS } from "../store/modules/contract/user-data";
import { COMPANY_DATA_FIELDS } from "../store/modules/contract/company-data";
import { PASSPORT_DATA_FIELDS } from "../store/modules/contract/passport-data";

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
        text:
          "Wir haben bereits einen Bestätigungscode an Ihre E-Mail gesendet.",
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
        "Das neue Passwort soll nicht mit dem alten übereinstimmen.",
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
      [USER_DATA_FIELDS.name]: "Vorname",
      [USER_DATA_FIELDS.lastName]: "Nachname",
      [USER_DATA_FIELDS.dateOfBirth]: "Geburtsdatum",
      [USER_DATA_FIELDS.email]: "E-Mail",
      [USER_DATA_FIELDS.phone]: "Nummer",
      [USER_DATA_FIELDS.address]: "Adresse (Straße, Stadt)",
      [USER_DATA_FIELDS.postCode]: "Postleitzahl",
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
      contract_history: "Vertragänderungsverlauf sehen",
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
    smart_filters: {
      modal_name: "Smart-Filter",
      modal_subtitle: "Präzisieren Sie Ihre Vertragsliste",
      categories: "Typen:",
      clear_all: "Alles löschen",
      by_date: "nach Datum:",
      contract_types: {
        purchase: "Kaufvertrag",
        work: "Werkvertrag",
        rental: "Mietvertrag",
        free: "Freiformvertrag",
        car: "Autokaufvertrag",
      },
      apply: "Anwenden",
    },
  },
  menu: {
    cancel: "Abbrechen",
    confirm: "Bestätigen",
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
      contract_deleted:
        "Vertrag %{contract} wurde gerade von %{partner} gelöscht",
      contract_change_request:
        "Vertrag %{contract} wurde von %{partner} aktualisiert",
      sign_request:
        "Der Lieferant hat den Preis für die Dienstleistungen festgestellt und den Vertrag %{contract} unterschrieben.",
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
          [CONTRACT_ROLE.OWNER]: {
            [CONFIRMATION_FIELDS.FIRST]:
              "Der Verkäufer versichert, dass der oben beschriebene Artikel in seinem alleinigen Eigentum steht, nicht gestohlen ist und frei von Rechten Dritter ist.",
            [CONFIRMATION_FIELDS.SECOND]:
              "Die Käuferdaten wurden überprüft und stimmen überein.",
          },
          [CONTRACT_ROLE.PARTNER]: {
            [CONFIRMATION_FIELDS.SELLER_DETAIL]:
              "Die Verkäuferdaten wurden überprüft und stimmen überein.",
          },
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
        partner_text: "Der Verkäufer hat sich für Barzahlung entschieden.", //translate
      },
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "Vertrag unterzeichnen",
        signature: "1. Bitte Ihre Unterschift eingeben",
        invite: "2. Bitte Benutzer einladen",
      },
    },
    [CONTRACT_TYPES.CAR]: {
      title: "Autokaufvertrag",
      [CONTRACT_SCREEN_TYPES.MEMBER_TYPE]: {
        titleSeller: "Verkäufertyp",
        titleBuyer: "Käuferdaten",
        secondTitle: "Bitte geben Sie an, welcher Verkäufer Sie sind",
        checkboxes: {
          [MEMBER_TYPE_VALUE.COMMERCIAL]: "Gewerblich",
          [MEMBER_TYPE_VALUE.PRIVAT]: "Privat",
        },
        buyerWarning: {
          fee:
            "Als gewerblicher Kunde müssen Sie zusätzlich 19% Steuer zahlen.",
          calculation:
            "Die ursprüngliche Summe betrug %{sum} Euro. Inkl. Steuer beträgt die Gesamtsumme %{total} Euro.",
        },
      },
      [CONTRACT_SCREEN_TYPES.USER_DATA]: {
        title: "Benutzerdaten",
      },
      [CONTRACT_SCREEN_TYPES.COMPANY_DATA]: {
        title: "Firmendaten",
        placeholders: {
          [COMPANY_DATA_FIELDS.companyName]: "Firmenname",
          [COMPANY_DATA_FIELDS.vatId]: "Umsatzsteuer-ID",
          [COMPANY_DATA_FIELDS.email]: "E-Mail",
          [COMPANY_DATA_FIELDS.address]: "Adresse (Straße, Stadt)",
          [COMPANY_DATA_FIELDS.postCode]: "Postleitzahl",
          [COMPANY_DATA_FIELDS.phone]: "Nummer",
        },
      },
      [CONTRACT_SCREEN_TYPES.PASSPORT_DATA]: {
        title: "Passdaten",
        placeholders: {
          [PASSPORT_DATA_FIELDS.idCard]: "ID Kartennummer",
          [PASSPORT_DATA_FIELDS.identificationCode]: "Identifikationsnummer",
        },
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
        title: "Produktdaten",
        placeholders: {
          producer: "Hersteller",
          model: "Auto Model",
          type: "Typ",
          year: "Ausgabejahr",
          prevRegistrationNumber: "Bisherige amtliches Kennzeichen",
          serialNumber: "Seriennummer",
          run: "KM-Stand",
        },
        modalTitles: {
          producer: "Hersteller",
          model: "Auto Model",
          type: "Typ",
          year: "Ausgabejahr",
        },
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
        title: "Fahrzeugbeschreibung",
        titleTwo: "Bitte Fahrzeugbeschreibung angeben",
        placeholder: "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        button: "Datei hochladen",
      },
      [CONTRACT_SCREEN_TYPES.PASSPORT_DATA]: {
        title: "Passdaten",
        placeholders: {
          idCard: "ID Kartennummer",
          identificationCode: "Identifikationsnummer",
        },
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
        title: "Produktdaten",
        placeholders: {
          producer: "Hersteller",
          model: "Auto Model",
          type: "Typ",
          year: "Ausgabejahr",
          prevRegistrationNumber: "Bisherige amtliches Kennzeichen",
          serialNumber: "Seriennummer",
          run: "KM-Stand",
        },
        modalTitles: {
          producer: "Hersteller",
          model: "Auto Model",
          type: "Typ",
          year: "Ausgabejahr",
        },
      },
      [CONTRACT_SCREEN_TYPES.SPECIFICATIONS]: {
        title: "Angaben",
        placeholders: {
          inspection: "TÜV",
          commercial: "Gewerblich genutztes Fahrzeug",
          foreignMade: "Importfahrzeug",
          technicalWork: "Technische Arbeiten wurden durchgeführt",
          service: "Service Heft liegt bei",
          deregistered: "Das Fahrzeug ist abgemeldet",
          deregisteredDate: "Das Fahrzeug ist abgemeldet bis",
          inspectionDate: "Fälligkeitsdatum angeben",
        },
      },
      [CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO]: {
        title: "Additionale Information",
        fields: {
          accidentDamage: "Unfallschäden",
          otherDefects: "Sonstige bekannte Mängel",
        },
        damage: {
          title: "Bitte Unfallschädenbeschreibung hinzufügen",
          placeholder:
            "Schreiben Sie hier alles auf, was Sie für wichtig halten",
          uploadFiles: "Datei hochladen",
        },
        defect: {
          title: "Bitte Fehlerbeschreibung hinzufügen",
          placeholder:
            "Schreiben Sie hier alles auf, was Sie für wichtig halten",
          uploadFiles: "Datei hochladen",
        },
      },
      [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
        title: "Confirmation",
        confirmation: {
          [CONTRACT_ROLE.OWNER]: {
            [CONFIRMATION_FIELDS.FIRST]:
              "Der Verkäufer versichert, dass ihm keine weiteren Schäden und Mängel bekannt sind",
            [CONFIRMATION_FIELDS.SECOND]:
              "Der Verkäufer versichert, dass das Fahrzeug privat und nicht gewerblich genutzt wurde",
            [CONFIRMATION_FIELDS.THIRD]:
              "Buyer details have been verified and match", //translate
          },
          [CONTRACT_ROLE.PARTNER]: {
            [CONFIRMATION_FIELDS.FIRST]:
              "Der Käufer erkennt an, dass das Fahrzeug bis zur vollständigen Bezahlung Eigentum des Verkäufers bleibt",
            [CONFIRMATION_FIELDS.SELLER_DETAIL]:
              "Verkäufer und Käufer vereinbaren, dass der Käufer die Zahlung in Höhe von %{amount} überweisen wird",
            [CONFIRMATION_FIELDS.SECOND]:
              "Die Verkäuferdaten wurden überprüft und stimmen überein",
          },
        },
      },
      [CONTRACT_SCREEN_TYPES.PAYMENT_INFO]: {
        title: "Payment information", //translate
        placeholders: {
          [PAYMENT_INFO_FIELDS.ACCOUNT_OWNER]: "Account owner", //translate
          [PAYMENT_INFO_FIELDS.ACCOUNT_NUMBER]: "Account number", //translate
          [PAYMENT_INFO_FIELDS.IBAN]: "IBAN", //translate
          [PAYMENT_INFO_FIELDS.BIC]: "BIC", //translate
        },
      },
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        title: "Bezahlung",
        product_price: "Bitte geben Sie den Preis des Artikels an", //translate
        payment_method: "Bitte Zahlungsart wählen",
        fields: {
          cost: "Preis",
          payment_date: "Zahlungsdatum",
          due_date: "Due date", //translate
          advance_date: "Vorauszahlungsdatum",
          advance_cost: "Vorauszahlungspreis",
          left_sum: "Restbetrag Fälligkeitsdatum",
        },
        checkboxes: {
          cash: "Cash",
          transfer: "Überweisung",
          cash_advance: "Vorauszahlung",
        },
        partner_text: "Der Verkäufer hat sich für Barzahlung entschieden.", //translate%{method}
      },
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "Vertrag unterzeichnen",
        signature: "Bitte Ihre Unterschift eingeben",
        invite: "Bitte Benutzer einladen",
      },
    },
    [CONTRACT_TYPES.WORK]: {
      title: "Werkvertrag",
      [CONTRACT_SCREEN_TYPES.USER_DATA]: {
        title: "Benutzerdaten",
      },
      [CONTRACT_SCREEN_TYPES.SERVICES]: {
        title: "Dienstleistungen",
        serviceTitle:
          "Bitte geben Sie an, welche Dienstleistung Sie erbringen müssen",
        dateTitle: "Die Dienstleistung muss erbracht werden vor:",
        placeholders: {
          service: "Dienstleistungen",
          date: "Datum",
        },
        button: "Noch eine Dienstleistung hinzufügen",
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
        title: "additionale Information",
        titleTwo: "Bitte geben Sie die Beschreibung des Artikels an",
        placeholder: "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        button: "Datei hochladen",
      },
      [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
        title: "Besätigung",
        confirmation: {
          [CONTRACT_ROLE.OWNER]: {
            [CONFIRMATION_FIELDS.FIRST]:
              "Customer details have been verified and match.",
          },
          [CONTRACT_ROLE.PARTNER]: {
            [CONFIRMATION_FIELDS.SELLER_DETAIL]:
              "Customer details have been verified and match.",
          },
        },
        partner_text: "Bitte überprüfen Sie seine Identität mit einem Pass.",
      },
      [CONTRACT_SCREEN_TYPES.INVITE_USER]: {
        title: "Benutzer einladen",
        titleTwo: "Bitte Benutzer einladen",
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
      },
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "Vertrag unterzeichnen",
        signature: "Bitte Ihre Unterschift eingeben",
        invite: "Bitte Benutzer einladen",
      },
    },
    [CONTRACT_TYPES.RENTAL]: {
      title: "Rental contract",
      [CONTRACT_SCREEN_TYPES.USER_DATA]: {
        title: "Benutzerdaten",
      },
      [CONTRACT_SCREEN_TYPES.ANOTHER_PERSON_DATA]: {
        title: "personal data of another person", //translate
      },
      [CONTRACT_SCREEN_TYPES.PASSPORT_DATA]: {
        title: "Passdaten",
        placeholders: {
          idCard: "ID Kartennummer",
          identificationCode: "Identifikationsnummer",
        },
      },
      [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
        title: "Besätigung",
        confirmation: {
          [CONTRACT_ROLE.OWNER]: {
            [CONFIRMATION_FIELDS.FIRST]:
              "Die Mieterdetails wurden überprüft und stimmen überein",
          },
          [CONTRACT_ROLE.PARTNER]: {
            [CONFIRMATION_FIELDS.FIRST]:
              "Dem Mieter ist der Zustand des Mietgegenstandes bekannt. Es fand eine Inspektion statt",
            [CONFIRMATION_FIELDS.SECOND]:
              "Die Angaben des Vermieters wurden überprüft und stimmen überein",
            [CONFIRMATION_FIELDS.THIRD]:
              "Мeter reading is checked and approved", //translate
          },
          partner_text: "Bitte überprüfen Sie seine Identität mit einem Pass.",
        },
      },
      [CONTRACT_SCREEN_TYPES.ABOUT_HOUSING]: {
        title: "Informationen zum Wohnen",
        placeholders: {
          area: "Wohnfläche in m²",
          roomsNumber:
            "Anzahl der Zimmer ohne Nebenräumeumber of rooms without secondary",
          location: "Lage des Mietobjektes",
          isFurnished: "Wohnung ist möbliert / teilmöbliert",
        },
        furnished: {
          warning: "Details zur Möblierung/Inventar sind dem Übergabeprotokoll",
          title: "Please add description", //translate
          placeholder:
            "Schreiben Sie hier alles auf, was Sie für wichtig halten",
          uploadFiles: "Datei hochladen",
        },
      },
      [CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS]: {
        title: "Nebenräume",
        checkboxes: {
          [SECONDARY_ROOMS_FIELDS.BATHROOM_WC]:
            "Bad mit Dusche/Badewanne und WC",
          [SECONDARY_ROOMS_FIELDS.BATHROOM]: "Bad mit Dusche/Badewanne",
          [SECONDARY_ROOMS_FIELDS.WC]: "WC",
          [SECONDARY_ROOMS_FIELDS.STOREROOM]: "Abstellraum",
          [SECONDARY_ROOMS_FIELDS.BALCONY]: "Balkon",
          [SECONDARY_ROOMS_FIELDS.TERRACE]: "Terrasse",
          [SECONDARY_ROOMS_FIELDS.OTHER]: "Sonstiges",
        },
        titleMultiline: "Please add description", //translate
        placeholder: "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        uploadFiles: "Datei hochladen",
      },
      [CONTRACT_SCREEN_TYPES.USABLE_SPACES]: {
        title: "Nutzungsräume",
        checkboxes: {
          [USABLE_SPACES_FIELDS.GARAGE]: "Garage",
          [USABLE_SPACES_FIELDS.UNDERGROUND_PARKING]: "Tiefgaragenstellplatz",
          [USABLE_SPACES_FIELDS.PARKING]: "Stellplatz",
          [USABLE_SPACES_FIELDS.CELLAR]: "Keller",
          [USABLE_SPACES_FIELDS.GARDEN]: "Garten",
          [USABLE_SPACES_FIELDS.OTHER]: "Sonstiges",
        },
        titleMultiline: "Please add description", //translate
        placeholder: "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        uploadFiles: "Datei hochladen",
      },
      [CONTRACT_SCREEN_TYPES.COMMON_ROOMS]: {
        title: "Gemeinschaftsräume",
        checkboxes: {
          [COMMON_ROOMS_FIELDS.WASHING]: "Waschraum",
          [COMMON_ROOMS_FIELDS.DRYING]: "Trockenplatz",
          [COMMON_ROOMS_FIELDS.SHARED_GARDEN]: "Gemeinschaftsgarten",
          [COMMON_ROOMS_FIELDS.OTHER]: "Sonstiges",
        },
        titleMultiline: "Please add description", //translate
        placeholder: "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        uploadFiles: "Datei hochladen",
      },
      [CONTRACT_SCREEN_TYPES.DIRECT_SUPPLY]: {
        title: "Direktversorgung",
        text:
          "Der Mieter verpflichtet sich auf eigen Kosten folgenden Verasorgungsverträge abzuschließen:",
        checkboxes: {
          [DIRECT_SUPPLY_FIELDS.ELECTRICITY]: "Strom",
          [DIRECT_SUPPLY_FIELDS.WATER]: "Warmwasser / Kaltwasser",
          [DIRECT_SUPPLY_FIELDS.HEATING]: "Heizung",
          [DIRECT_SUPPLY_FIELDS.HEATING_OIL]: "Heizöl",
          [DIRECT_SUPPLY_FIELDS.GAS]: "Gas",
          [DIRECT_SUPPLY_FIELDS.TELEPHONE]: "Telefon",
          [DIRECT_SUPPLY_FIELDS.INTERNET]: "Internet",
          [DIRECT_SUPPLY_FIELDS.GARBAGE_COLLECTION]: "Müllabfuhr",
          [DIRECT_SUPPLY_FIELDS.ALARM]: "Alarm / Sicherheitsdienst",
          [DIRECT_SUPPLY_FIELDS.OTHER]: "Sonstiges",
        },
        titleMultiline: "Please add description", //translate
        placeholder: "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        uploadFiles: "Datei hochladen",
      },
      [CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO]: {
        title: "Additionale Information",
        text:
          "Sie können wählen, welche der folgenden Möglichkeiten der Mieter machen darf:",
        checkboxes: {
          [ADDITIONAL_INFO_RENTAL_FIELDS.COSMETIC_REPAIRS]:
            "Kosmetische Reparaturen",
          [ADDITIONAL_INFO_RENTAL_FIELDS.PETS_ALLOWED]: "Haustiere erlaubt",
          [ADDITIONAL_INFO_RENTAL_FIELDS.SMALL_REPAIRS]: "Kleine Reparaturen",
        },
      },
      [CONTRACT_SCREEN_TYPES.RENTAL_PROPERTY]: {
        title: "Nutzung des Mietobjektes",
        checkboxes: {
          [RENTAL_PROPERTY_FIELDS.PERMITTED]:
            "Die Nutzung des Mietobjektes ist nur im Rahmen des vertraglich vereinbarten Zweck gestattet.",
          [RENTAL_PROPERTY_FIELDS.TREAT]:
            "Der Mieter hat das Mietobjekt inklusive aller gemeinschaftlich genutzter Räume sowie Einrichtungsgegenstände pfleglich zu behandeln und ordnungsgemäß zu reinigen.",
          [RENTAL_PROPERTY_FIELDS.VENTILATE]:
            "Er hat entsprechend der technischen Möglichkeiten regelmäßig zu lüften und zu heizen aller ihm überlassenen Räumlichkeiten.",
          [RENTAL_PROPERTY_FIELDS.REPORT]:
            "Auftretenden Mängel hat der Mieter unverzüglich dem Mieter zu melden.",
        },
      },
      [CONTRACT_SCREEN_TYPES.RENTAL_PERIOD]: {
        title: "Mietzeitraum",
        startText: "Bitte geben Sie den Beginn der Mietzeit an",
        date: "Datum",
        switchers: {
          [RENTAL_PERIOD_FIELDS.MIN_TERM]: "Mindestlaufzeit",
          [RENTAL_PERIOD_FIELDS.RENTING_LIMITED]:
            "Ist das Mietverhältnis zeitlich befristet",
        },
        rentitngLimitedText: "Das Mietverhältnis ist befristet auf den",
      },
      [CONTRACT_SCREEN_TYPES.OPERATING_COSTS]: {
        title: "Betriebskosten",
        product_price: "Legen Sie die Höhe der Betriebskosten fest",
        fields: {
          cost: "Preis",
        },
        warning:
          "Der Mieter trägt die Kosten anteilig für die gemeinschaftlich genutzten Fläche. Bei den übertragenen Kosten handelt es sich um Betriebskosten i.S.d. § 1 - 2 BetrKV Anlage 1 in der jeweils geltenden Fassung.",
      },
      [CONTRACT_SCREEN_TYPES.RENTAL_PRICE]: {
        title: "Mietpreis",
        product_price: "Die monatliche Miete beträgt",
        fields: {
          cost: "Preis",
        },
        warning: "Und ist immer am 3. Werktag des Folgemonats fällig.",
      },
      [CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT]: {
        title: "Preisanpassung",
        fields: {
          deposit: "Anzahlung",
          graduatedLease: "Die Staffelmiete wird erhöht",
        },
        graduatedLease: {
          priceText: "1. Bitte Preis festlegen",
          price: "Preis",
          dateText: "2. Bitte Datum der Preiserhöhung festlegen",
          date: "Datum",
        },
      },
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        title: "Bezahlung",
        payment_method: "Bitte Zahlungsart wählen",
        fields: {
          partner_text: "Please select or confirm a payment method", //translate
          payment_date: "Datum",
          bank_guarantee_text:
            "Please indicate the date by which the tenant must submit the guarantee", //translate
          other_text: "Please add description", //translate
          other_description:
            "Schreiben Sie hier alles auf, was Sie für wichtig halten",
        },
        checkboxes: {
          cash: "Bar",
          transfer: "Überweisung",
          cash_advance: "Bankgarantie",
          other: "Sonstiges",
        },
        payment_methods: {
          [PAYMENT_METHODS.CASH]: "Bar",
          [PAYMENT_METHODS.TRANSFER]: "Überweisung",
          [PAYMENT_METHODS.OTHER]: "Sonstiges",
          [PAYMENT_METHODS.BANK_GUARANTEE]: "Bankgarantie",
        },
        partner_warning: "The seller chose to pay in %{method} way.", //translate
        owner_warning:
          "Wenn Sie die Zahlungsmethode Bankgarantie wählen, ist die Einzahlung nicht aktiv.",
      },
      [CONTRACT_SCREEN_TYPES.NUMBER_OF_TENANTS]: {
        title: "Anzahl der Mieter",
        text: "Wie viele Personen werden die Wohnung bewohnen",
        placeholder: "Anzahl der Kunden",
        switch:
          "Ob eine andere Person als Mieter in den Mietvertrag aufgenommen werden soll",
      },
      [CONTRACT_SCREEN_TYPES.DEPOSIT]: {
        title: "Anzahlung",
        checkboxes: {
          [DEPOSIT_TYPES.TWO_MONTH]: "+ 2 monthly rent", //translate
          [DEPOSIT_TYPES.THREE_MONTH]: "+ 3 monthly rent", //translate
          [DEPOSIT_TYPES.OTHER]: "Sonstiges",
        },
        priceText: "1. Please indicate deposit amount", //translate
        dateText: "2. Please set the due date for payment", //translate
        date: "Datum",
      },
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "Vertrag unterzeichnen",
        signature: "1. Bitte Ihre Unterschift eingeben",
        invite: "2. Bitte Benutzer einladen",
      },
    },
    confirmation_modal: {
      message: "Wollten Sie die Vertragserstellung wirklich abbrechen?",
      confirm_contract_sign:
        "You will not be able to edit the contract after signing it. Check your contract details or sign.", //translate
      buttons: {
        ok: "Ja",
        cancel: "Nein",
        check: "Check", //translate
        sign: "Sign", //translate
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
      accident_damage_media: "Unfallschäden",
      other_defects_media: "Sonstige bekannte Mängel",
      enter_contract_details: "Vertragsdetails eingeben",
    },
    messages: {
      found_in_pregress_folder_with_invite:
        "Vergessen Sie bitte nicht, den Kunden einzuladen. Den Vertrag finden Sie im ^In Bearbeitung^ Ordner.",
      found_in_pregress_folder:
        "Der Vertrag ist gespeichert und befindet sich in dem ^Bearbeitungsordner^.",
      coming_soon: "Die Funktionalität kommt bald dazu.",
    },
    validation: {
      field_empty: "Das Feld kann nicht leer sein",
      product_condition: "Klären Sie bitte den Produktzustand",
      uncorrect_date_order:
        "Das Datum sollte nicht früher als Vorauszahlungdatum sein.",
    },
    change_prequest_modal: {
      message:
        "Sind Sie sicher, dass Sie die Änderungen anfordern möchten? Der Opponent sollte den Vertrag aufs Neue unterschreiben.",
      yes: "Ja",
      no: "Nein",
    },
    finalize: {
      message:
        "Der Vertrag ist fertig und befindet sich in einem entsprechenden Tab.",
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
