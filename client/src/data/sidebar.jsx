import { FaTh, FaRegChartBar, FaCommentAlt, FaThList } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Employee",
    icon: <BiImageAdd />,
    path: "/add-employee",
  },
  {
    title: "Paid Employee",
    icon: <FaThList />,
    path: "/paid",
  },
];

export default menu;
