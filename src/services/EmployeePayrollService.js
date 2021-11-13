import config from "../config/config";
import AxiosService from './AxiosService'

export default class EmployeePayrollService {
  baseUrl = config.baseUrl;
  addEmployee(data) {
    return AxiosService.postService(`${this.baseUrl}employee`,data);
  }
}