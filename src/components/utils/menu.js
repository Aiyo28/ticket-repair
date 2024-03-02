import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faList, faScrewdriverWrench, faCircleCheck, faClipboard } from '@fortawesome/free-solid-svg-icons'

const menu = [
    {
        id: 1,
        title: "All Tickets",
        icon: <FontAwesomeIcon icon={faHouse} />,
        link: "/",
    },
    {
        id: 2,
        title: "Important!",
        icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
        link: "/important",
    },
    {
        id: 3,
        title: "Completed!",
        icon: <FontAwesomeIcon icon={faCircleCheck} />,
        link: "/completed",
    },
    {
        id: 4,
        title: "Do It Now",
        icon: <FontAwesomeIcon icon={faClipboard} />,
        link: "/incomplete",
    },
];

export default menu;