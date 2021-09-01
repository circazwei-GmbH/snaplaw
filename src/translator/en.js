import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../store/modules/contract/constants";
import {
  CONDITION_VALUE,
  CONFIRMATION_FIELDS,
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
      new_password_are_same_as_old:
        "Your new password must be different from the previously used passwords",
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
      dateOfBirth: "Date of birth (DD-MM-YYYY)",
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
    },
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
  },
  menu: {
    cancel: "Cancel",
  },
  notifications: {
    title: "Notifications",
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
            "The seller assures that the goods described above are his exclusive property, have not been stolen and are free from the rights of third parties.",
          [CONFIRMATION_FIELDS.SECOND]:
            "Buyer details have been verified and match.",
        },
      },
      [CONTRACT_SCREEN_TYPES.PAYMENT]: {
        title: "Payment",
        product_price: "1. Please enter the product price",
        payment_method: "2. Please select a payment method",
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
      },
      [CONTRACT_SCREEN_TYPES.SIGN]: {
        title: "sign contract",
        signature: "1. Please enter your signature",
        invite: "2. Please invite user",
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
      edit: 'Edit',
      save: 'Save'
    },
    messages: {
      found_in_pregress_folder: 'The contract is sent to Buyer. The contract can be found in ^In progress^ folder.'
    }
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
};
