

export default [

  {
    header: "News and General Data",
    i18n: "new_and_data"
  },
  {
    url: "/home",
    name: "News",
    slug: "News",
    icon: "HomeIcon",
    i18n: "news"

  },
  {
    url: "/system_data",
    name: "General System Data",
    slug: "dashboard",
    icon: "InfoIcon",
    i18n: "general_system_data"

  },
  {
    header: "Registration and Operation",
    i18n: "registration_operation_data"
  },
  {
    url: null,
    name: "Registration",
    slug: "Registration",
    icon: "FileTextIcon",

    i18n: "registration",
    submenu: [
      {
        url: '/registration/operator',
        name: "Operator",
        slug: "eCommerceShop",
        i18n: "operator",
      },
      {
          url: '/registration/vehicle',
          name: "Vehicle",
          slug: "Vehicle",
          i18n: "vehicle",
      },
      {
        url: '/registration/operation_unit',
        name: "Operation Unit",
        slug: "Operation Unit",
        i18n: "operation_unit",
      }, {
        url: '/registration/proffessional',
        name: "Proffessional",
        slug: "Proffessional",
        i18n: "proffessional",
      }, {
        url: '/registration/pharmacy',
        name: "Pharmacy",
        slug: "Pharmacy",
        i18n: "pharmacy",
      }, {
        url: '/registration/valunteer',
        name: "Valunteer",
        slug: "Valunteer",
        i18n: "valunteer",
      },
    ]
  },
  {
    url: null,
    name: "Operation",
    slug: "Operation",
    icon: "DropletIcon",
    i18n: "operation",
    submenu: [
      {
        url: '/operation/notification',
        name: "Notification",
        slug: "Notification",
        i18n: "notification",
      },
      {
          url: '/operation/work',
          name: "Work",
          slug: "Work",
          i18n: "work",
      },
      {
        url: '/operation/manage',
        name: "Manage",
        slug: "Manage",
        i18n: "manage",
      },{
        url: '/operation/emergency',
        name: "Emergency",
        slug: "Emergency",
        i18n: "emergency",
      }
    ]
  },
  {
    url: null,
    name: "Hospital",
    slug: "Hospital",
    icon: "CreditCardIcon",
    i18n: "hospital",
    submenu: [
      {
        url: '/hospital/hospital_transportation',
        name: "Hospital Transportation",
        slug: "Hospital Transportation",
        i18n: "hospital_transportation",
      },
      {
          url: '/hospital/patient_registration',
          name: "Patient Registration",
          slug: "Patient Registration",
          i18n: "patient_registration",
      },
      {
        url: '/hospital/patient_data',
        name: "Patient Data",
        slug: "Patient Data",
        i18n: "patient_data",
      },{
        url: '/hospital/hospital_data',
        name: "Hospital Data",
        slug: "Hospital Data",
        i18n: "hospital_data",
      }
    ]
  },
  {
    url: "/ready_status",
    name: "Ready Status",
    slug: "Ready Status",
    icon: "ArchiveIcon",
    i18n: "not_ready_noti"
  }
]
