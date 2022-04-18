//https://themesbrand.com/skote/layouts/icons-boxicons.html
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [


    {
        id: 1,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        subItems: [
            {
                id: 2,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 1
            },
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
                link: '/dashboards/saas',
                parentId: 1
            },
            {
                id: 4,
                label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
                link: '/dashboards/crypto',
                parentId: 1
            },
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
                link: '/dashboards/blog',
                parentId: 1
            },
        ]
    },

    {
        id: 99,
        isLayout: true
    },
    {
        id: 6,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true
    },




    {
        id: 7,
        label: 'Assets',
        icon: 'bx-file',

        subItems: [
            {
                id: 8,
                label: 'List Assets',
                link: '/assets/asset-list',
                parentId: 7
            },
            {
                id: 9,
                label: 'Creat Asset',
                link: '/assets/asset-add',
                parentId: 7
            },
            {
                id: 10,
                label: 'Modify Asset',
                link: '/fdf',
                parentId: 7
            },
            {
                id: 11,
                label: 'Display Asset',
                link: '/fef',
                parentId: 7
            },

            {
                id: 12,
                label: 'Import Asset',
                link: '/fdf',
                parentId: 7
            },
        ]
    },

    //Asset Settings
    {
        id: 13,
        label: 'Asset Settings',
        icon: 'bx-cog',

        subItems: [
            {
                id: 14,
                label: 'Category',
                link: '/asset-settings/category-list',
                parentId: 13
            },
            {
                id: 15,
                label: 'Site/ Location',
                link: '/asset-settings/location-list',
                parentId: 13
            },
            {
                id: 16,
                label: 'Vendor',
                link: '/asset-settings/vendor-list',
                parentId: 13
            },

            {
                id: 17,
                label: 'Asset Fiels',
                link: '/fdf',
                parentId: 13
            },

        ]
    },



    //Company
    {
            id: 18,
            label: 'Reports',
            icon: 'bx bxs-report',
    
            subItems: [
                {
                    id: 19,
                    label: 'Report A',
                    link: '/abc',
                    parentId: 18
                },
                {
                    id: 20,
                    label: 'Report B',
                    link: '/def',
                    parentId: 18
                },
                {
                    id: 21,
                    label: 'Report C',
                    link: '/fdf',
                    parentId: 18
                },
    
            ]
        },



        {
            id: 22,
            label: 'Company',
            icon: 'bx bxs-report',
    
            subItems: [
                {
                    id: 23,
                    label: 'Company Profile',
                    icon: 'bx-building',
                    link: '/abc',
                    parentId: 22
                },
                {
                    id: 24,
                    label: 'Employee',
                    icon: 'bx bx-user-pin',
                    link: '/def',
                    parentId: 22
                },

    
            ]
        },








        //User setting
        {
            id: 22,
            label: 'Users',
            icon: 'bx-group',
    
            subItems: [
                {
                    id: 23,
                    label: 'Users',
                    link: '/abc',
                    parentId: 21
                },
                {
                    id: 24,
                    label: 'Roles',
                    link: '/def',
                    parentId: 21
                },
                {
                    id: 25,
                    label: 'Role Permission',
                    link: '/fdf',
                    parentId: 21
                },
    
            ]
        },




    

    // for admin

    {
        id: 26,
        label: 'Admin APPS',
        isTitle: true
    },

    

    {
        id: 27,
        label: 'List Company',
        icon: 'bx-building',
        link: '/',
    },

    {
        id: 28,
        label: 'Asset Limit',
        icon: 'bx-cog',
        link: '/',
    },

    {
        id: 29,
        label: 'User Managment',
        icon: 'bx-group',

        subItems: [
            {
                id: 30,
                label: 'Users',
                link: '/abc',
                parentId: 29
            },
            {
                id: 31,
                label: 'Roles',
                link: '/def',
                parentId: 29
            },
            {
                id: 32,
                label: 'Role Permission',
                link: '/fdf',
                parentId: 29
            },

        ]
    },

];

