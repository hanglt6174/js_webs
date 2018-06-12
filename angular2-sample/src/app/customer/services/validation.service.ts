import { ERROR_MESSAGES } from "../config/config";

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = ERROR_MESSAGES;

    return config[validatorName];
  }
  /**
   * 
   */
  static phonenumberValidator(control) {
    if(control.value) {
      if (control.value.match(/^0\d{1,4}-\d{1,4}-\d{3,4}$/)) {
        return null;
      } else {
        return { 'invalidPhonenumber': true };
      }
    }else{
      return null;
    }
    
  }
  /**
   * 000-0000の形式でOK
   * @param control 
   */
  static postcodeValidator(control) {
    if(control.value) {
      if (control.value.match(/^([0-9]){3}[-]([0-9]){4}$/)) {
        return null;
      } else {
        return { 'invalidPostcode': true };
      }
    }else {
      return null;
    }
  }
  /**
   * 
   * @param control 
   */
  static emailValidator(control) {
    if(control.value) {
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    } else {
      return null;
    }
  }
}
