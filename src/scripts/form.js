var birthdayOptions = require('./birthdays.js');

module.exports = {
    id: "testform",
    title: "Sign up for our paid opinion panel",
    description: "Become a member of our panel of people interested in getting paid for their opinions.",
    action: '',
    containerId: 'custom-form',
    sections: [{
        id: 1,
        title: null,
        fields: [{
            id: 1,
            name: "Name",
            required: true,
            type: "label",
            subfields: [{
                name: "First",
                label: "First",
                required: true,
                type: "text"
            },{
                name: "Last",
                label: "Last",
                required: true,
                type: "text"
            }]   
        },{
            id: 2,
            name: "Date of Birth",
            required: true,
            type: "label",
            subfields: [{
                name: "Month",
                required: true,
                type: 'select',
                options: birthdayOptions.month()
            },{
                name: "Day",
                required: true,
                type: 'select',
                options: birthdayOptions.day()
            },{
                name: "Year",
                required: true,
                type: 'select',
                options: birthdayOptions.year()
            }]
        },{
            id: 3, 
            name: "Gender",
            required: true,
            type: "radio",
            options:[{
                value: "Male",
                selected: false,
            },{
                value: "Female",
                selected: false,
            },{
                value: "Other",
                selected: true
            }]
        },{
            id: 4,
            name: "Ethnicity",
            type: "select",
            required: true,
            options: [{
                value: "African American"
            },{
                value: "Asian, Pacific Island"
            },{
                value: "Caucasian"
            },{
                value: "Hispanic"
            },{
                value: "Native American"
            },{
                value: "Other",
                selected: true
            }]
        },{
            id: 5,
            name: "Marital Status",
            type: "select", 
            required: true,
            options:[{
                value: "Divorced/Seperated"
            },{
                value: "Married"
            },{
                value: "Partnered"
            },{
                value: "Single",
                selected: true
            },{
                value: "Widowed"
            }]
        },{
            id: 6,
            name: "Housing",
            type: "select",
            required: true,
            options: [{
                value: "Own"
            },{
                value: "Rent"
            },{
                value: "Live w/Parents"
            }]
        }]
    },{
        id: 2,
        title: "Contact Information",
        fields:[{
            id: 1,
            name: 'Home Address',
            required: true,
            type: 'label',
            subfields:[{
                name: 'Street Address',
                className: 'full-width',
                required: true,
                type: 'text'
            },{
                name: 'City',
                required: true,
                type: 'text'
            },{
                name: 'State',
                label: 'State', // states label to be used by select field
                required: true,
                type: 'select',
                options: [{
                    value: 'AL'
                },{
                    value: 'AK'
                },{
                    value: 'AZ'
                },{
                    value: 'AR'
                },{
                    value: 'CA'
                },{
                    value: 'CO'
                },{
                    value: 'CT'
                },{
                    value: 'DE'
                },{
                    value: 'FL'
                },{
                    value: 'GA'
                },{
                    value: 'HI'
                },{
                    value: 'ID'
                },{
                    value: 'IL'
                },{
                    value: 'IN'
                },{
                    value: 'IA'
                },{
                    value: 'KS'
                },{
                    value: 'KY'
                },{
                    value: 'LA'
                },{
                    value: 'ME'
                },{
                    value: 'MD'
                },{
                    value: 'MA'
                },{
                    value: 'MI'
                },{
                    value: 'MN'
                },{
                    value: 'MS'
                },{
                    value: 'MO'
                },{
                    value: 'MT'
                },{
                    value: 'NE'
                },{
                    value: 'NV'
                },{
                    value: 'NH'
                },{
                    value: 'NJ'
                },{
                    value: 'NM'
                },{
                    value: 'NY'
                },{
                    value: 'NC'
                },{
                    value: 'ND'
                },{
                    value: 'OH'
                },{
                    value: 'OK'
                },{
                    value: 'OR'
                },{
                    value: 'PA'
                },{
                    value: 'RI'
                },{
                    value: 'SC'
                },{
                    value: 'SD'
                },{
                    value: 'TN'
                },{
                    value: 'TX'
                },{
                    value: 'UT'
                },{
                    value: 'VT'
                },{
                    value: 'VA'
                },{
                    value: 'WA'
                },{
                    value: 'WV'
                },{
                    value: 'WI'
                },{
                    value: 'WY'
                }]
            },{
                name: 'Zip Code',
                required: true,
                type: 'text'
            }]
        },{
            id: 2,
            name: 'My primary contact number is a:',
            type: 'select',
            required: true,
            options: [{
                value: 'Home Phone',
            },{
                value: 'Work Phone'
            },{
                value: 'Mobile Phone'
            }],
            relation: {
                type: 'update',
                target: 'phone-input'
            }
        },{
            id: 3,
            name: 'Home Phone',
            required: true,
            type: 'tel',
            uid: 'phone-input',
            placeholder: 'xxx-xxx-xxxx'
        },{
            id: 4,
            name: 'Email',
            required: true,
            type: 'label',
            subfields: [{
                name: 'Enter Email',
                type: 'email',
                required: true,
                uid: 'email-input',
                relation: {
                    type: 'confirm',
                    target: 'email-confirm'
                }
            }, {
                name: 'Confirm Email',
                type: 'text',
                required: true,
                uid: 'email-confirm',
                relation: {
                    type: 'confirm',
                    target: 'email-input'
                }
            }]
        }]
    },{
        id: 3,
        title: "Employment",
        fields: [{
            id: 1,
            name: 'Employment Status',
            required: true,
            type: 'select',
            options: [{
                value: 'Full Time'
            },{
                value: 'Part Time'
            },{
                value: 'Student'
            },{
                value: 'Homemaker'
            },{
                value: 'Retired'
            },{
                value: 'Unemployed'
            }]
        },{
            id: 2,
            name: 'Are you Self Employed?',
            type: 'select',
            options: [{
                value: 'No'
            },{
                value: 'Yes'
            }]
        },{
            id: 3,
            name: 'Job Title',
            type: 'text'
        },{
            id: 4,
            name: 'Employment',
            type: 'text'
        },{
            id: 5,
            name: 'Industry',
            type: 'select',
            options: [{
                value: 'Accounting/Finance'
            },{
                value: 'Advertising/Public Relations'
            },{
                value: 'Aerospace/Aviation'
            },{
                value: 'Arts/Entertainment/Publishing'
            },{
                value: 'Automotive'
            },{
                value: 'Banking/Mortgage'
            },{
                value: 'Business Development'
            },{
                value: 'Business Opportunity'
            },{
                value: 'Clerical/Administrative'
            },{
                value: 'Construction/Facilities'
            },{
                value: 'Consumer Goods'
            }, {
                value: 'Customer Service'
            },{
                value: 'Education/Training'
            },{
                value: 'Energy/Utilities'
            },{
                value: 'Engineering'
            },{
                value: 'Government/Military'
            },{
                value: 'Green'
            }, {
                value: 'Healthcare'
            },{
                value: 'Hospitality/Travel'
            },{
                value:'Human Resources'
            },{
                value: 'Installation/Maintenance'
            },{
                value: 'Insurance'
            },{
                value: 'Internet'
            },{
                value: 'Job Search Aids'
            },{
                value: 'Law Enforcement/Security'
            },{
                value: 'Legal'
            },{
                value: 'Management/Executive'
            },{
                value: 'Manufacturing/Operations'
            },{
                value: 'Marketing'
            },{
                value: 'Non-Profit/Volunteer'
            },{
                value: 'Pharmaceutical/Biotech'
            },{
                value: 'Professional Services'
            },{
                value: 'QA/Quality Control'
            },{
                value: 'Real Estate'
            },{
                value: 'Restaurant/Food Service'
            },{
                value:'Retail'
            },{
                value:'Sales'
            },{
                value: 'Science/Research'
            },{
                value: 'Skilled Labor'
            },{
                value:'Technology'
            },{
                value:'Telecommunications'
            },{
                value:'Transportation/Logistics'
            },{
                value:'Other'
            }]
        },{
            id: 6,
            name: 'Number of Employees (locally)',
            type: 'select',
            options: [{
                value: 'Less than 10'
            },{
                value:'10-49'
            },{
                value: '50-99'
            },{
                value: '100-499'
            },{
                value: '500-999'
            },{
                value: '1000-1999'
            },{
                value: '2000+'
            }]
        }]
    },{
        id: 4,
        title: "Children",
        fields: [{
            name: 'Number of Children Living in the Home Under the Age of 21',
            type: 'select',
            options: [{
                value: 0,
            },{
                value: 1,
            },{
                value: 2
            },{
                value: 3
            },{
                value: 4,
                label: '4+'
            }],
            relation: {
                type: 'insert',
                target: '.child-info'
            }
        },{
            name: "Children's Information",
            type: 'label',
            classNames: 'child-info hide',
            subfields: [{
                name: 'Child 1\'s Name',
                label: 'Name',
                type: 'text',
            },{
                name: 'child 1 - dob - month',
                label: 'Date of Birth',
                type: 'select',
                options: birthdayOptions.month()
            },{
                name: 'child 1 - dob - day',
                type: 'select',
                options: birthdayOptions.day()
            },{
                name: 'child 1 - dob - year',
                type: 'select',
                options: birthdayOptions.year()
            }]
        },{
            name: '',
            type: 'label',
            classNames: 'child-info hide',
            subfields: [{
                name: 'Child 2\'s Name',
                label: 'Name',
                type: 'text',
            },{
                name: 'child 2 - dob - month',
                label: 'Date of Birth',
                type: 'select',
                options: birthdayOptions.month()
            },{
                name: 'child 2 - dob - day',
                type: 'select',
                options: birthdayOptions.day()
            },{
                name: 'child 2 - dob - year',
                type: 'select',
                options: birthdayOptions.year()
            }]
        },{
            name: '',
            type: 'label',
            classNames: 'child-info hide',
            subfields: [{
                name: 'Child 3\'s Name',
                type: 'text',
                label: 'Name'
            },{
                name: 'child 3 - dob - month',
                label: 'Date of Birth',
                type: 'select',
                options: birthdayOptions.month()
            },{
                name: 'child 3 - dob - day',
                type: 'select',
                options:  birthdayOptions.day()
            },{
                name: 'child 3 - dob - year',
                type: 'select',
                options:  birthdayOptions.year()
            }]
        },{
            name: '',
            type: 'label',
            classNames: 'child-info hide',
            subfields: [{
                name: 'Child 4\'s Name',
                type: 'text',
                label: 'Name',
            },{
                name: 'child 4 - dob - month',
                label: 'Date of Birth',
                type: 'select',
                options: birthdayOptions.month()
            },{
                name: 'child 4 - dob - day',
                type: 'select',
                options:  birthdayOptions.day()
            },{
                name: 'child 4 - dob - year',
                type: 'select',
                options:  birthdayOptions.year()
            }]
        }]
    },{
        id: 5,
        title: "Demographics",
        fields: [{
            name: 'Highest Level of Education',
            type: 'select',
            options: [{
                value: 'Less than High School'
            },{
                value:'High School Grad/GED'
            },{
                value:'Some College'
            },{
                value:'Associates Degree 2 Yr'
            },{
                value:'Trade Degree/Cert.'
            },{
                value:'College Grad'
            },{
                value:'Master\'s Degree'
            },{
                value:'PhD'
            }]
        },{
            name: 'Houshold Income',
            type: 'select', 
            options: [{
                value: 'Less than $10,000'
            },{
                value:'$10 - 20K'
            },{
                value:'$20 - 30K'
            },{
                value:'$30 - 40K'
            },{
                value:'$40 - 50K'
            },{
                value:'$50 - 75K'
            },{
                value:'$75 - 100K'
            },{
                value:'$100 - $125K'
            },{
                value:'$125 - 150K'
            },{
                value:'$150K+'
            }]
        }]
    },{
        id: 6,
        title: "Referral Information",
        fields: [{
            name: 'Home did you learn about us?',
            type: 'select',
            options: [{
                value: 'Phone call',
            },{
                value: 'Email'
            },{
                value: 'Friend or Family'
            },{
                value: 'Flyer'
            },{
                value: 'Online Classified'
            },{
                value: 'Newspaper Ad'
            },{
                value: 'Internet Search'
            },{
                value: 'Other'
            }]
        }]
    },{
        id: 7,
        title: "Primary area of interest (subject to verification)",
        fields: [{
            name: 'Panel Profile',
            type: 'radio',
            required: true,
            options: [{
                value: 'General/Consumer'
            },{
                value: 'IT Pro/Developer'
            },{
                value: 'Medical Professional'
            }]
        }]
    },{
        id: 8,
        title: "Pariticipation agreement",
        fields: [{
            name: 'Permission to Contact',
            description: 'I hereby grant you permission to contact me to verify my information or about match me to paid opportunities to give my opinion.',
            type: 'checkbox',
            required: true,
            options: [{
                value: 'I agree'
            }]
        }]
    }]
}