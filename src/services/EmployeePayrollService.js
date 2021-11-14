import config from "../config/config";
import AxiosService from './AxiosService'

export default class EmployeePayrollService {
  baseUrl = config.baseUrl;
  addEmployee(data) {
    return AxiosService.postService(`${this.baseUrl}employee`, data);
  }
  getAllEmployee() {
    return AxiosService.getService(`${this.baseUrl}employee`);

  }
  updateEmployee(id,data) {
    return AxiosService.putService(`${this.baseUrl}employee/${id}`, data);
  }
  getEmployee(id) {
    return AxiosService.getService(`${this.baseUrl}employee/${id}`);

  }
}