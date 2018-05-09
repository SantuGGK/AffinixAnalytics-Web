import {FormGroup, FormControl} from '@angular/forms';
import {messages} from '@messages/messages';
import {roles} from '@dashboard/roles.mapping';

export class Utils {

  /**
   * Function to check the validity of the forum
   * @param  {FormGroup} formGroup - Form for which validity needs to be checked
   */
  static validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }
  
  /**
   * 
   * @param row -current row of table
   * @param tableColumns -table columns of current table
   */
   static format (row, tableColumns) {
    const currentRow = new Object();
    if(row) {
      for (let i = 0; i < row.length; i++) {
        currentRow[tableColumns[i].name] = row[i];
      }
    }
    return currentRow;
  }

  static validateUserName(event) {
     let key = event.keyCode, hypenKey = 189, periodKey = 222, apostropheKey = 190,firefoxHyphenKey = 173;
      // for firefox
      if(key === firefoxHyphenKey) {
        return;
      } 
      if((key == firefoxHyphenKey) && (event.shiftKey) ) {
          event.preventDefault();
      }
   // if any numeric key and special characters are pressed prevent event
      if ((key >= 48 && key <= 59)|| (key >= 96 && key <= 188) || (key >= 191 && key <= 221) || key == 61 || ((key == hypenKey || key === periodKey || key === apostropheKey) && (event.shiftKey))) {
          event.preventDefault();
      }
  }
  
  static validateDigits(event) {
    let key = event.keyCode, ctrlKey = 17, vKey = 86, cKey = 67, aKey = 65;
    
    if (((key == aKey || key == vKey || key == cKey) && (event.ctrlKey === true || event.metaKey === true)) ) {
      return;
    }
    
   if((key >= 65 && key <= 90)  || (event.shiftKey ) || (key >= 106 && key <= 222) || key == 32 || key === 59 || key === 61) {
      event.preventDefault();
    }
}
  
  static validateFloatValues(event) {
    let key = event.keyCode, ctrlKey = 17, vKey = 86, cKey = 67, aKey = 65;
    
    if (((key == aKey || key == vKey || key == cKey) && (event.ctrlKey === true || event.metaKey === true)) || key === 110 || key === 190) {
      return;
    }
    
   if((key >= 65 && key <= 90)  || (event.shiftKey ) || (key >= 106 && key <= 222) || key == 32 || key === 59 || key === 61) {
      event.preventDefault();
    }
  }
  
  static validateDecimalValues(event, control) {
    if(control.value.lastIndexOf('.')!=-1) {
          let decimalValues = control.value.split('.');
           if(decimalValues[1].length > 2) {
             decimalValues[1] = decimalValues[1].slice(0, 2);
              let value = `${decimalValues[0]}.${decimalValues[1]}`;
              control.setValue(value); 
           } else {
              control.setValue(control.value);
           } 
        }
  }
  
  static validateTherapyMultiplier(event, multiplier) {
      const regex = messages.THERAPY_MULTIPLIER_REGEX;
      let multiplierValue = multiplier.value.toString();
      if(!regex.test(event.data)) {
        let string = multiplierValue.replace(multiplierValue.charAt(multiplierValue.indexOf(event.data)), '');
          multiplier.setValue(string);
      } else {
        if(multiplierValue.indexOf('.')!=-1) {
          let decimalValues = multiplierValue.split('.');
           if(decimalValues[1].length > 2) {
             decimalValues[1] = decimalValues[1].slice(0, 2);
              let value = `${decimalValues[0]}.${decimalValues[1]}`;
              multiplier.setValue(value); 
           } else {
              multiplier.setValue(multiplierValue);
           } 
        }
      }

  }

  // Function called if only services are present
    static navigateBasedOnRole(data, index, _dashboardSharedService,_sharedService, _router) {
      
      _dashboardSharedService.setID(data.services[index].id);
      let encryptedID = btoa(data.services[index].id);

      // For paid user
      if((data.services[index].payment_id && data.services[index].is_waived || data.services[index].payment_id && data.services[index].subscription_id) && !data.services[index].isbilling) {
        _router.navigate([roles[data.services[index].role_code.toLowerCase()].afterPayment.firstPage], {queryParams:{ID : encryptedID}});
      }
      // For unpaid primary and secondary users
      else if((data.services[index].payment_id === null || data.services[index].payment_id && !data.services[index].subscription_id) && !data.services[index].isbilling) {
          _router.navigate([roles[data.services[index].role_code.toLowerCase()].beforePayment.firstPage.replace('ID', encryptedID)]);
      }
     
      else if(data.services[index].isbilling) {
         let encryptedID = btoa(data.services[index].id);
          _router.navigate([roles[data.services[index].role_code.toLowerCase()].firstPage.replace('ID', encryptedID)]);
      }
      else {
        _router.navigate([roles[data.services[index].role_code.toLowerCase()].firstPage]);
      }
 }  

  static compareTwoDates(form) {
   if(new Date(form.controls['endDate'].value) < new Date(form.controls['startDate'].value)){
      return false;
    } else {
      return true;
    }
  }

  static getLastNthDay(date, month) {
    let temp = date;
    temp = new Date(date.getFullYear(), date.getMonth(), 1);
    temp.setMonth(temp.getMonth() + (month + 1));
    temp.setDate(temp.getDate() - 1); 

    if (date.getDate() < temp.getDate()) { 
        temp.setDate(date.getDate());
    }

    return {
      'endDate': `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getDate()}`,
      'startDate': `${temp.getFullYear()}-${('0' + (temp.getMonth() + 1)).slice(-2)}-${temp.getDate()}`,
    }
  }

  static formatDate(dateRange) {
    let startEndDate = dateRange.split('--');
    let startDate = startEndDate[0].split('-')[2].trim() + '/' + startEndDate[0].split('-')[1].trim() + '/' + startEndDate[0].split('-')[0].trim();
    let endDate;
    if(startEndDate[1]) {
      endDate = startEndDate[1].split('-')[2].trim() + '/' + startEndDate[1].split('-')[1].trim() + '/' + startEndDate[1].split('-')[0].trim();
      return `${startDate} - ${endDate}`;
    } else {
      return `${startDate}`;
    }
    
  }

  static sortByKey(array, key) {
    return array.sort(function(a, b) {
        let x = a[key]; 
        let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  static dateRangeFilter(values) {
    let dateRange;
    switch (values.dateRange) {
      case 'All':
        values.startDate = 'All';
        values.endDate = '';
        break;
      case 'Last 3 months':
        dateRange = Utils.getLastNthDay(new Date(), -3);
        values.startDate = dateRange.startDate;
        values.endDate = dateRange.endDate;
        break;

      case 'Last 6 months':
        dateRange = Utils.getLastNthDay(new Date(), -6);
        values.startDate = dateRange.startDate;
        values.endDate = dateRange.endDate;
        break;

      case 'Last 9 months':
        dateRange = Utils.getLastNthDay(new Date(), -9);
        values.startDate = dateRange.startDate;
        values.endDate = dateRange.endDate;
        break;
      
      case 'Past 30 days':
        dateRange = Utils.getLastNthDay(new Date(), -1);
        values.startDate = dateRange.startDate;
        values.endDate = dateRange.endDate;
        break;

      case 'Past 60 days':
        dateRange = Utils.getLastNthDay(new Date(), -2);
        values.startDate = dateRange.startDate;
        values.endDate = dateRange.endDate;
        break;

      case 'Last year':
        dateRange = Utils.getLastNthDay(new Date(), -12);
        values.startDate = dateRange.startDate;
        values.endDate = dateRange.endDate;
        break;

      case 'Custom':
    }
  }

 static ageRangeFilter(values) {
    switch (values.ageRange) {
      case 'All':
      break;

      case 'Custom':
        values.ageRange = `${values.minAge}-${values.maxAge}`;
    }
  }

  static hospitalLOSRangeFilter(values) {
    switch (values.hospitalLOS) {
      case 'All':
      break;

      case 'Custom':
        values.hospitalLOS = `${values.hospitalLOSMin}-${values.hospitalLOSMax} days`;
    }
  }
}
