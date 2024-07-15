export default {
    tab: {
        admin: {
            settings: "Settings",
            order: "Order",
            scan: "Scan",
            analytics: "Analytics",
            whoIsIn: "Who is in?",
            other: "Other",
        },
        employee: {
            enter: "Enter",
            leave: "Leave",
            info: "Info",
            whoIsIn: "Who is in?",
            other: "Other",
        },
    },
    stack: {
        adminOther: {
            other: "Other",
            settings: "Settings",
            registration: "Registration",
            enter: "Enter",
            leave: "Leave",
            info: "Information",
        },
        qrScan: {
            qrScan: "QR Scan",
        },
    },
    screen: {
        qrScan: {
            scanning: "Scanning",
            ready: "I am ready to scan",
            checkingCamera: "Checking camera availability...",
            cameraUnavailable: "Camera unavailable. Please try again",
            noAccess: "No access to camera. Please allow access",
            noCamera: "No camera available on this device",
            allowCamera: "Allow Camera",
            start: "Start scanning",
            stop: "Stop scanning",
        },
        registration: {
            email:{
                placeholder: "Email",
                error: "Enter a valid email address",
                required: "Email address is required",
                min4: "Email address must be at least 4 characters long",
            },
            name: {
                placeholder: "Name",
                required: "Required field",
            },
            password: {
                placeholder: "Password",
                digit1: "Password must contain at least one digit",
                required: "Required field",
                min6: "Password must be at least 6 characters long",
            },
            confirmPassword: {
                placeholder: "Confirm password",
                match: "Passwords must match",
                required: "Required field",
            },
            role: {
                placeholder: "Role",
                required: "Please select a role",
                select: "Select a role",
            },
            submit: "Register",
        },
        login: {
            email: {
                placeholder: "Email",
                error: "Enter a valid email address",
                required: "Email address is required",
                min4: "Email address must be at least 4 characters long",
            },
            password: {
                placeholder: "Password",
                required: "Required field",
                digit1: "Password must contain at least one digit",
                min6: "Password must be at least 6 characters long",
            },
            submit: "Login",
        },
        settings:{
            deleteData: "Delete saved data",
            theme: "Dark Theme",
            language: "Language",
            alert:{
                confirmationTitle: "?№?!*%?!",
                confirmationText: "Are you sure you want to delete all saved data?",
                cancel: "Cancel",
                confirm: "Confirm",
            }
        }
    }
};
