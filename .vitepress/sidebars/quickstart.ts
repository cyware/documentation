import {
    DefaultTheme
} from "vitepress";

export const quickstartSidebar: DefaultTheme.SidebarItem[] = [{
        text: "Welcome",
        items: [{
                text: 'Introduction',
                link: '/quickstart/'
        },
          { text: "Showcase", link: "/quickstart/showcase" },
                                ]
    },
    {
        text: "Beginner Guide",
        items: [
          {
            text: "Welcome to Cyware",
            items: [{
              text: "Onboarding",
              link: "/quickstart/beginner_guide/welcome_to_cyware/onboarding",
            }]
          },
            {
                text: 'Setup',
                items: [{
                        text: 'Downloading and Installing',
                        link: '/quickstart/beginner_guide/setup/install'
                    },
                    {
                        text: 'Basic Configuration',
                        link: '/quickstart/beginner_guide/setup/config'
                    },
                    {
                        text: 'Uploading Files for Use in Automate',
                        link: '/quickstart/beginner_guide/setup/file_upload'
                    }
                ]
            },
            {
                text: 'First Steps with Cyware',
                items: [{
                        text: 'Creating Your First Project',
                        link: '/quickstart/beginner_guide/first_steps_with_cyware/project'
                    },
                    {
                        text: 'Capturing and Inspecting Traffic',
                        link: '/quickstart/beginner_guide/first_steps_with_cyware/traffic'
                    },
                    {
                        text: 'Forwarding and Modifying Requests Repeatedly',
                        link: '/quickstart/beginner_guide/first_steps_with_cyware/replay'
                    },
                    {
                        text: 'Automating Brute-Forcing/Fuzzing',
                        link: '/quickstart/beginner_guide/first_steps_with_cyware/automate'
                    }
                ]
            },
            {
                text: 'Support',
                items: [{
                    text: 'Common Errors and Solutions',
                    link: '/quickstart/beginner_guide/getting_help/support'
                }]
            }
        ]
    },
]
