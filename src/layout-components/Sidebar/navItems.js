import { PermissionRoute } from '../../react-router/permission'

import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

export default [
  {
    label: 'Navigation menu',
    content: [
      {
        "label": PermissionRoute.OVERVIEW.title,
        "icon": DashboardTwoToneIcon,
        "to": PermissionRoute.OVERVIEW.path,
        "roles": PermissionRoute.OVERVIEW.roles
      },
      {
        "label": PermissionRoute.USER_ANALYSIS.title,
        "icon": DashboardTwoToneIcon,
        "to": PermissionRoute.USER_ANALYSIS.path,
        "roles": PermissionRoute.USER_ANALYSIS.roles
      }
    ]
  },
]
