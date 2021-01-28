import React from 'react';
import * as FaIcons from 'react-icons/fa'; 
import * as AiIcons from 'react-icons/ai'; 
import * as IoIcons from 'react-icons/io'; 
import * as RiIcons from 'react-icons/ri';

export const SidebadData = [
    {
        title: 'HOME',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Users',
                path: '/overview/user',
                icon: <IoIcons.IoIosPaper />,

            }
        ]
    },
    // Second Option
    {
        title: 'OFFERS',
        path: '/offers',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Year Bonanza',
                path: '/offers/yearbonanza',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Covid Special',
                path: '/offers/covidspecial',
                icon: <IoIcons.IoIosPaper />,
            }
        ]
    },
    //Third Option
    {
        title: 'GALLERY',
        path: '/overview',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Users',
                path: '/overview/user',
                icon: <IoIcons.IoIosPaper />,

            }
        ]
    },
]