import {menuList} from '@dashboard/layouts/sidebar/sidebar.menu.const';

export const roles = {
    admin: {
        roleID: 1,
        name : 'admin',
        sidebar: [], // Removed menuList.coreReimbursement
        firstPage : '/test',
        isHidden: false
    }
  };


   export const roleName = [
     {name: 'select', role_desc: 'Select', id: 0},
     {name: 'admin', role_desc: 'Administrator', id: 1},
     {name: 'employee', role_desc: 'Employee',id: 2}
  ];