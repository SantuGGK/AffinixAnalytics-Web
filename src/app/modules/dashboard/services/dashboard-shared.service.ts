import { Injectable } from '@angular/core';

@Injectable()
export class DashboardSharedService {
  formData;
  userData;
  ID;
  snfData;
  snfName;
  entityId;
  entityData;
  entityName;
  currentEntityType;
  loggedInUserID;
  primaryUserSNF;
  currentLoggedInRole;
  currentPlan;
  notificationId;
  notificationObject;
  snfDashboardFilters;
  constructor() { }
  // SNF Related Services
  setFormData(formData){
    this.formData = formData;
  }

  getFormData(){
    return this.formData;
  }

  setID(id) {
    this.ID = id;
  }
  
  getID() {
    return this.ID;
  }

  setSnfData(data) {
    this.snfData = data;
  }

  getSnfData() {
    return this.snfData;
  }
  
  setSnfName(name){
    this.snfName = name;
  }

  getSnfName(){
    return this.snfName;
  }

  setEntityID(id) {
    this.entityId = id;
  }
  
  getEntityID() {
    return this.entityId;
  }

  setEntityData(data) {
    this.entityData = data;
  }

  getEntityData() {
    return this.entityData;
  }

  setEntityName(data) {
    this.entityName = data;
  }

  getEntityName() {
    return this.entityName;
  }

  setCurrentEntityType(data) {
    this.currentEntityType = data;
  }

  getCurrentEntityType() {
    return this.currentEntityType;
  }

  setLoggedInUserID(loggedInUserID) {
    this.loggedInUserID = loggedInUserID;
  }

  getLoggedInUserID() {
    return this.loggedInUserID;
  }

  setPrimaryUser(primaryUserData) {
    this.primaryUserSNF = primaryUserData;
  }

  getPrimaryUser() {
    return this.primaryUserSNF;
  }

  setCurrentPlan(plan) {
    this.currentPlan = plan;
  }

  getCurrentPlan() {
    return this.currentPlan;
  }

  setNotificationId(notificationId) {
    this.notificationId = notificationId;
  }

  getNotificationId() {
    return this.notificationId;
  }

  /**
   * Set the notification properties
   * 
   * @param notificationObject 
   */
  setNotificationDetails(notificationObject) {
    this.notificationObject = notificationObject;
  }

  /**
   * get notification properties
   * 
   * @returns {Object}
   */
  getNotificationDetails() {
    return this.notificationObject;
  }

  setSNFFilters(filters) {
    this.snfDashboardFilters = filters;
  }

  getSNFFilters() {
    return this.snfDashboardFilters;
  }

}
