import { MEMBER_TYPE_VALUE } from "../store/modules/contract/carSales/member-type";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../store/modules/contract/constants";
import {
  CONDITION_VALUE,
  CONFIRMATION_FIELDS,
  PAYMENT_METHODS,
} from "../store/modules/contract/types";

export default {
  welcome: {
    headline: "Welcome to Snaplaw",
    sign_in: "Sign in",
    sign_up: "Sign up",
  },
  sign_up: {
    headline: "Sign up",
    name_field: "Name",
    email_field: "Email",
    password_field: "Password",
    submit: "Create",
    alternative: "or sign up with ",
    to_login: "Already have an account?",
    log_in: "Sign in",
    errors: {
      email_taken: "Email has already been taken",
      name_required: "Name is required",
      email_not_valid: "Please enter a valid email",
      password_length: "Password must be at least 6 characters",
    },
  },
  sign_in: {
    headline: "Sign in",
    email_field: "Email",
    password_field: "Password",
    forgot_password: "Forgot password?",
    alternative: "Or sign in with",
    to_sign_up: "Don’t have any account?",
    sign_up: "Sign up",
    errors: {
      email_not_valid: "Please enter a valid email",
      password_length: "Password must be at least 6 characters",
      user_not_found: "Sorry, we couldn't find account with this email",
      password_not_valid: "Password is invalid",
    },
  },
  verification: {
    title: "Verify you email",
    description: "Please enter the 4 digit code sent to %{email}",
    resend: {
      text: "Didn’t receive the code?",
      link: "Resend code",
    },
    submit: "Verify",
    modals: {
      information: {
        text: "We have just sent a verification code to your email",
      },
      confirm: {
        text: "The code has already expired. Send the code again?",
        buttons: {
          no: "No",
          yes: "Yes",
        },
      },
    },
    errors: {
      user_not_found: "User is not found",
      code_incorrect: "Code is incorrect",
    },
  },
  forgot_password: {
    title: "Forgot password",
    description:
      "Enter your registered email below to receive password reset instruction",
    input: "Email",
    send: "Send",
    errors: {
      email_not_valid: "Please enter a valid email",
      email_not_fount: "Sorry, we couldn't find account with this email",
    },
  },
  change_password: {
    title: "Create new password",
    description:
      "Your new password must be different from the previously used password",
    fields: {
      new_password: "New password",
      confirm_password: "Confirm new password",
    },
    save: "Save",
    errors: {
      password_length: "Password must be at least 6 characters",
      confirm_password: "Passwords don't match.",
      new_password_are_same_as_old: "New password must not match the old one.",
    },
  },
  errors: {
    abstract: "Something went wrong. Try again later.",
    galary_permission:
      "There is no access to the gallery. Check your permissions in settings.",
    camera_permission:
      "There is no access to the camera. Check your permissions in settings.",
  },
  my_profile: {
    tab_name: "Settings",
    headline: "My Profile",
    verified_gray: "You have been verified by",
    verified_black: "people",
    buttons_text: {
      my_profile: "My profile",
      language: "Language",
      notifications: "Notifications",
      invite_friends: "Invite friends",
      private_policy: "Privacy Policy",
      change_password: "Change password",
      sign_out: "Sign out",
      delete_profile: "Delete profile",
    },
  },
  change_language: {
    title: "Language",
    languages: {
      english: "English",
      germany: "German",
    },
  },
  edit_profile: {
    title: "My Profile",
    delete: "Delete",
    buttons_text: {
      edit: "Edit",
      cancel: "Cancel",
      save: "Save",
    },
    placeholders: {
      name: "First name",
      lastName: "Last name",
      dateOfBirth: "Date of birth",
      email: "E-mail",
      phone: "Phone",
      address: "Address (Street, City)",
      postCode: "Postal code",
    },
    modals: {
      save: {
        message: "Do you want to save changes you made?",
        confirm: "Confirm",
        cancel: "Cancel",
      },
      cancel: {
        message: "You have unsaved changes. Are you sure you want to leave?",
        yes: "Yes",
        no: "No",
      },
      sign_out: {
        message: "Are you sure you want to leave the app?",
        yes: "Yes",
        no: "No",
      },
    },
    error: "The field can't be empty",
  },
  upload_files: {
    camera: "Camera",
    gallary: "Gallery",
  },
  homepage: {
    tab_name: "Create contract",
    description: "Please select the type of contract you need",
    search: "Search",
    contract_types: {
      purchase: "Purchase contract",
      work: "Work contract",
      rental: "Rental contract",
      free: "Free-form contract",
      car: "Car sales contract",
    },
  },
  purchase_contract: {
    user_data: "USER DATA",
  },
  my_contracts: {
    tab_name: "My contracts",
    lists: {
      finalized: "Finalized",
      in_progress: "In progress",
    },
    empty_list: "You have no contracts yet",
    actions: {
      edit: "Edit contract",
      delete: "Delete contract",
      see_partner: "See contract partner",
      delete_partner: "Delete contract partner",
      invite_partner: "Invite user",
      view_pdf: "View",
      decline: "Decline",
      contract_history: "See contract change history",
    },
    delete_modal: {
      message: "Are you sure you want to delete the contract?",
      yes: "Yes",
      no: "No",
    },
    delete_partner: {
      message: "Are you sure you want to delete the contractor?",
      yes: "Yes",
      no: "No",
    },
    smart_filters: {
      modal_name: "Smart Filters",
      modal_subtitle: "Refine your contracts list",
      categories: "Types:",
      clear_all: "Clear all",
      by_date: "By date:",
      contract_types: {
        purchase: "Purchase contract",
        work: "Work contract",
        rental: "Rental contract",
        free: "Free-form contract",
        car: "Car sales contract",
      },
      apply: "Apply",
    },
  },
  menu: {
    cancel: "Cancel",
    confirm: "Confirm"
  },
  notifications: {
    title: "Notifications",
    title_second: "You have the following notifications",
    empty_list: "You have no notifications yet.",
    read_button: "Read",
    messages: {
      invited:
        "You have been just invited to contract%{contract} by %{partner}",
      rejected: "Invite to contract%{contract} has been rejected by %{partner}",
      accepted_invite:
        "Invite to contract %{contract} has been accepted by %{partner}",
      accepted_invite_success:
        "Contract is added to My Contracts list, ^In progress^ tab",
      invite_to_contract_rejected:
        "You've been just removed from the contract %{contract} by %{partner}",
      accept_invite_error:
        "Your action is not required anymore. Either the contract is already accepted or you are deleted from the contract by owner.",
      removed_from_contract:
        "You've been just removed from the contract %{contract} by %{partner}",
      contractor_left: "%{partner} has left the contract %{contract}",
      contract_deleted:
        "Contract %{contract} has just been deleted by %{partner}",
      contract_change_request: "Contract %{contract} updated by %{partner}",
    },
    modal_buttons: {
      accept: "Accept",
      cancel: "Cancel",
      ok: "Ok",
    },
  },
  contracts: {
    [CONTRACT_TYPES.PURCHASE]: {
      title: "Purchase contract",
      [CONTRACT_SCREEN_TYPES.USER_DATA]: {
        title: "user data",
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DATA]: {
        title: "product data",
        placeholders: {
          subject: "Subject of sales",
          producer: "Producer",
          designation: "Type designation",
          serial: "Serial number",
        },
        switchTitle: "Please indicate if there is a serial number",
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION]: {
        title: "product condition",
        checkboxes: {
          [CONDITION_VALUE.NEW]: "New",
          [CONDITION_VALUE.HIGH_QUALITY]: "High quality",
          [CONDITION_VALUE.USED]: "Used",
          [CONDITION_VALUE.DEFECTIVE]: "Defective",
        },
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
        title: "additional information",
        titleTwo: "Please add product description",
        titleThree: "Please add accessories description",
        placeholder: "Write here everything that you think is important",
        button: "Upload file",
        checkbox: "Accessories are sold with this product",
      },
      [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
        title: "Confirmation",
        confirmation: {
          [CONFIRMATION_FIELDS.FIRST]:
            "The seller assures that the goods described above are their exclusive property, have not been stolen and are free from the rights of third parties.",
          [CONFIRMATION_FIELDS.SECOND]:
            "Buyer details have been verified and match.",
          [CONFIRMATION_FIELDS.SELLER_DETAIL]:
            "Seller details have been verified and match",
        },
        partner_text: "Please recheck their identity with a passport.",
      },
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        title: "Payment",
        product_price: "Please enter the product price",
        payment_method: "Please select a payment method",
        fields: {
          cost: "Cost",
          name: "Cardholder name",
          card: "Card number",
        },
        checkboxes: {
          cash: "Cash",
          paypal: "PayPal",
          transfer: "Money transfer",
        },
        payment_methods: {
          [PAYMENT_METHODS.CASH]: "cash",
          [PAYMENT_METHODS.PAYPAL]: "PayPal",
          [PAYMENT_METHODS.TRANSFER]: "money transfer",
        },
        partner_text: "The seller chose to pay in %{method}.",
      },
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "sign contract",
        signature: "Please enter your signature",
        invite: "Please invite user",
      },
    },
    [CONTRACT_TYPES.CAR]: {
      title: "Car sales contract",
      [CONTRACT_SCREEN_TYPES.MEMBER_TYPE]: {
        titleSeller: "Seller type",
        titleBuyer: "Buyer data",
        secondTitle: "Please indicate which seller you are",
        checkboxes: {
          [MEMBER_TYPE_VALUE.COMMERCIAL]: "Commercial",
          [MEMBER_TYPE_VALUE.PRIVAT]: "Private",
        },
        buyerWarning: {
          fee: "As commercial user you will need to pay 19% fee additionally.",
          calculation: "The initial sum was %{sum} euro. Incl. fee the total sum will be %{total} euro."
        }
      },
      [CONTRACT_SCREEN_TYPES.USER_DATA]: {
        title: "user data",
      },
      [CONTRACT_SCREEN_TYPES.COMPANY_DATA]: {
        title: "Company data",
        placeholders: {
          companyName: "Company Name",
          vatId: "VAT ID",
          email: "E-Mail",
          address: "Address (Street, City)",
          postCode: "Postal code",
          phone: "Phone"
        }
      },
      [CONTRACT_SCREEN_TYPES.PASSPORT_DATA]: {
        title: "Passport data",
        placeholders: {
          idCard: "ID card number",
          identificationCode: "Identification code",
        }
      },
      [CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]: {
        title: "Car description",
        titleTwo: "Please add car description",
        placeholder: "Write here everything that you think is important",
        button: "Upload file",
      },
      [CONTRACT_SCREEN_TYPES.CONFIRMATION]: {
        title: "Confirmation",
        confirmation: {
          [CONFIRMATION_FIELDS.FIRST]:
            "The seller warrants that he is not aware of any further damage or defect",
          [CONFIRMATION_FIELDS.SECOND]:
            "Buyer details have been verified and match",
          [CONFIRMATION_FIELDS.THIRD]:
            "The seller certifies that the vehicle was used for personal purposes and not for commercial purposes",
          [CONFIRMATION_FIELDS.SELLER_DETAIL]:
            "Seller details have been verified and match",
        },
        partner_text: "Please recheck their identity with a passport.",
      },   
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "sign contract",
        signature: "Please enter your signature",
        invite: "Please invite user",
      },      
    },
    confirmation_modal: {
      message: "Are you sure, you want to cancel contract creation?",
      buttons: {
        ok: "Yes",
        cancel: "No",
      },
    },
    buttons: {
      next: "Next",
      back: "Back",
      cancel: "Cancel",
      view: "View contract",
    },
    pdf_view: {
      edit: "Edit",
      save: "Save",
      cancel: "Cancel",
      additional_media: "Additional information",
      accessories_media: "Accessories",
      enter_contract_details: "Enter contract details",
    },
    messages: {
      found_in_pregress_folder_with_invite:
        "Don't forget to invite the buyer. The contract can be found in ^In progress^ folder.",
      found_in_pregress_folder:
        "The contract saved and can be found in ^In progress^ folder.",
      coming_soon: "Functionality is coming soon",
    },
    validation: {
      field_empty: "The field can't be empty",
      product_condition: "Please specify the product condition",
    },
    change_prequest_modal: {
      message:
        "Are you sure you want to request the change? The opponent will be required to re-sign the contract.",
      yes: "Yes",
      no: "No",
    },
    finalize: {
      message:
        "The contract is finalized and can be found in the corresponding tab",
    },
  },
  sign_form: {
    title: "Sign contract with your finger",
    buttons: {
      cancel: "Cancel",
      create: "Create",
      clear: "Clear",
    },
    description: {
      first: "By tapping ",
      second:
        ", I agree that the signature will be the electronic representation of my signature for all purposes when I use them on documents.",
    },
  },
  ok: "OK",
  invite_page: {
    title: "Invite",
    invitation:
      "Enter the email address of the partner and invite him to the contract",
    error: "Please enter a valid email",
    self_invite_error: "You can't invite yourself.",
    successed: "User has been successfully invited",
  },
};
